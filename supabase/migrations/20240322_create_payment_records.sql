-- Create payment_records table
CREATE TABLE IF NOT EXISTS payment_records (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_id TEXT,
    payment_id TEXT,
    amount DECIMAL NOT NULL,
    currency TEXT DEFAULT 'INR',
    status TEXT NOT NULL,
    customer_details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_payment_records_order_id ON payment_records(order_id);
CREATE INDEX IF NOT EXISTS idx_payment_records_status ON payment_records(status);

-- Enable Row Level Security
ALTER TABLE payment_records ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users" ON payment_records
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON payment_records
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_payment_records_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language plpgsql;

-- Create trigger for updating updated_at
CREATE TRIGGER update_payment_records_timestamp
    BEFORE UPDATE ON payment_records
    FOR EACH ROW
    EXECUTE FUNCTION update_payment_records_timestamp();