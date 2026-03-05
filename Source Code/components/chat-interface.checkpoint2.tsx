"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export function ChatInterface() {
    // ...existing state declarations...
    // (moved below)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "system",
      content:
        "SYSTEM: ENCRYPTED LINK ESTABLISHED. I AM READY TO DISSECT YOUR STRATEGY. PROVIDE YOUR CORE ASSUMPTION.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showOrbitalDots, setShowOrbitalDots] = useState(false);
  const introQuestions = [
    "I WANT TO QUIT",
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
  const [introText, setIntroText] = useState(introQuestions[Math.floor(Math.random() * introQuestions.length)]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
    if (!input || input.trim() === "" || isLoading) {
      return;
    }
    const userMessage = input.trim().toUpperCase();
    setInput("");
    setIsLoading(true);
    const newMessages: ChatMessage[] = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: newMessages.filter((m) => m.role !== "system").map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const assistantMessage = data?.text || "NO RESPONSE RECEIVED.";
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: `ADVOCATE: ${assistantMessage.toUpperCase()}`,
        },
      ]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "ADVOCATE: CRITICAL ERROR. CONNECTION DISRUPTED. RETRY TRANSMISSION.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (showIntro) {
    return (
      <>
        <div
          id="typing-body"
          style={{
            margin: 0,
            padding: 0,
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            color: "black",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
            fontSize: "13px",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            fontWeight: 300,
            overflow: "hidden",
            transition: "background-color 2s ease",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 9999,
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
                backgroundColor: "black",
                marginLeft: "5px",
                animation: "blink 1s infinite",
              }}
            ></span>
          </div>
        </div>
        <style jsx global>{`
          @keyframes blink {
            50% {
              opacity: 0;
            }
          }
          .black-screen {
            background-color: black !important;
          }
        `}</style>
      </>
    );
  }

  if (showOrbitalDots) {
    return (
      <div
        className="fixed inset-0 bg-black flex items-center justify-center cursor-pointer overflow-hidden z-[9999]"
        onClick={() => setShowOrbitalDots(false)}
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
                      backgroundColor: 'white',
                      borderRadius: '50%',
                      boxShadow: '0 0 12px rgba(255,255,255,0.7), 0 0 20px rgba(255,255,255,0.3)'
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
                  color: 'white',
                  fontSize: '18px',
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
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
                background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)'
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
              color: '#27272a',
              fontSize: '12px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              fontWeight: 300
            }}
          >
            Click anywhere to skip
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
    <div className="relative min-h-screen bg-black text-white">
      {/* Top minimalist status - white only */}
      <div className="absolute top-8 left-8 z-20">
        <span className="text-[10px] font-mono tracking-widest text-zinc-200">v4.2</span>
      </div>
      <div className="absolute top-8 right-8 z-20">
        <span className="text-[10px] font-mono tracking-widest text-white">ACTIVE</span>
      </div>
      {/* Main Dramatic Content */}
      <div className="flex-1 flex items-center justify-center relative">
        {/* Dramatic content block goes here (omitted for brevity) */}
      </div>
      {/* Bottom warning modules */}
      <div className="border-t border-zinc-800 py-6 bg-black/20 backdrop-blur-sm">
        {/* Warning modules block goes here (omitted for brevity) */}
      </div>
      {/* Scroll Indicator */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30">
        {/* Scroll indicator block goes here (omitted for brevity) */}
      </div>
      {/* Chat Interface Section with matching atmosphere */}
      <div className="flex h-screen flex-col" style={{ background: "black" }}>
        {/* Header */}
        <div className="border-b border-zinc-800 py-3 backdrop-blur-sm bg-black/40">
          <p className="text-xs text-zinc-200 font-mono tracking-wider text-center">
            PROTOCOL: INTERFACE-ALPHA // CORE ENGINE: ADVOCATE V4.2 // STATUS: ACTIVE
          </p>
        </div>
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto py-6 space-y-8 relative">
          <div className="max-w-5xl mx-auto px-8">
            {messages.map((message, idx) => (
              <div
                key={idx}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                style={{ marginBottom: "2rem" }}
              >
                <div
                  className={`max-w-3xl rounded px-5 py-3 backdrop-blur-sm ${
                    message.role === "system"
                      ? "bg-zinc-900 border border-zinc-700"
                      : message.role === "user"
                      ? "bg-zinc-900 border border-zinc-700"
                      : "bg-zinc-900 border border-zinc-700"
                  }`}
                >
                  <p className={`font-mono text-sm leading-relaxed tracking-wide text-zinc-200 whitespace-pre-wrap`}>
                    {message.content}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-zinc-900 border border-zinc-700 rounded px-5 py-3 backdrop-blur-sm">
                  <p className="font-mono text-sm text-zinc-200">ADVOCATE: ANALYZING...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        {/* Input Area */}
        <div className="border-t border-zinc-800 py-4 bg-black/40 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="max-w-5xl mx-auto px-8 flex gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your decision or dilemma"
              className="flex-1 bg-zinc-900 border-zinc-700 text-zinc-200 placeholder:text-zinc-500 font-mono text-sm focus:border-white focus-visible:ring-white backdrop-blur-sm"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-mono font-bold px-8 uppercase tracking-wider backdrop-blur-sm transition-all"
            >
              SEND
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

