# But, What If... - Visual Architecture Guide

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          USER BROWSER (Client)                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                    Next.js Pages & Components                    │   │
│  ├──────────────────────────────────────────────────────────────────┤   │
│  │                                                                  │   │
│  │  ┌─────────────────┐  ┌──────────────┐  ┌────────────────────┐ │   │
│  │  │   Landing Page  │  │ Chat UI      │  │ Analytics          │ │   │
│  │  │ (landing-page   │  │ (chat-       │  │ Dashboard          │ │   │
│  │  │  .tsx)          │  │  interface   │  │ (analytics-        │ │   │
│  │  │                 │  │  .tsx)       │  │  dashboard.tsx)    │ │   │
│  │  │ • Hero section  │  │              │  │                    │ │   │
│  │  │ • Features      │  │ • Messages   │  │ • Decision history │ │   │
│  │  │ • 5-stage       │  │ • Input      │  │ • Analytics charts │ │   │
│  │  │   pipeline viz  │  │ • Streaming  │  │ • Insights         │ │   │
│  │  │ • CTA buttons   │  │   response   │  │                    │ │   │
│  │  └─────────────────┘  └──────────────┘  └────────────────────┘ │   │
│  │                                                                  │   │
│  │  ┌──────────────────────────────────────────────────────────┐  │   │
│  │  │           Shadcn/ui Components (Tailwind CSS)           │  │   │
│  │  │  Buttons, Inputs, Cards, Dialogs, etc...               │  │   │
│  │  └──────────────────────────────────────────────────────────┘  │   │
│  │                                                                  │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
                                    ↓ HTTP (REST API)
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                        VERCEL / NEXT.JS SERVER                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                      API Routes (Next.js)                        │   │
│  ├──────────────────────────────────────────────────────────────────┤   │
│  │                                                                  │   │
│  │  ┌────────────────────────────────────────────────────────────┐ │   │
│  │  │   POST /api/chat (app/api/chat/route.ts)                 │ │   │
│  │  │                                                            │ │   │
│  │  │   1. Parse Request                                         │ │   │
│  │  │      └─ Extract messages from request body               │ │   │
│  │  │                                                            │ │   │
│  │  │   2. 5-STAGE PIPELINE                                      │ │   │
│  │  │      ├─ PARSER: Extract core decision                    │ │   │
│  │  │      │  └─ GPT-4 + prompts.PARSER                       │ │   │
│  │  │      │                                                    │ │   │
│  │  │      ├─ ASSUMPTIONS: Identify hidden beliefs            │ │   │
│  │  │      │  └─ GPT-4 + prompts.ASSUMPTIONS                 │ │   │
│  │  │      │                                                    │ │   │
│  │  │      ├─ COUNTERARGUMENTS: Generate opposing views       │ │   │
│  │  │      │  └─ GPT-4 + prompts.COUNTERARGUMENTS            │ │   │
│  │  │      │                                                    │ │   │
│  │  │      ├─ RISK_ANALYSIS: Explore failure modes           │ │   │
│  │  │      │  └─ GPT-4 + prompts.RISK_ANALYSIS              │ │   │
│  │  │      │                                                    │ │   │
│  │  │      └─ SYNTHESIS: Create comprehensive response        │ │   │
│  │  │         └─ GPT-4 + prompts.SYNTHESIS (STREAMED)        │ │   │
│  │  │                                                            │ │   │
│  │  │   3. Return Streaming Response                             │ │   │
│  │  │      └─ toUIMessageStreamResponse()                      │ │   │
│  │  │         (Real-time SSE to client)                        │ │   │
│  │  │                                                            │ │   │
│  │  │   lib/supabase/db.ts                                      │ │   │
│  │  │   └─ saveMessage(conversationId, role, content)         │ │   │
│  │  │      └─ Insert into 'messages' table                    │ │   │
│  │  │                                                            │ │   │
│  │  └────────────────────────────────────────────────────────────┘ │   │
│  │                                                                  │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │              Middleware (middleware.ts)                          │   │
│  │  • Session management for Supabase auth                        │   │
│  │  • Token refresh                                              │   │
│  │  • Protected route handling                                  │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
       ↓ TypeScript Utility Functions
       ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                        UTILITY LAYER                                    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐      │
│  │ Supabase Clients │  │ Constants        │  │ Types            │      │
│  ├──────────────────┤  ├──────────────────┤  ├──────────────────┤      │
│  │                  │  │                  │  │                  │      │
│  │ • client.ts      │  │ • prompts.ts     │  │ • index.ts       │      │
│  │   Browser client │  │   PARSER prompt  │  │   Conversation   │      │
│  │   with SSR       │  │   ASSUMPTIONS    │  │   Message        │      │
│  │                  │  │   COUNTERARGM    │  │   DecisionAnalyc │      │
│  │ • server.ts      │  │   RISK_ANALYSIS  │  │   User           │      │
│  │   Server client  │  │   SYNTHESIS      │  │   AnalysisResult │      │
│  │   with cookies   │  │                  │  │                  │      │
│  │                  │  │ • constants      │  │ • All types in   │      │
│  │ • db.ts          │  │   PIPELINE_      │  │   one place      │      │
│  │   Database funcs │  │   STAGES         │  │                  │      │
│  │   CRUD operations│  │   ANALYSIS_ICONS │  │                  │      │
│  │                  │  │   _MAP           │  │                  │      │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘      │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
              ↓ Supabase SDK @supabase/supabase-js
              ↓ OpenAI SDK @ai-sdk/openai
              ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                      EXTERNAL SERVICES                                  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌───────────────────────────────┐  ┌──────────────────────────────┐   │
