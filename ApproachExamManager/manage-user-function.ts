// supabase/functions/manage-user/index.ts
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing authorization' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!
    const callerClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    })

    const { data: { user } } = await callerClient.auth.getUser()
    if (!user) {
      return new Response(JSON.stringify({ error: 'Not authenticated' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const { data: profile } = await callerClient
      .from('profiles').select('role, is_active').eq('id', user.id).single()

    if (!profile || profile.role !== 'academic' || !profile.is_active) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), {
        status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const { action, user_id, email } = await req.json()

    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const adminClient = createClient(supabaseUrl, serviceRoleKey)

    if (action === 'resend_invite') {
      if (!email) throw new Error('email is required for resend')
      // Re-invite (Supabase will send a fresh link)
      const { data: existing } = await adminClient
        .from('profiles').select('role').eq('email', email).single()
      const role = existing?.role || 'teacher'

      const setupUrl = Deno.env.get('SETUP_ACCOUNT_URL')
      const inviteOptions: { data: { role: string }, redirectTo?: string } = {
        data: { role }
      }
      if (setupUrl) inviteOptions.redirectTo = setupUrl

      const { error } = await adminClient.auth.admin.inviteUserByEmail(email, inviteOptions)
      if (error) throw error
      return new Response(JSON.stringify({ success: true }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    if (action === 'delete_pending') {
      // Only allow deletion of users who haven't logged in yet (pending invites)
      if (!user_id) throw new Error('user_id is required')
      const { data: target } = await callerClient
        .from('profiles').select('first_login_at').eq('id', user_id).single()
      if (!target) throw new Error('User not found')
      if (target.first_login_at) {
        throw new Error('Cannot delete a user who has already logged in. Deactivate instead.')
      }
      const { error } = await adminClient.auth.admin.deleteUser(user_id)
      if (error) throw error
      return new Response(JSON.stringify({ success: true }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    return new Response(JSON.stringify({ error: 'Unknown action' }), {
      status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message || 'Unknown error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})