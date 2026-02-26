'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { AlertCircle, Zap, TrendingDown, Eye, BarChart3, Home } from 'lucide-react'
import Link from 'next/link'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

const analysisIcons = [
  { icon: AlertCircle, label: 'Assumptions Challenged', color: 'text-red-500' },
  { icon: Zap, label: 'Counterarguments', color: 'text-orange-500' },
  { icon: TrendingDown, label: 'Risks & Failures', color: 'text-yellow-500' },
  { icon: Eye, label: 'Hidden Complexity', color: 'text-blue-500' },
]

export function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('=== SUBMIT CLICKED ===')
    console.log('Input value:', input)
    console.log('Input trimmed:', input?.trim())
    console.log('Is loading:', isLoading)
    
    if (!input || input.trim() === '' || isLoading) {
      console.log('BLOCKED - empty or loading')
      return
    }
    
    const userMessage = input.trim()
    setInput('')
    setIsLoading(true)
    setError(null)

    console.log('Adding user message:', userMessage)

    // Add user message to chat
    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: userMessage }]
    setMessages(newMessages)

    console.log('Calling API...')

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages,
        }),
      })

      console.log('API response status:', response.status)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      if (data?.error) {
        throw new Error(data.error)
      }

      const assistantMessage = data?.text || 'No response received.'
      setMessages([...newMessages, { role: 'assistant', content: assistantMessage }])
      console.log('Response complete')
    } catch (err) {
      console.error('Chat error:', err)
      setError(err instanceof Error ? err : new Error('Unknown error'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Devils Advocate</h1>
              <p className="text-sm text-slate-400">Challenge your assumptions. Explore the complexity.</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                <Home className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/analytics">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                <BarChart3 className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 m-6 rounded-lg">
          <p className="font-semibold">Error:</p>
          <p>{error.message}</p>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center max-w-md">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-orange-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Welcome to Devils Advocate</h2>
              <p className="text-slate-400 mb-6">
                Share a decision you're making or a choice you're considering. I'll challenge your assumptions, explore worst-case scenarios, and help you understand the true complexity of your decision.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {analysisIcons.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-slate-400">
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, idx) => (
              <div
                key={idx}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-2xl ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white rounded-2xl rounded-br-none'
                      : 'bg-slate-700/60 text-slate-100 rounded-2xl rounded-bl-none border border-slate-600'
                  } px-6 py-4`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-700/60 text-slate-100 rounded-2xl rounded-bl-none border border-slate-600 px-6 py-4">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-slate-700 bg-slate-800/50 backdrop-blur-sm p-6">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="flex gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Share a decision you're making... I'll challenge it."
              className="flex-1 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 focus:border-orange-500"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold px-6"
            >
              {isLoading ? 'Thinking...' : 'Challenge'}
            </Button>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            💡 Tip: Be specific about your decision. Include context for better analysis.
          </p>
        </form>
      </div>
    </div>
  )
}