│  │   Supabase (Backend)          │  │  OpenAI (LLM)               │   │
│  ├───────────────────────────────┤  ├──────────────────────────────┤   │
│  │                               │  │                              │   │
│  │ PostgreSQL Database:          │  │  • GPT-4 Models              │   │
│  │ • conversations table         │  │  • Via Vercel AI Gateway    │   │
│  │ • messages table              │  │  • Streaming responses       │   │
│  │ • decision_analytics table    │  │  • 5 parallel API calls     │   │
│  │                               │  │    (pipeline stages)        │   │
│  │ Row Level Security:           │  │                              │   │
│  │ • Users see own data only     │  │  Response Format:            │   │
│  │ • RLS policies on all tables  │  │  • Text chunks streamed      │   │
│  │                               │  │  • Real-time feedback        │   │
│  │ Auth System:                  │  │                              │   │
│  │ • User registration           │  │  Cost:                       │   │
│  │ • Session management          │  │  • Per-token pricing        │   │
│  │ • Token refresh               │  │  • Pipeline = 5 calls       │   │
│  │                               │  │                              │   │
│  └───────────────────────────────┘  └──────────────────────────────┘   │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

```
USER SENDS MESSAGE
       ↓
   "I want to quit my job"
       ↓
Chat UI calls API
(useChat hook → DefaultChatTransport)
       ↓
POST /api/chat
       ↓
Server receives: { messages: [{ role: 'user', content: '...' }] }
       ↓
Check if first message or follow-up
       ↓
       ├─ FIRST MESSAGE? ────────────────────┐
       │                                    │
       │                                 YES│
       │                                    ↓
       │                            Run 5-Stage Pipeline:
       │                            ┌──────────────────────┐
       │                            │ 1. PARSER (generateText)
       │                            │    Extracted decision: ...
       │                            │
       │                            │ 2. ASSUMPTIONS (generateText)
       │                            │    Assumptions: [...]
       │                            │
       │                            │ 3. COUNTERARGUMENTS (generateText)
       │                            │    Counter args: [...]
       │                            │
       │                            │ 4. RISK_ANALYSIS (generateText)
       │                            │    Risks: [...]
       │                            │
       │                            │ 5. SYNTHESIS (streamText)
       │                            │    → STREAM RESPONSE ←
       │                            └──────────────────────┘
       │                                    ↓
       │                            Response streams to UI
       │                                    ↓
       │                            Save in database
       │
       └─ FOLLOW-UP MESSAGE? ────────────────┐
                                          NO │
                                            ↓
                                    Use context-aware response
                                    (simpler, faster model)
                                            ↓
                                    Stream to UI
                                            ↓
                                    Save in database
```

## Database Schema Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    SUPABASE DATABASE                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ TABLE: conversations                                │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ id (UUID, PK)         PRIMARY KEY                   │   │
│  │ user_id (UUID, FK)    → auth.users(id)             │   │
│  │ title (TEXT)          Chat session title           │   │
│  │ created_at            Timestamp                    │   │
│  │ updated_at            Timestamp                    │   │
│  │                                                      │   │
│  │ RLS: Users see own conversations only              │   │
│  │ Indexes: (user_id), (created_at)                   │   │
│  └─────────────────────────────────────────────────────┘   │
│              ↓ one-to-many relationship                     │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ TABLE: messages                                      │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ id (UUID, PK)                 PRIMARY KEY           │   │
│  │ conversation_id (UUID, FK)    → conversations(id)  │   │
│  │ role (TEXT)                   'user' or 'assistant'│   │
│  │ content (TEXT)                Message text         │   │
│  │ analysis_data (JSONB)         Stage analysis data  │   │
│  │ created_at                    Timestamp            │   │
│  │                                                      │   │
│  │ RLS: Access via conversation owner                 │   │
│  │ Indexes: (conversation_id), (created_at)           │   │
│  └─────────────────────────────────────────────────────┘   │
│              ↓ one-to-many relationship                     │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ TABLE: decision_analytics                            │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ id (UUID, PK)                 PRIMARY KEY           │   │
│  │ user_id (UUID, FK)            → auth.users(id)     │   │
│  │ conversation_id (UUID, FK)    → conversations(id)  │   │
│  │ decision_text (TEXT)          Original decision    │   │
│  │ assumptions (JSONB)           Analysis result      │   │
│  │ counterarguments (JSONB)      Analysis result      │   │
│  │ risks (JSONB)                 Analysis result      │   │
│  │ decision_date                 When made            │   │
│  │ outcome (TEXT)                Result of decision   │   │
│  │ outcome_date                  When outcome known   │   │
│  │ lesson_learned (TEXT)         Reflection          │   │
│  │ created_at                    Timestamp            │   │
│  │                                                      │   │
│  │ RLS: Users see own analytics only                  │   │
│  │ Indexes: (user_id), (decision_date)                │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Component Tree

