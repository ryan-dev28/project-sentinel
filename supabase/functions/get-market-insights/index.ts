import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'


const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { data: leads, error: fetchError } = await supabaseClient
      .from('market_leads')
      .select('*')
      .eq('status', 'Verified')

    if (fetchError) throw fetchError

    await supabaseClient
      .from('organizations')
      .update({ updated_at: new Date().toISOString() })
      .eq('slug', 'test')

    const transformedData = leads.map((lead: any) => ({
      ...lead,
      internal_score: (lead.financial_metric * 1.5).toFixed(2),
      processed_at: new Date().toISOString()
    }))

    return new Response(JSON.stringify(transformedData), {
      headers: { 
        ...corsHeaders,
        "Content-Type": "application/json" 
      },
      status: 200,
    })

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { 
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500 
    })
  }
})