create table payment_logs (
  id uuid default uuid_generate_v4() primary key,
  order_id text not null,
  payment_id text,
  amount numeric not null,
  currency text not null,
  status text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  verified_at timestamp with time zone,
  metadata jsonb default '{}'::jsonb
);

-- Add RLS policies
alter table payment_logs enable row level security;

create policy "Allow insert for authenticated users only"
  on payment_logs for insert
  to authenticated
  with check (true);

create policy "Allow select for authenticated users only"
  on payment_logs for select
  to authenticated
  using (true);

create policy "Allow update for authenticated users only"
  on payment_logs for update
  to authenticated
  using (true);