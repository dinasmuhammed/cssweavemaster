
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import * as crypto from 'https://deno.land/std@0.177.0/crypto/mod.ts';

// Configure CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

// Function to verify Razorpay signature
const verifyRazorpaySignature = (payload, signature, secret) => {
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(JSON.stringify(payload));
  const digest = hmac.digest('hex');
  return digest === signature;
};

// Handle webhook requests
Deno.serve(async (req) => {
  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Get webhook secret from environment
    const webhookSecret = Deno.env.get('RAZORPAY_WEBHOOK_SECRET') || '';
    
    // Parse webhook payload
    const payload = await req.json();
    const { event, payload: eventPayload } = payload;
    
    // Get Razorpay signature from headers
    const signature = req.headers.get('x-razorpay-signature');
    
    if (!signature) {
      throw new Error('Missing webhook signature');
    }
    
    // Verify signature
    const isValid = verifyRazorpaySignature(payload, signature, webhookSecret);
    
    if (!isValid) {
      throw new Error('Invalid webhook signature');
    }
    
    // Log webhook event to Supabase
    const { error: logError } = await supabase
      .from('webhook_logs')
      .insert([{
        event_type: event,
        payload: eventPayload,
        signature: signature
      }]);
    
    if (logError) {
      console.error('Error logging webhook:', logError);
    }
    
    // Handle different event types
    switch (event) {
      case 'payment.captured':
        // Update payment status in database
        await supabase
          .from('payment_logs')
          .update({
            status: 'completed',
            webhook_processed_at: new Date().toISOString(),
            metadata: {
              webhook_event: event,
              payment_details: eventPayload.payment.entity,
              processed_at: new Date().toISOString()
            }
          })
          .eq('payment_id', eventPayload.payment.entity.id);
        break;
        
      case 'payment.failed':
        // Update payment status for failed payment
        await supabase
          .from('payment_logs')
          .update({
            status: 'failed',
            webhook_processed_at: new Date().toISOString(),
            metadata: {
              webhook_event: event,
              payment_details: eventPayload.payment.entity,
              processed_at: new Date().toISOString()
            }
          })
          .eq('payment_id', eventPayload.payment.entity.id);
        break;
      
      case 'refund.processed':
        // Handle refund processing
        await supabase
          .from('payment_logs')
          .update({
            status: 'refunded',
            webhook_processed_at: new Date().toISOString(),
            metadata: {
              webhook_event: event,
              refund_details: eventPayload.refund.entity,
              processed_at: new Date().toISOString()
            }
          })
          .eq('payment_id', eventPayload.refund.entity.payment_id);
        break;
    }
    
    // Return success response
    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Webhook processing error:', error);
    
    // Return error response
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }
});
