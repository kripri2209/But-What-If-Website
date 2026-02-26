import { createServerClient } from '@/lib/supabase/server'

export async function saveConversation(userId: string, title: string) {
  const supabase = await createServerClient()
  
  const { data, error } = await supabase
    .from('conversations')
    .insert({ user_id: userId, title })
    .select('id')
    .single()
  
  if (error) throw error
  return data
}

export async function saveMessage(conversationId: string, role: 'user' | 'assistant', content: string, analysisData?: any) {
  const supabase = await createServerClient()
  
  const { data, error } = await supabase
    .from('messages')
    .insert({
      conversation_id: conversationId,
      role,
      content,
      analysis_data: analysisData,
    })
    .select('id')
    .single()
  
  if (error) throw error
  return data
}

export async function getConversations(userId: string) {
  const supabase = await createServerClient()
  
  const { data, error } = await supabase
    .from('conversations')
    .select('id, title, created_at, updated_at')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })
  
  if (error) throw error
  return data
}

export async function getMessages(conversationId: string) {
  const supabase = await createServerClient()
  
  const { data, error } = await supabase
    .from('messages')
    .select('id, role, content, analysis_data, created_at')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true })
  
  if (error) throw error
  return data
}

export async function saveDecisionAnalytics(
  userId: string,
  conversationId: string | null,
  decision: string,
  assumptions: any,
  counterarguments: any,
  risks: any
) {
  const supabase = await createServerClient()
  
  const { data, error } = await supabase
    .from('decision_analytics')
    .insert({
      user_id: userId,
      conversation_id: conversationId,
      decision_text: decision,
      assumptions,
      counterarguments,
      risks,
    })
    .select('id')
    .single()
  
  if (error) throw error
  return data
}

export async function getDecisionAnalytics(userId: string, limit = 50) {
  const supabase = await createServerClient()
  
  const { data, error } = await supabase
    .from('decision_analytics')
    .select('*')
    .eq('user_id', userId)
    .order('decision_date', { ascending: false })
    .limit(limit)
  
  if (error) throw error
  return data
}
