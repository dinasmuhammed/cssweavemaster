-- Create enum for payment status if it doesn't exist
DO $$ BEGIN
    CREATE TYPE payment_status AS ENUM (
        'initiated',
        'created',
        'processing',
        'completed',
        'failed',
        'cancelled'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create razorpay_payments table
CREATE TABLE IF NOT EXISTS razorpay_payments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_id TEXT,
    payment_id TEXT,
    amount DECIMAL NOT NULL,
    currency TEXT DEFAULT 'INR',
    status payment_status DEFAULT 'initiated',
    customer_details JSONB,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_razorpay_payments_order_id ON razorpay_payments(order_id);
CREATE INDEX IF NOT EXISTS idx_razorpay_payments_status ON razorpay_payments(status);

-- Enable Row Level Security
ALTER TABLE razorpay_payments ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users" ON razorpay_payments
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for service role only" ON razorpay_payments
    FOR INSERT WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Enable update for service role only" ON razorpay_payments
    FOR UPDATE USING (auth.role() = 'service_role');

-- Create trigger for updating updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language plpgsql;

CREATE TRIGGER update_razorpay_payments_updated_at
    BEFORE UPDATE ON razorpay_payments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();