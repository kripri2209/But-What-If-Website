"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: number;
}

interface Option {
  title: string;
  description: string;
  pros: string[];
  cons: string[];
}

// Enhanced markdown rendering component
const MarkdownRenderer = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              style={vscDarkPlus}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className="bg-gray-100 px-1 rounded text-sm" {...props}>
              {children}
            </code>
          );
        },
        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
        ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
        li: ({ children }) => <li className="ml-2">{children}</li>,
        strong: ({ children }) => <strong className="font-bold text-black">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-gray-300 pl-4 italic my-2">{children}</blockquote>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

const getInitialMessages = (): ChatMessage[] => [
  {
    role: "system",
    content:
      "Devil's Advocate here. Tell me what you think is a good idea, and I'll tell you what you're missing.",
  },
];

export function ChatInterface({ showIntroOnly = false, onSkip }: { showIntroOnly?: boolean, onSkip?: () => void }) {
  // Chat session management
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { toast } = useToast();
  
  // Current chat state
  const [messages, setMessages] = useState<ChatMessage[]>(getInitialMessages());
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const [retryMessageIndex, setRetryMessageIndex] = useState<number | null>(null);
  const [showIntro, setShowIntro] = useState(false);
  const [showOrbitalDots, setShowOrbitalDots] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [expandedMessages, setExpandedMessages] = useState<Set<number>>(new Set());
  const [activeTab, setActiveTab] = useState<Map<number, string>>(new Map());
  
  const toggleMessageExpansion = (index: number) => {
    setExpandedMessages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };
  
  const setMessageTab = (messageIndex: number, tabName: string) => {
    setActiveTab(prev => {
      const newMap = new Map(prev);
      newMap.set(messageIndex, tabName);
      return newMap;
    });
  };
  
  // Load chat sessions from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('chatSessions');
    if (saved) {
      const sessions: ChatSession[] = JSON.parse(saved);
      setChatSessions(sessions);
      if (sessions.length > 0) {
        const lastSession = sessions[0];
        setCurrentChatId(lastSession.id);
        setMessages(lastSession.messages);
      } else {
        createNewChat();
      }
    } else {
      createNewChat();
    }
  }, []);
  
  // Save current chat to localStorage whenever messages change
  useEffect(() => {
    if (!currentChatId || messages.length <= 1) return;
    
    const updatedSessions = chatSessions.map(session => 
      session.id === currentChatId 
        ? { 
            ...session, 
            messages,
            title: generateChatTitle(messages)
          }
        : session
    );
    
    // If current chat doesn't exist yet, add it
    if (!chatSessions.find(s => s.id === currentChatId)) {
      updatedSessions.unshift({
        id: currentChatId,
        title: generateChatTitle(messages),
        messages,
        createdAt: Date.now()
      });
    }
    
    setChatSessions(updatedSessions);
    localStorage.setItem('chatSessions', JSON.stringify(updatedSessions));
  }, [messages, currentChatId]);
  
  const generateChatTitle = (msgs: ChatMessage[]): string => {
    const userMsg = msgs.find(m => m.role === 'user');
    if (userMsg) {
      return userMsg.content.slice(0, 40) + (userMsg.content.length > 40 ? '...' : '');
    }
    return 'New Chat';
  };
  
  const createNewChat = () => {
    const newId = Date.now().toString();
    const newSession: ChatSession = {
      id: newId,
      title: 'New Chat',
      messages: getInitialMessages(),
      createdAt: Date.now()
    };
    
    setChatSessions(prev => [newSession, ...prev]);
    setCurrentChatId(newId);
    setMessages(getInitialMessages());
    setInput('');
    setError(null);
    setExpandedMessages(new Set());
    setActiveTab(new Map());
  };
  
  const switchChat = (chatId: string) => {
    const session = chatSessions.find(s => s.id === chatId);
    if (session) {
      setCurrentChatId(chatId);
      setMessages(session.messages);
      setInput('');
      setError(null);
      setExpandedMessages(new Set());
      setActiveTab(new Map());
    }
  };
  
  const deleteChat = (chatId: string) => {
    const updated = chatSessions.filter(s => s.id !== chatId);
    setChatSessions(updated);
    localStorage.setItem('chatSessions', JSON.stringify(updated));
    
    if (chatId === currentChatId) {
      if (updated.length > 0) {
        switchChat(updated[0].id);
      } else {
        createNewChat();
      }
    }
  };
  
  // Copy message to clipboard
  const copyMessage = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      toast({
        title: "Copied to clipboard",
        description: "Message copied successfully",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy to clipboard",
        variant: "destructive",
      });
    }
  };
  
  // Clear current conversation
  const clearConversation = () => {
    if (confirm('Clear this conversation? This cannot be undone.')) {
      setMessages(getInitialMessages());
      setInput('');
      setError(null);
      setExpandedMessages(new Set());
      setActiveTab(new Map());
      toast({
        title: "Conversation cleared",
        description: "Starting fresh",
      });
    }
  };
  
  // Retry a failed message
  const retryMessage = async (messageIndex: number) => {
    const userMessage = messages[messageIndex];
    if (!userMessage || userMessage.role !== 'user') return;
    
    // Remove failed assistant response if present
    const truncatedMessages = messages.slice(0, messageIndex + 1);
    setMessages(truncatedMessages);
    setRetryMessageIndex(messageIndex);
    
    // Re-submit
    await submitMessage(userMessage.content, truncatedMessages);
  };
  
  // Extracted submission logic for reuse
  const submitMessage = async (userContent: string, existingMessages?: ChatMessage[]) => {
    const messagesToSend = existingMessages || [...messages, { role: "user" as const, content: userContent }];
    if (!existingMessages) {
      setMessages(messagesToSend);
    }
    
    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      if (isLoading) {
        toast({
          title: "Taking longer than expected",
          description: "The server might be busy. Please wait...",
        });
      }
    }, 15000);
    
    try {
      const controller = new AbortController();
      const requestTimeout = setTimeout(() => controller.abort(), 30000);
      
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: messagesToSend.filter((m) => m.role !== "system").map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
        signal: controller.signal,
      });
      
      clearTimeout(requestTimeout);
      
      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 429) {
          throw new Error(data.error || 'Too many requests. Please wait a moment.');
        } else if (response.status === 400) {
          throw new Error(data.error || 'Invalid input. Please try rephrasing.');
        } else if (response.status === 503) {
          throw new Error(data.error || 'Service temporarily unavailable. Please try again.');
        } else {
          throw new Error(data.error || `Request failed with status ${response.status}`);
        }
      }
      
      const assistantMessage = data?.text || "No response received.";
      
      setMessages([
        ...messagesToSend,
        {
          role: "assistant",
          content: assistantMessage,
        },
      ]);
      setError(null);
      setRetryMessageIndex(null);
    } catch (err: any) {
      console.error("Chat error:", err);
      
      let errorMessage = "Unable to get response. Please try again.";
      
      if (err.name === 'AbortError') {
        errorMessage = "Request timed out. Please try a shorter message or check your connection.";
      } else if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        errorMessage = "Network error. Please check your internet connection.";
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setMessages([
        ...messagesToSend,
        {
          role: "assistant",
          content: `**System Error:**\n\n${errorMessage}\n\nPlease try again or refresh the page if the problem persists.`,
        },
      ]);
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      clearTimeout(timeoutId);
      setIsLoading(false);
    }
  };
  
  // Constants for validation
  const MAX_INPUT_LENGTH = 2000;
  const MIN_SUBMIT_INTERVAL = 2000; // 2 seconds between submissions
  
  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setError(null);
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      setError('You are currently offline. Messages will be sent when connection is restored.');
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Check initial status
    setIsOnline(navigator.onLine);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  const introQuestions = [
    "DEVILS ADVOCATE",
    "WHAT IF I'M WRONG?",
    "WHY DO I BELIEVE THIS?",
    "WHAT AM I IGNORING?",
    "WHO BENEFITS FROM MY CHOICE?",
    "WHAT'S THE WORST THAT COULD HAPPEN?",
    "WHAT AM I AFRAID OF?",
    "WHAT IF I CHALLENGE THIS?",
    "WHAT'S THE HIDDEN COST?",
    "WHOSE VOICE IS MISSING?"
  ];
  const [introText, setIntroText] = useState("WELCOME TO DEVIL'S ADVOCATE");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check if intro should be shown (after mount to avoid hydration issues)
  useEffect(() => {
    const introSeen = localStorage.getItem('introSeen');
    if (introSeen !== 'true') {
      setShowIntro(true);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!showIntro) return;
    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    const typeFlow = async () => {
      const textElement = document.getElementById("text");
      const cursor = document.getElementById("cursor");
      const body = document.getElementById("typing-body");
      if (!textElement || !cursor || !body) return;
      const fullText = introText;
      for (let i = 0; i <= fullText.length; i++) {
        textElement.innerText = fullText.slice(0, i);
        await sleep(150);
      }
      await sleep(2000);
      // Delete last word (after last space)
      const lastSpace = fullText.lastIndexOf(" ");
      for (let i = fullText.length; i >= lastSpace + 1; i--) {
        textElement.innerText = fullText.slice(0, i);
        await sleep(100);
      }
      await sleep(2000);
      // Delete everything
      for (let i = lastSpace + 1; i >= 0; i--) {
        textElement.innerText = fullText.slice(0, i);
        await sleep(100);
      }
      await sleep(2000);
      body.classList.add("black-screen");
      textElement.style.display = "none";
      cursor.style.display = "none";
      await sleep(2000);
      setShowIntro(false);
      setShowOrbitalDots(true);
    };
    const timer = setTimeout(typeFlow, 100);
    return () => {
      clearTimeout(timer);
    };
  }, [showIntro]);

  useEffect(() => {
    if (!showOrbitalDots) return;
    const timer = setTimeout(() => {
      setShowOrbitalDots(false);
    }, 35000);
    return () => clearTimeout(timer);
  }, [showOrbitalDots]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setError(null);
    
    // Prevent spam submissions
    const now = Date.now();
    if (now - lastSubmitTime < MIN_SUBMIT_INTERVAL) {
      toast({
        title: "Please wait",
        description: "Wait a moment before sending another message",
        variant: "destructive",
      });
      return;
    }
    
    // Basic validation
    if (!input || input.trim() === "" || isLoading) {
      return;
    }
    
    const userMessage = input.trim();
    
    // Length validation
    if (userMessage.length > MAX_INPUT_LENGTH) {
      toast({
        title: "Message too long",
        description: `Please keep it under ${MAX_INPUT_LENGTH} characters`,
        variant: "destructive",
      });
      return;
    }
    
    if (userMessage.length < 3) {
      toast({
        title: "Message too short",
        description: "Please provide more context",
        variant: "destructive",
      });
      return;
    }
    
    // Check for only emojis/symbols
    const hasText = /[a-zA-Z0-9]/.test(userMessage);
    if (!hasText) {
      toast({
        title: "Invalid message",
        description: "Please include actual text, not just symbols or emojis",
        variant: "destructive",
      });
      return;
    }
    
    // Check network status
    if (!isOnline) {
      toast({
        title: "No internet connection",
        description: "Please check your connection and try again",
        variant: "destructive",
      });
      return;
    }
    
    setInput("");
    setLastSubmitTime(now);
    
    await submitMessage(userMessage);
  };

  if (showIntro) {
    return (
      <>
        <div
          id="typing-body"
          onClick={() => {
            if (onSkip) {
              onSkip();
            } else {
              // Mark intro as seen so it never shows again
              localStorage.setItem('introSeen', 'true');
              setShowIntro(false);
              setShowOrbitalDots(false);
            }
          }}
          style={{
            margin: 0,
            padding: 0,
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#ffffff",
            color: "#1f2937",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
            fontSize: "13px",
            letterSpacing: "0.35em",
            fontWeight: 300,
            overflow: "hidden",
            transition: "opacity 2s ease",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 9999,
            cursor: "pointer",
          }}
        >
          <div id="text-container" style={{ display: "flex", alignItems: "center" }}>
            <span id="text"></span>
            <span
              id="cursor"
              className="cursor"
              style={{
                display: "inline-block",
                width: "2px",
                height: "1.5em",
                backgroundColor: "#1f2937",
                marginLeft: "5px",
                animation: "blink 1s infinite",
              }}
            ></span>
          </div>
          <div style={{
            position: "absolute",
            bottom: "3rem",
            left: "50%",
            transform: "translateX(-50%)",
          }}>
            <p style={{
              color: "#9ca3af",
              fontSize: "12px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              fontWeight: 300,
            }}>
              Click to skip
            </p>
          </div>
        </div>
        <style jsx global>{`
          @keyframes blink {
            50% {
              opacity: 0;
            }
          }
          .black-screen {
            background: #ffffff !important;
            opacity: 0.3 !important;
          }
        `}</style>
      </>
    );
  }

  if (showOrbitalDots) {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center cursor-pointer overflow-hidden z-[9999]"
        style={{ background: "#ffffff" }}
        onClick={() => {
          // Mark intro as seen so it never shows again
          localStorage.setItem('introSeen', 'true');
          setShowOrbitalDots(false);
          setShowIntro(false);
        }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Dots Container */}
          <div className="relative" style={{ width: '300px', height: '300px' }}>
            {[...Array(8)].map((_, i) => {
              const angle = (i * 360) / 8;
              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '10px',
                    height: '10px',
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-110px)`,
                    animation: `dotFadeIn 1s ease-out ${1 + i * 0.1}s forwards, orbit 20s linear 3s infinite, dotPulse 4s ease-in-out ${3 + i * 0.5}s infinite`,
                    opacity: 0
                  }}
                >
                  <div 
                    style={{
                      width: '10px',
                      height: '10px',
                      background: '#000000',
                      borderRadius: '50%',
                      boxShadow: '0 0 20px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.2)'
                    }}
                  />
                </div>
              );
            })}
            {/* Center Text */}
            <div 
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'textFadeIn 2s ease-out 3s forwards',
                opacity: 0
              }}
            >
              <p 
                style={{
                  color: '#1f2937',
                  fontSize: '18px',
                  letterSpacing: '0.35em',
                  padding: '0 2rem',
                  textAlign: 'center',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
                  fontWeight: 400
                }}
              >
                QUESTION EVERYTHING
              </p>
            </div>
          </div>
          {/* Subtle ambient glow */}
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              animation: 'glowPulse 6s ease-in-out 6s infinite',
              opacity: 0
            }}
          >
            <div 
              style={{
                width: '400px',
                height: '400px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)'
              }}
            />
          </div>
        </div>
        {/* Skip hint */}
        <div 
          style={{
            position: 'absolute',
            bottom: '3rem',
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'textFadeIn 1.5s ease-out 6s forwards',
            opacity: 0
          }}
        >
          <p 
            style={{
              color: '#94a3b8',
              fontSize: '12px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              fontWeight: 300
            }}
          >
            Click to skip
          </p>
        </div>
        {/* Animation Keyframes */}
        <style jsx>{`
          @keyframes dotFadeIn {
            0% {
              opacity: 0;
              transform: translate(-50%, -50%) rotate(0deg) translateY(-110px) scale(0.3);
            }
            100% {
              opacity: 1;
              transform: translate(-50%, -50%) rotate(0deg) translateY(-110px) scale(1);
            }
          }
          @keyframes orbit {
            0% {
              transform: translate(-50%, -50%) rotate(0deg) translateY(-110px);
            }
            100% {
              transform: translate(-50%, -50%) rotate(360deg) translateY(-110px);
            }
          }
          @keyframes dotPulse {
            0%, 100% {
              opacity: 0.7;
              filter: brightness(1);
            }
            50% {
              opacity: 1;
              filter: brightness(1.3);
            }
          }
          @keyframes textFadeIn {
            0% {
              opacity: 0;
              transform: scale(0.95);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
          @keyframes glowPulse {
            0%, 100% {
              opacity: 0;
            }
            50% {
              opacity: 0.3;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="flex h-screen" style={{ background: "#ffffff", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" }}>
      {/* Chat History Sidebar */}
      {sidebarOpen && (
        <div className="w-80 border-r flex flex-col" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif", background: "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(40px)", borderColor: "rgba(226, 232, 240, 0.8)" }}>
          {/* Sidebar Header */}
          <div className="border-b p-4" style={{ borderColor: "rgba(226, 232, 240, 0.8)" }}>
            <button
              onClick={createNewChat}
              className="w-full text-white py-3 rounded-lg transition-all hover:opacity-90 shadow-lg"
              style={{ background: "#000000", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif", fontSize: "11px", letterSpacing: "0.2em", fontWeight: 300, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)" }}
            >
              + NEW CHAT
            </button>
          </div>
          
          {/* Chat History List */}
          <div className="flex-1 overflow-y-auto p-3">
            {chatSessions.length === 0 ? (
              <p className="text-center mt-8" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif", fontSize: "11px", letterSpacing: "0.2em", fontWeight: 300, color: "#9ca3af" }}>No chat history</p>
            ) : (
              <div className="space-y-2">
                {chatSessions.map(session => (
                  <div
                    key={session.id}
                    className={`group relative rounded-lg p-3 cursor-pointer transition-all ${
                      session.id === currentChatId
                        ? 'border border-gray-300'
                        : 'border hover:border-gray-600/50'
                    }`}
                    style={{ 
                      background: session.id === currentChatId 
                        ? '#f3f4f6' 
                        : 'rgba(248, 250, 252, 0.8)',
                      borderColor: session.id === currentChatId ? '#d1d5db' : 'rgba(226, 232, 240, 0.6)',
                      boxShadow: session.id === currentChatId ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
                      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
                    }}
                    onClick={() => switchChat(session.id)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="truncate" style={{ fontSize: "11px", letterSpacing: "0.15em", fontWeight: 300, color: session.id === currentChatId ? '#000000' : '#64748b' }}>
                          {session.title}
                        </p>
                        <p className="mt-1" style={{ fontSize: "10px", letterSpacing: "0.1em", fontWeight: 300, color: session.id === currentChatId ? '#4b5563' : '#94a3b8' }}>
                          {new Date(session.createdAt).toLocaleDateString()} {new Date(session.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        <p className="text-gray-600 mt-1" style={{ fontSize: "10px", letterSpacing: "0.1em", fontWeight: 300, color: "#94a3b8" }}>
                          {session.messages.filter(m => m.role !== 'system').length} messages
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm('Delete this chat?')) {
                            deleteChat(session.id);
                          }
                        }}
                        className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-black transition-opacity text-sm font-bold"
                        aria-label="Delete chat"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Sidebar Footer */}
          <div className="border-t p-3" style={{ borderColor: "rgba(226, 232, 240, 0.8)" }}>
            <p className="text-gray-600 text-center" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif", fontSize: "10px", letterSpacing: "0.2em", fontWeight: 300, color: "#94a3b8" }}>
              {chatSessions.length} {chatSessions.length === 1 ? 'CHAT' : 'CHATS'} SAVED
            </p>
          </div>
        </div>
      )}
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b py-4" style={{ background: "rgba(255, 255, 255, 0.7)", backdropFilter: "blur(40px)", borderColor: "rgba(226, 232, 240, 0.8)" }}>
          <div className="flex items-center justify-between px-8">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="transition-colors"
              style={{ color: "#000000", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif", fontSize: "11px", letterSpacing: "0.2em", fontWeight: 300 }}
              onMouseEnter={(e) => e.currentTarget.style.color = "#4b5563"}
              onMouseLeave={(e) => e.currentTarget.style.color = "#000000"}
            >
              {sidebarOpen ? '▶ HIDE' : '◀ HISTORY'}
            </button>
            <p className="text-center flex-1" style={{ 
              fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif", 
              fontSize: "15px", 
              letterSpacing: "0.35em", 
              fontWeight: 300,
              color: "#000000"
            }}>
              Devil's Advocate
            </p>
            <button
              onClick={clearConversation}
              className="transition-colors hover:text-red-600"
              style={{ color: "#6b7280", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif", fontSize: "11px", letterSpacing: "0.2em", fontWeight: 300 }}
              title="Clear conversation"
            >
              🗑 CLEAR
            </button>
          </div>
        </div>
        
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto py-8 space-y-8 relative">
          <div className="max-w-5xl mx-auto px-8">
            {messages.map((message, idx) => {
              // Parse response for three-part format
              const parseResponse = (content: string) => {
                // Split by ---DETAILED---
                const mainParts = content.split('---DETAILED---');
                const verdict = mainParts[0]?.trim() || content;
                const afterDetailed = mainParts[1]?.trim() || null;
                
                if (!afterDetailed) {
                  return { verdict, details: null, options: [] };
                }
                
                // Check if there's an ---OPTIONS--- section
                const detailedParts = afterDetailed.split('---OPTIONS---');
                const details = detailedParts[0]?.trim() || null;
                const optionsText = detailedParts[1]?.trim() || null;
                
                // Parse options if they exist
                const options: Option[] = [];
                if (optionsText) {
                  const optionBlocks = optionsText.split(/OPTION:/g).filter(block => block.trim());
                  
                  optionBlocks.forEach(block => {
                    const lines = block.trim().split('\n');
                    const titleLine = lines[0]?.trim() || '';
                    
                    // Find PROS and CONS sections
                    const prosIndex = lines.findIndex(line => line.trim() === 'PROS:');
                    const consIndex = lines.findIndex(line => line.trim() === 'CONS:');
                    
                    let description = '';
                    let pros: string[] = [];
                    let cons: string[] = [];
                    
                    if (prosIndex > 0) {
                      // Description is between title and PROS
                      description = lines.slice(1, prosIndex).join('\n').trim();
                    } else if (consIndex > 0) {
                      description = lines.slice(1, consIndex).join('\n').trim();
                    } else {
                      description = lines.slice(1).join('\n').trim();
                    }
                    
                    // Extract PROS
                    if (prosIndex !== -1) {
                      const prosEndIndex = consIndex !== -1 ? consIndex : lines.length;
                      pros = lines.slice(prosIndex + 1, prosEndIndex)
                        .filter(line => {
                          const trimmed = line.trim();
                          return trimmed.startsWith('•') || trimmed.startsWith('â¢') || trimmed.startsWith('-') || trimmed.startsWith('*');
                        })
                        .map(line => {
                          let text = line.trim();
                          // Remove various bullet characters
                          if (text.startsWith('•')) text = text.substring(1);
                          else if (text.startsWith('â¢')) text = text.substring(2); // mojibake encoding
                          else if (text.startsWith('-')) text = text.substring(1);
                          else if (text.startsWith('*')) text = text.substring(1);
                          return text.trim();
                        });
                    }
                    
                    // Extract CONS
                    if (consIndex !== -1) {
                      cons = lines.slice(consIndex + 1)
                        .filter(line => {
                          const trimmed = line.trim();
                          return trimmed.startsWith('•') || trimmed.startsWith('â¢') || trimmed.startsWith('-') || trimmed.startsWith('*');
                        })
                        .map(line => {
                          let text = line.trim();
                          // Remove various bullet characters
                          if (text.startsWith('•')) text = text.substring(1);
                          else if (text.startsWith('â¢')) text = text.substring(2); // mojibake encoding
                          else if (text.startsWith('-')) text = text.substring(1);
                          else if (text.startsWith('*')) text = text.substring(1);
                          return text.trim();
                        });
                    }
                    
                    if (titleLine) {
                      options.push({ title: titleLine, description, pros, cons });
                    }
                  });
                }
                
                // Debug logging
                if (process.env.NODE_ENV === 'development') {
                  console.log('Parsed response:', { 
                    hasDetails: !!details, 
                    optionsCount: options.length,
                    options: options.map(o => ({ title: o.title, prosCount: o.pros.length, consCount: o.cons.length }))
                  });
                }
                
                return { verdict, details, options };
              };
              
              const { verdict, details, options } = message.role === "assistant" 
                ? parseResponse(message.content) 
                : { verdict: message.content, details: null, options: [] };
              const isExpanded = expandedMessages.has(idx);
              const currentTab = activeTab.get(idx) || 'detailed';
              
              return (
                <div
                  key={idx}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  style={{ marginBottom: "2rem" }}
                >
                  <div
                    className={`max-w-3xl rounded px-5 py-3 border ${
                      message.role === "system"
                        ? "border-gray-200"
                        : message.role === "user"
                        ? "border-gray-200"
                        : "border-gray-200"
                    } relative group`}
                    style={{
                      background: message.role === "user" 
                        ? "#f9fafb"
                        : "rgba(255, 255, 255, 0.8)",
                      backdropFilter: "blur(20px)"
                    }}
                  >
                    {/* Copy button for all messages */}
                    <button
                      onClick={() => copyMessage(message.content)}
                      className="absolute top-2 right-2 transition-all px-1 py-0.5 rounded text-xs bg-gray-100 hover:bg-gray-200 border border-gray-300"
                      style={{ 
                        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
                        fontSize: "8px",
                        letterSpacing: "0.03em",
                        color: "#374151"
                      }}
                      title="Copy message"
                    >
                      📋
                    </button>
                    
                    {/* Retry button for user messages that have an error response */}
                    {message.role === "user" && idx < messages.length - 1 && 
                     messages[idx + 1]?.content.includes("**System Error:**") && (
                      <button
                        onClick={() => retryMessage(idx)}
                        className="absolute top-2 right-10 transition-all px-1 py-0.5 rounded text-xs bg-red-50 hover:bg-red-100 border border-red-300"
                        style={{ 
                          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
                          fontSize: "8px",
                          letterSpacing: "0.03em",
                          color: "#dc2626"
                        }}
                        title="Retry this message"
                      >
                        🔄
                      </button>
                    )}
                    
                    <div className={`leading-relaxed ${message.role === "user" ? "text-gray-800" : "text-gray-800"}`} style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif", fontSize: "13px", letterSpacing: "normal", fontWeight: 300 }}>
                      <MarkdownRenderer content={verdict} />
                    </div>
                    
                    {/* Expandable section with tabs for options */}
                    {(details || options.length > 0) && message.role === "assistant" && (
                      <div className="mt-3">
                        {/* Tab buttons */}
                        <div className="flex flex-wrap gap-2 justify-between items-center">
                          {/* Option tabs on the left */}
                          <div className="flex flex-wrap gap-2">
                            {options.map((option, optIdx) => (
                              <button
                                key={optIdx}
                                onClick={() => {
                                  if (currentTab === `option-${optIdx}` && isExpanded) {
                                    toggleMessageExpansion(idx);
                                  } else {
                                    if (!isExpanded) toggleMessageExpansion(idx);
                                    setMessageTab(idx, `option-${optIdx}`);
                                  }
                                }}
                                className={`px-3 py-1 rounded border transition-all ${
                                  currentTab === `option-${optIdx}` && isExpanded 
                                    ? 'text-white border-black' 
                                    : 'text-gray-600 border-gray-300 hover:border-black hover:text-gray-800'
                                }`}
                                style={{ 
                                  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif", 
                                  fontSize: "11px", 
                                  letterSpacing: "0.15em", 
                                  fontWeight: 300,
                                  background: currentTab === `option-${optIdx}` && isExpanded 
                                    ? "#000000"
                                    : "rgba(248, 250, 252, 0.8)"
                                }}
                              >
                                {option.title}
                              </button>
                            ))}
                          </div>
                          
                          {/* Explain the decision on the right */}
                          {details && (
                            <button
                              onClick={() => {
                                toggleMessageExpansion(idx);
                                setMessageTab(idx, 'detailed');
                              }}
                              className={`transition-colors ${
currentTab === 'detailed' && isExpanded ? 'underline' : 'text-gray-500 hover:text-gray-700'}`}
                              style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif", fontSize: "11px", letterSpacing: "0.2em", fontWeight: 300, color: currentTab === 'detailed' && isExpanded ? '#000000' : undefined }}
                            >
                              {isExpanded && currentTab === 'detailed' ? '▲ Hide details' : '▼ Explain the decision'}
                            </button>
                          )}
                        </div>
                        
                        {/* Tab content */}
                        {isExpanded && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            {currentTab === 'detailed' && details && (
                              <div className="leading-relaxed text-gray-700" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif", fontSize: "13px", letterSpacing: "normal", fontWeight: 300 }}>
                                <MarkdownRenderer content={details} />
                              </div>
                            )}
                            
                            {currentTab.startsWith('option-') && options.length > 0 && (
                              (() => {
                                const optionIndex = parseInt(currentTab.split('-')[1]);
                                const option = options[optionIndex];
                                if (!option) return null;
                                
                                return (
                                  <div className="space-y-3" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif", fontSize: "13px", letterSpacing: "normal", fontWeight: 300 }}>
                                    <p className="text-gray-700 leading-relaxed">
                                      {option.description}
                                    </p>
                                    
                                    {option.pros.length > 0 && (
                                      <div>
                                        <p className="text-black font-semibold mb-1">PROS:</p>
                                        <ul className="list-none space-y-1">
                                          {option.pros.map((pro, i) => (
                                            <li key={i} className="text-gray-700">• {pro}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                    
                                    {option.cons.length > 0 && (
                                      <div>
                                        <p className="text-black font-semibold mb-1">CONS:</p>
                                        <ul className="list-none space-y-1">
                                          {option.cons.map((con, i) => (
                                            <li key={i} className="text-gray-700">• {con}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                  </div>
                                );
                              })()
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            {isLoading && (
              <div className="flex justify-start">
                <div className="border border-gray-200 rounded px-5 py-3" style={{ background: "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(20px)" }}>
                  <p className="text-gray-800" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif", fontSize: "13px", letterSpacing: "0.35em", fontWeight: 300 }}>ADVOCATE: ANALYZING...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* Input Area */}
        <div className="border-t py-4" style={{ background: "rgba(255, 255, 255, 0.7)", backdropFilter: "blur(40px)", borderColor: "rgba(226, 232, 240, 0.8)" }}>
          {/* Error Display */}
          {error && (
            <div className="max-w-5xl mx-auto px-8 mb-3">
              <div className="border border-gray-400 text-gray-900 px-4 py-3 rounded-lg flex items-center justify-between" style={{ background: "rgba(243, 244, 246, 0.9)", backdropFilter: "blur(40px)", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
                <span style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif", fontSize: "11px", letterSpacing: "0.15em", fontWeight: 300 }}>{error}</span>
                <button
                  onClick={() => setError(null)}
                  className="text-gray-700 hover:text-black text-xl font-bold ml-4 leading-none"
                  aria-label="Dismiss error"
                >
                  ×
                </button>
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit} className="max-w-5xl mx-auto px-8 flex gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your decision or dilemma"
              className="flex-1 text-gray-900 placeholder:text-gray-400 focus:border-black focus-visible:ring-black"
              style={{ 
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif", 
                fontSize: "13px", 
                letterSpacing: "0.15em", 
                fontWeight: 300,
                background: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(40px)",
                borderColor: "rgba(226, 232, 240, 0.8)"
              }}
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="text-white px-8 transition-all hover:opacity-90 border-0 shadow-lg"
              style={{ 
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif", 
                fontSize: "11px", 
                letterSpacing: "0.3em", 
                fontWeight: 300,
                background: "#000000",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)"
              }}
            >
              SEND
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

