import { serve } from 'https://deno.fresh.dev/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const payload = await req.json();
    const { event, payload: eventPayload } = payload;

    // Verify webhook signature
    const webhookSignature = req.headers.get('x-razorpay-signature');
    if (!webhookSignature) {
      throw new Error('Missing webhook signature');
    }

    // Log webhook event in Supabase
    await supabase
      .from('webhook_logs')
      .insert([{
        event_type: event,
        payload: eventPayload,
        signature: webhookSignature,
        processed_at: new Date().toISOString()
      }]);

    // Update payment status based on webhook event
    if (event === 'payment.captured') {
      await supabase
        .from('payment_logs')
        .update({ 
          status: 'completed',
          webhook_processed_at: new Date().toISOString()
        })
        .match({ payment_id: eventPayload.payment.entity.id });
    }

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