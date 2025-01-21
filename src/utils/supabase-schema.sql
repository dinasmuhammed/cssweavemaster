-- Create payment_logs table if it doesn't exist
create table if not exists payment_logs (
  id uuid default uuid_generate_v4() primary key,
  order_id text not null,
  payment_id text,
  amount numeric not null,
  status text not null,
  customer_details jsonb,
  error_message text,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS
alter table payment_logs enable row level security;

-- Create policies
create policy "Enable read access for all users"
  on payment_logs for select
  to authenticated
  using (true);

create policy "Enable insert for all users"
  on payment_logs for insert
  to authenticated
  with check (true);

create policy "Enable update for all users"
  on payment_logs for update
  to authenticated
  using (true);