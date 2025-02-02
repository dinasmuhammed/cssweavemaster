import { serve } from 'https://deno.fresh.dev/std@0.168.0/http/server.ts'

serve(async (req) => {
  const { name } = await req.json()
  const data = {
    message: `Hello ${name}!`,
    timestamp: new Date().toISOString()
  }

  return new Response(
    JSON.stringify(data),
    { 
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
      }
    },
  )
})