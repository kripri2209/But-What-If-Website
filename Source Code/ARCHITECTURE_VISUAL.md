# But, What If... - Visual Architecture Guide

## System Architecture Diagram

<img width="1024" height="1216" alt="ChatGPT Image Mar 8, 2026, 02_14_53 PM" src="https://github.com/user-attachments/assets/408f56de-dfcb-48d9-972e-9213b07999ec" />


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
    │                               ├──────────────────────▶ DB
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