```
<html>
  └─ <RootLayout>
      ├─ <head> (metadata)
      └─ <body>
          ├─ layout: "/" (LandingPage)
          │   ├─ Navigation
          │   ├─ Hero Section
          │   ├─ Features Grid (4 cards)
          │   ├─ 5-Stage Pipeline Visualization
          │   ├─ CTA Section
          │   └─ Footer
          │
          ├─ layout: "/chat" (ChatInterface)
          │   ├─ Header (with navigation)
          │   ├─ Messages Area
          │   │   ├─ Empty State (welcome)
          │   │   ├─ User Message (blue)
          │   │   ├─ Assistant Message (gray)
          │   │   └─ Loading Animation
          │   └─ Input Area (text field + button)
          │
          └─ layout: "/analytics" (AnalyticsDashboard)
              ├─ Header
              ├─ Stats Cards
              ├─ Charts/Graphs
              ├─ Decision History Table
              └─ Insights Panel
```

## Request/Response Flow

```
CLIENT SIDE                     SERVER SIDE                  EXTERNAL
───────────                     ───────────                  ────────

Chat UI Input
    │
    ├─ useChat hook
    │  └─ DefaultChatTransport
    │
    ├─ POST /api/chat
    ├────────────────────────────▶ API Handler (route.ts)
    │                            │
    │                            ├─ Extract messages
    │                            │
    │                            ├─ Check if first message
    │                            │
    │                            ├─ If first: Run pipeline
    │                            │  ├──────────────────────▶ GPT-4: Parser
    │                            │  │◀────────────────────── Response
    │                            │  ├──────────────────────▶ GPT-4: Assumptions
    │                            │  │◀────────────────────── Response
    │                            │  ├──────────────────────▶ GPT-4: Counterargs
    │                            │  │◀────────────────────── Response
    │                            │  ├──────────────────────▶ GPT-4: Risk Analysis
    │                            │  │◀────────────────────── Response
    │                            │  └──────────────────────▶ GPT-4: Synthesis (STREAM)
    │                            │   ◀────── chunk 1 ────── ↓
    │◀────────────────────────────────────── chunk 2 ────────
    │◀────────────────────────────────────── chunk 3 ────────
    │◀────────────────────────────────────── ... ────────────
    │◀────────────────────────────────────── [DONE] ────────
    │                            │
    │                            └─ Save to DB
    │                               ├──────────────────────▶ Supabase
    │                               │  INSERT message
    │                               │◀──────────────────────
    │
    ├─ Display in Chat UI (streaming)
    │
    └─ User reads response & continues...
```

## Key Files Interaction Map

```
User Request
    ↓
app/page.tsx (Landing)
app/chat/page.tsx (Chat UI)
    ├─ imports ─▶ components/landing-page.tsx
    ├─ imports ─▶ components/chat-interface.tsx
    │             ├─ imports ─▶ @ai-sdk/react (useChat)
    │             └─ imports ─▶ lib/types/index.ts
    │
    ├─ calls POST /api/chat
    │   ├─ app/api/chat/route.ts
    │   │   ├─ imports ─▶ ai (streamText, generateText)
    │   │   ├─ imports ─▶ @ai-sdk/openai (openai model)
    │   │   ├─ imports ─▶ lib/constants/prompts.ts (SYSTEM_PROMPTS)
    │   │   ├─ imports ─▶ lib/supabase/db.ts (saveMessage)
    │   │   │   └─ imports ─▶ lib/supabase/server.ts
    │   │   │       └─ imports ─▶ @supabase/supabase-js
    │   │   └─ imports ─▶ lib/types/index.ts
    │   │
    │   └─ Response streamed back
    │
    └─ Display response in Chat UI
```

## Deployment Architecture

```
GitHub Repository
    │ (push)
    ↓
Vercel
    ├─ Builds Next.js project
    ├─ Deploys to Edge Network
    ├─ Manages environment variables
    ├─ Handles auto-deployments on push
    └─ Provides live URL
        │
        └─ Frontend served
            ├─ app/page.tsx
            ├─ app/chat/page.tsx
            ├─ app/analytics/page.tsx
            └─ app/api/chat/route.ts
                ├─ Calls Supabase API
                ├─ Calls OpenAI API
                └─ Streams response


Supabase (Backend)
    ├─ PostgreSQL Database
    ├─ Row Level Security
    ├─ Authentication
    └─ Real-time subscriptions


OpenAI (External)
    ├─ GPT-4 Models
    ├─ Text streaming
    └─ Token counting
```

---

## Legend

```
▶   : Call/Request
◀   : Response
→   : Imports
├─  : Connection
└─  : End of connection
---
```

This visual architecture shows how all components of But, What If... work together to deliver the analysis pipeline with real-time streaming responses!
