
-- Payment logs table to track all payment attempts and status
create table if not exists payment_logs (
  id uuid default uuid_generate_v4() primary key,
  order_id text not null,
  payment_id text,
  amount numeric not null,
  currency text not null default 'INR',
  status text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  verified_at timestamp with time zone,
  webhook_processed_at timestamp with time zone,
  metadata jsonb default '{}'::jsonb
);

-- Webhook logs table to track all incoming webhooks
create table if not exists webhook_logs (
  id uuid default uuid_generate_v4() primary key,
  event_type text not null,
  payload jsonb not null,
  signature text not null,
  processed_at timestamp with time zone default timezone('utc'::text, now()),
  status text default 'processed',
  metadata jsonb default '{}'::jsonb
);

-- Orders table to store complete order information
create table if not exists orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete set null,
  order_id text not null,
  payment_id text,
  items jsonb not null,
  total_amount numeric not null,
  shipping_charge numeric not null default 0,
  shipping_address text not null,
  customer_name text not null,
  customer_email text not null,
  customer_mobile text not null,
  status text not null default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- User profiles table to store customer information
create table if not exists user_profiles (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null unique,
  name text,
  email text,
  mobile text,
  address text,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Create indexes for better query performance
create index if not exists idx_payment_logs_order_id on payment_logs(order_id);
create index if not exists idx_payment_logs_payment_id on payment_logs(payment_id);
create index if not exists idx_payment_logs_status on payment_logs(status);
create index if not exists idx_orders_user_id on orders(user_id);
create index if not exists idx_orders_order_id on orders(order_id);
create index if not exists idx_orders_payment_id on orders(payment_id);
create index if not exists idx_webhook_logs_event_type on webhook_logs(event_type);

-- Enable Row Level Security (RLS)
alter table payment_logs enable row level security;
alter table webhook_logs enable row level security;
alter table orders enable row level security;
alter table user_profiles enable row level security;

-- Create RLS policies for payment_logs
create policy "Enable read for authenticated users"
  on payment_logs for select
  to authenticated
  using (true);

create policy "Only service role can insert"
  on payment_logs for insert
  to service_role
  with check (true);

create policy "Only service role can update"
  on payment_logs for update
  to service_role
  using (true);

-- Create RLS policies for webhook_logs
create policy "Only service role can access webhook logs"
  on webhook_logs for all
  to service_role
  using (true);

-- Create RLS policies for orders
create policy "Users can read their own orders"
  on orders for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Service role can read all orders"
  on orders for select
  to service_role
  using (true);

create policy "Service role can insert orders"
  on orders for insert
  to service_role
  with check (true);

create policy "Service role can update orders"
  on orders for update
  to service_role
  using (true);

-- Create RLS policies for user_profiles
create policy "Users can read their own profile"
  on user_profiles for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can update their own profile"
  on user_profiles for update
  to authenticated
  using (auth.uid() = user_id);

create policy "Service role can access all profiles"
  on user_profiles for all
  to service_role
  using (true);
