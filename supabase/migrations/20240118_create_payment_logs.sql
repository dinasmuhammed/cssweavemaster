-- Create payment_logs table
CREATE TABLE IF NOT EXISTS payment_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    amount DECIMAL NOT NULL,
    currency TEXT DEFAULT 'INR',
    status TEXT NOT NULL,
    customer_details JSONB,
    razorpay_order_id TEXT,
    razorpay_payment_id TEXT,
    razorpay_signature TEXT,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    completed_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT status_check CHECK (status IN (
        'initiated',
        'order_created',
        'payment_successful',
        'verification_failed',
        'cancelled'
    ))
);

-- Create index on status for better query performance
CREATE INDEX IF NOT EXISTS idx_payment_logs_status ON payment_logs(status);

-- Enable RLS
ALTER TABLE payment_logs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users" ON payment_logs
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON payment_logs
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only" ON payment_logs
    FOR UPDATE USING (auth.role() = 'authenticated');