-- Create enum for payment status
create type payment_status as enum ('pending', 'success', 'failed');

-- Create payments table
create table if not exists payments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id),
  amount decimal not null,
  currency text not null default 'INR',
  status payment_status not null default 'pending',
  razorpay_order_id text,
  razorpay_payment_id text,
  customer_details jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS
alter table payments enable row level security;

-- Create policies
create policy "Users can view their own payments"
  on payments for select
  using (auth.uid() = user_id);

create policy "Users can insert their own payments"
  on payments for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own payments"
  on payments for update
  using (auth.uid() = user_id);

-- Create function to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create trigger to update updated_at
create trigger update_payments_updated_at
  before update on payments
  for each row
  execute function update_updated_at_column();

-- Create index for faster queries
create index if not exists payments_user_id_idx on payments(user_id);
create index if not exists payments_status_idx on payments(status);