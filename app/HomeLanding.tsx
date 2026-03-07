"use client";
import React from 'react';

export default function HomeLanding({ onChatClick }: { onChatClick: () => void }) {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      background: '#1a1a1a',
      color: '#fff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Navigation Bar */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.5rem 4rem',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ fontSize: '1.25rem', fontWeight: '600', letterSpacing: '0.05em' }}>
          Devil's Advocate
        </div>
        <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
          <a style={{ color: '#fff', textDecoration: 'none', fontSize: '0.95rem', borderBottom: '2px solid #6366f1', paddingBottom: '0.25rem' }}>Home</a>
          <a style={{ color: '#999', textDecoration: 'none', fontSize: '0.95rem', cursor: 'pointer' }}>About</a>
          <a style={{ color: '#999', textDecoration: 'none', fontSize: '0.95rem', cursor: 'pointer' }}>Service</a>
          <a style={{ color: '#999', textDecoration: 'none', fontSize: '0.95rem', cursor: 'pointer' }}>Contact</a>
          <button onClick={onChatClick} style={{
            padding: '0.75rem 1.75rem',
            background: '#e5e7eb',
            color: '#1a1a1a',
            border: 'none',
            borderRadius: '8px',
            fontSize: '0.95rem',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}>
            Challenge Your Idea
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'flex-start',
        padding: '4rem 4rem 8rem 4rem',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Logo Section */}
        <div style={{ marginBottom: '3rem' }}>
          {/* "Devil's Advocate" main logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)',
              borderRadius: '56px',
              padding: '2.5rem 4.5rem',
              display: 'inline-block',
              boxShadow: '0 12px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1)',
              transition: 'all 0.3s ease',
              position: 'relative' as const,
              overflow: 'hidden'
            }}>
              {/* Subtle gradient overlay */}
              <div style={{
                position: 'absolute' as const,
                top: 0,
                left: 0,
                right: 0,
                height: '50%',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)',
                pointerEvents: 'none' as const
              }}></div>
              <span style={{ 
                fontSize: '5rem', 
                fontWeight: '300', 
                color: '#1a1a1a', 
                letterSpacing: '0.03em',
                position: 'relative' as const,
                zIndex: 1
              }}>Devil's Advocate</span>
            </div>
            
            {/* Thinking emoji circle */}
            <div style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              borderRadius: '50%',
              width: '130px',
              height: '130px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '4.5rem',
              boxShadow: '0 16px 48px rgba(99, 102, 241, 0.5), 0 0 80px rgba(139, 92, 246, 0.3)',
              transition: 'all 0.3s ease',
              position: 'relative' as const
            }}>
              {/* Glow effect */}
              <div style={{
                position: 'absolute' as const,
                inset: '-20px',
                background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(20px)',
                zIndex: -1
              }}></div>
              🤔
            </div>
          </div>
        </div>

        {/* Tagline */}
        <p style={{ 
          fontSize: '1.1rem', 
          color: '#9ca3af', 
          marginBottom: '3rem',
          maxWidth: '600px',
          lineHeight: '1.6'
        }}>
          Run your brilliant plan through AI first. Reality tends to be less polite.
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '6rem' }}>
          <button onClick={onChatClick} style={{
            padding: '1rem 2.5rem',
            background: '#e5e7eb',
            color: '#1a1a1a',
            border: 'none',
            borderRadius: '12px',
            fontSize: '1.05rem',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 4px 12px rgba(229, 231, 235, 0.2)'
          }}>
            Challenge Now
          </button>
          <button style={{
            padding: '1rem 2.5rem',
            background: 'transparent',
            color: '#9ca3af',
            border: 'none',
            fontSize: '1.05rem',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}>
            Learn More
          </button>
        </div>

        {/* Bottom Text */}
        <p style={{ 
          fontSize: '0.95rem', 
          color: '#6b7280',
          maxWidth: '700px',
          lineHeight: '1.8'
        }}>
          Logic, risk analysis, and a few perspectives you might not enjoy—<br />
          but probably need. And we'll be with you .
        </p>
      </div>
    </div>
  );
}
