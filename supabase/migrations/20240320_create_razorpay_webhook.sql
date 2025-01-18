-- Create webhook_logs table for tracking Razorpay webhook events
CREATE TABLE IF NOT EXISTS webhook_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    event_type TEXT NOT NULL,
    payload JSONB NOT NULL,
    status TEXT DEFAULT 'received',
    processed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS
ALTER TABLE webhook_logs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for service role" ON webhook_logs
    FOR SELECT USING (auth.role() = 'service_role');

CREATE POLICY "Enable insert for service role" ON webhook_logs
    FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- Create index for event_type
CREATE INDEX IF NOT EXISTS idx_webhook_logs_event_type ON webhook_logs(event_type);