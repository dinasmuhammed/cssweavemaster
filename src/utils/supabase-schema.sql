-- Create payment_logs table if it doesn't exist
create table if not exists payment_logs (
  id uuid default uuid_generate_v4() primary key,
  order_id text not null,
  payment_id text,
  amount numeric not null,
  currency text not null,
  status text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  verified_at timestamp with time zone,
  webhook_processed_at timestamp with time zone,
  metadata jsonb default '{}'::jsonb
);

-- Create webhook_logs table if it doesn't exist
create table if not exists webhook_logs (
  id uuid default uuid_generate_v4() primary key,
  event_type text not null,
  payload jsonb not null,
  signature text not null,
  processed_at timestamp with time zone default timezone('utc'::text, now()),
  status text default 'processed'
);

-- Enable RLS
alter table payment_logs enable row level security;
alter table webhook_logs enable row level security;

-- Create policies
create policy "Enable read access for authenticated users"
  on payment_logs for select
  to authenticated
  using (true);

create policy "Enable insert for service role only"
  on payment_logs for insert
  to service_role
  with check (true);

create policy "Enable update for service role only"
  on payment_logs for update
  to service_role
  using (true);

create policy "Enable webhook logs access for service role only"
  on webhook_logs for all
  to service_role
  using (true);