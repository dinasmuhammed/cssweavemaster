import { serve } from 'https://deno.fresh.dev/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import * as crypto from 'https://deno.land/std@0.177.0/crypto/mod.ts';

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
    const webhookSignature = req.headers.get('x-razorpay-signature');

    if (!webhookSignature) {
      throw new Error('Missing webhook signature');
    }

    const text = JSON.stringify(payload);
    const secret = Deno.env.get('RAZORPAY_WEBHOOK_SECRET') ?? '';
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(text);
    const digest = hmac.digest('hex');

    if (digest !== webhookSignature) {
      throw new Error('Invalid webhook signature');
    }

    const { error: logError } = await supabase
      .from('webhook_logs')
      .insert([{
        event_type: event,
        payload: eventPayload,
        signature: webhookSignature,
        status: 'received'
      }]);

    if (logError) throw logError;

    switch (event) {
      case 'payment.captured':
        await supabase
          .from('payment_logs')
          .update({ 
            status: 'completed',
            payment_id: eventPayload.payment.entity.id,
            webhook_processed_at: new Date().toISOString(),
            metadata: {
              payment_details: eventPayload.payment.entity,
              processed_at: new Date().toISOString()
            }
          })
          .eq('order_id', eventPayload.payment.entity.order_id);
        break;

      case 'payment.failed':
        await supabase
          .from('payment_logs')
          .update({ 
            status: 'failed',
            payment_id: eventPayload.payment.entity.id,
            webhook_processed_at: new Date().toISOString(),
            metadata: {
              error_details: eventPayload.payment.entity,
              failed_at: new Date().toISOString()
            }
          })
          .eq('order_id', eventPayload.payment.entity.order_id);
        break;
    }

    await supabase
      .from('webhook_logs')
      .update({ status: 'processed' })
      .eq('event_type', event)
      .eq('signature', webhookSignature);

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Webhook processing error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
