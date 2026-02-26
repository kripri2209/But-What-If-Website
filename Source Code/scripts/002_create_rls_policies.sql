-- Enable Row Level Security
ALTER TABLE IF EXISTS public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.decision_analytics ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid duplicates)
DROP POLICY IF EXISTS "conversations_select_own" ON public.conversations;
DROP POLICY IF EXISTS "conversations_insert_own" ON public.conversations;
DROP POLICY IF EXISTS "conversations_update_own" ON public.conversations;
DROP POLICY IF EXISTS "conversations_delete_own" ON public.conversations;
DROP POLICY IF EXISTS "messages_select_own_conversation" ON public.messages;
DROP POLICY IF EXISTS "messages_insert_own_conversation" ON public.messages;
DROP POLICY IF EXISTS "decision_analytics_select_own" ON public.decision_analytics;
DROP POLICY IF EXISTS "decision_analytics_insert_own" ON public.decision_analytics;
DROP POLICY IF EXISTS "decision_analytics_update_own" ON public.decision_analytics;

-- Conversations RLS Policies
CREATE POLICY "conversations_select_own" ON public.conversations 
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "conversations_insert_own" ON public.conversations 
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "conversations_update_own" ON public.conversations 
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "conversations_delete_own" ON public.conversations 
FOR DELETE USING (auth.uid() = user_id);

-- Messages RLS Policies (can view/edit if conversation owner)
CREATE POLICY "messages_select_own_conversation" ON public.messages 
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.conversations 
    WHERE conversations.id = messages.conversation_id 
    AND conversations.user_id = auth.uid()
  )
);

CREATE POLICY "messages_insert_own_conversation" ON public.messages 
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.conversations 
    WHERE conversations.id = messages.conversation_id 
    AND conversations.user_id = auth.uid()
  )
);

-- Decision Analytics RLS Policies
CREATE POLICY "decision_analytics_select_own" ON public.decision_analytics 
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "decision_analytics_insert_own" ON public.decision_analytics 
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "decision_analytics_update_own" ON public.decision_analytics 
FOR UPDATE USING (auth.uid() = user_id);
