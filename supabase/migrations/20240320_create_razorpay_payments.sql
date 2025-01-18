-- Create enum for payment status
CREATE TYPE payment_status AS ENUM (
  'initiated',
  'created',
  'processing',
  'completed',
  'failed',
  'cancelled'
);

-- Create razorpay_payments table
CREATE TABLE IF NOT EXISTS razorpay_payments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id TEXT NOT NULL,
  payment_id TEXT,
  amount DECIMAL NOT NULL,
  currency TEXT DEFAULT 'INR',
  status payment_status DEFAULT 'initiated',
  customer_details JSONB,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Create indexes
CREATE INDEX idx_razorpay_payments_order_id ON razorpay_payments(order_id);
CREATE INDEX idx_razorpay_payments_status ON razorpay_payments(status);

-- Enable RLS
ALTER TABLE razorpay_payments ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users" ON razorpay_payments
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for service role only" ON razorpay_payments
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Enable update for service role only" ON razorpay_payments
  FOR UPDATE USING (auth.role() = 'service_role');