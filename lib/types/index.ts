export interface Conversation {
  id: string
  user_id: string
  title: string
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  conversation_id: string
  role: 'user' | 'assistant'
  content: string
  analysis_data?: Record<string, any>
  created_at: string
}

export interface DecisionAnalytic {
  id: string
  user_id: string
  conversation_id?: string
  decision_text: string
  assumptions: Record<string, any>
  counterarguments: Record<string, any>
  risks: Record<string, any>
  decision_date: string
  outcome?: string
  outcome_date?: string
  lesson_learned?: string
  created_at: string
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface AnalysisResult {
  parsed_decision: string
  assumptions: string[]
  counterarguments: string[]
  risks: string[]
  synthesis: string
}

export interface PipelineStage {
  id: string
  name: string
  description: string
}

export interface User {
  id: string
  email: string
  created_at: string
}
