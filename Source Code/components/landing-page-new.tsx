"use client";

import React from 'react';

interface LandingPageNewProps {
  onStartChat: () => void;
}

export function LandingPageNew({ onStartChat }: LandingPageNewProps) {
  const handleLearnMore = () => {
    const nextSection = document.getElementById('features-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div style={{ 
      background: '#0a0a0a',
      color: '#FFFFFF',
      fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      minHeight: '100vh',
    }}>
      <style jsx>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        /* NAVBAR */
        .navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          height: 64px;
          border-bottom: 1px solid #1f1f1f;
          background: #0a0a0a;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .nav-logo {
          font-weight: 700;
          font-size: 16px;
          color: #FFFFFF;
          letter-spacing: -0.02em;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 36px;
          list-style: none;
        }

        .nav-links a {
          text-decoration: none;
          color: #999;
          font-size: 14px;
          font-weight: 400;
          transition: color 0.2s;
          cursor: pointer;
        }
        .nav-links a:hover { color: #FFFFFF; }

        .nav-cta {
          background: #6867e7;
          color: #FFFFFF;
          border: none;
          border-radius: 999px;
          padding: 10px 22px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: opacity 0.2s;
        }
        .nav-cta:hover { opacity: 0.85; }

        .nav-accent {
          height: 2px;
          background: linear-gradient(90deg, #6867e7 0%, #6867e700 60%);
        }

        /* HERO */
        .hero {
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 40px 100px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .hero-titles {
          display: flex;
          flex-direction: row;
          gap: 60px;
          margin-bottom: 40px;
          animation: fadeUp 0.55s ease both;
          align-items: center;
        }

        .hero-text-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-width: 500px;
          text-align: right;
        }

        .hero-headline {
          font-size: 24px;
          font-weight: 600;
          color: #FFFFFF;
          line-height: 1.4;
          letter-spacing: -0.01em;
        }

        .hero-description {
          font-size: 16px;
          font-weight: 300;
          color: #999;
          line-height: 1.6;
          letter-spacing: 0;
        }

        .hero-pill {
          display: inline-flex;
          align-items: center;
          line-height: 1;
          font-weight: 700;
          font-size: clamp(40px, 7vw, 80px);
          letter-spacing: -0.03em;
          position: relative;
        }

        .hero-pill-dark {
          background: transparent;
          border: 2px solid #6867e7;
          color: #FFFFFF;
          padding: 22px 52px;
          width: fit-content;
          border-radius: 28px;
        }

        .hero-pill-row {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 16px;
        }

        .hero-pill-light {
          background: #6867e7;
          color: #FFFFFF;
          padding: 24px 56px;
          flex-shrink: 0;
          border-radius: 28px;
        }

        .hero-emoji-circle {
          width: 110px;
          height: 110px;
          border-radius: 50%;
          background: #7dba86;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 52px;
          flex-shrink: 0;
          animation: floatBob 3s ease-in-out infinite;
        }

        @keyframes floatBob {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-8px); }
        }

        .hero-sub {
          font-size: 15px;
          color: #999;
          font-weight: 300;
          margin-bottom: 36px;
          max-width: 480px;
          margin: 0 0 36px 0;
          animation: fadeUp 0.55s 0.1s ease both;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 24px;
          animation: fadeUp 0.55s 0.2s ease both;
        }

        .btn-primary {
          background: #6867e7;
          color: #FFFFFF;
          border: none;
          border-radius: 16px;
          padding: 14px 32px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.2s;
        }
        .btn-primary:hover { background: #7978ea; transform: translateY(-1px); }

        .btn-ghost {
          background: transparent;
          border: none;
          color: #FFFFFF;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: opacity 0.2s;
        }
        .btn-ghost:hover { opacity: 0.6; }

        .hero-section-divider {
          height: 1px;
          background: #1f1f1f;
          margin: 0 40px;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* BENTO SECTION */
        .overlap-tagline {
          font-size: clamp(22px, 3.5vw, 38px);
          font-weight: 700;
          color: #FFFFFF;
          line-height: 1.25;
          letter-spacing: -0.02em;
          padding: 60px 40px 48px;
          max-width: 760px;
          margin: 0 auto 0;
          animation: fadeUp 0.55s 0.3s ease both;
        }

        .bento-section {
          background: #0a0a0a;
          padding: 0 40px 100px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .bento-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-rows: auto auto;
          gap: 16px;
        }

        .bento-card {
          border-radius: 24px;
          padding: 32px;
          position: relative;
          overflow: hidden;
        }

        .bento-tall { grid-row: span 2; background: #e0c4c4; color: #111; display: flex; flex-direction: column; justify-content: space-between; min-height: 520px; }
        .bento-purple { background: #6867e7; color: #fff; min-height: 248px; }
        .bento-pink-top { background: #e0c4c4; color: #555; min-height: 248px; }
        .bento-pink-bot { background: #e0c4c4; color: #555; min-height: 248px; }
        .bento-green { background: #7dba86; color: #fff; min-height: 248px; }

        .help-badge {
          display: inline-block;
          background: #6867e7;
          color: #fff;
          font-size: 13px;
          font-weight: 600;
          padding: 10px 18px;
          border-radius: 8px;
          transform: rotate(-5deg);
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
          width: fit-content;
        }

        .bento-tall-headline { margin-top: auto; }
        .fork-line   { font-size: clamp(28px, 3.5vw, 42px); font-weight: 800; color: #111; letter-spacing: -0.03em; line-height: 1.1; }
        .fork-blue   { color: #6867e7; }
        .fork-green  { color: #7dba86; }

        .code-block {
          background: #1a1a2e;
          border-radius: 10px;
          padding: 14px 16px;
          font-family: 'Courier New', monospace;
          font-size: 10.5px;
          color: #a0c4ff;
          line-height: 1.7;
          overflow: hidden;
          max-height: 130px;
        }
        .code-block .kw { color: #c792ea; }
        .code-block .fn { color: #82aaff; }
        .code-block .st { color: #c3e88d; }

        .pill-stack {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 16px;
        }

        .pill-card {
          background: #111;
          color: #FFFFFF;
          border-radius: 14px;
          padding: 14px 20px;
          font-size: 14px;
          font-weight: 600;
          position: relative;
        }

        .pill-card.angled { transform: rotate(-2deg); }
        .pill-card.angled2 { transform: rotate(1.5deg); }
        .pill-card .pill-sub { font-size: 12px; font-weight: 400; color: #999; margin-top: 3px; }

        .think-text {
          font-size: clamp(28px, 3vw, 40px);
          font-weight: 800;
          color: #999;
          line-height: 1.15;
          letter-spacing: -0.03em;
        }

        .think-emoji {
          font-size: 52px;
          position: absolute;
          bottom: 28px;
          right: 28px;
        }

        /* Alternative Views */
        .alt-pill-stack {
          display: flex;
          flex-direction: column;
          gap: 10px;
          position: relative;
        }

        .floating-label {
          font-size: 13px;
          font-weight: 600;
          color: #555;
          transform: rotate(-4deg);
          display: inline-block;
          width: fit-content;
        }

        .alt-main-card {
          background: #fff;
          border-radius: 14px;
          padding: 18px 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
          position: relative;
        }

        .alt-main-card .edit-tag {
          position: absolute;
          top: 10px; right: 10px;
          background: #6867e7;
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 4px;
        }

        .alt-check {
          width: 28px; height: 28px;
          border-radius: 50%;
          border: 2px solid #7dba86;
          display: flex; align-items: center; justify-content: center;
          color: #7dba86; font-size: 14px; flex-shrink: 0;
        }

        .alt-main-title { font-size: 18px; font-weight: 700; color: #111; }

        .alt-bottom-label {
          font-size: 13px;
          font-weight: 600;
          color: #555;
          transform: rotate(3deg);
          display: inline-block;
          margin-top: 4px;
        }

        .alt-small-card {
          background: #fff;
          border-radius: 14px;
          padding: 14px 18px;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
          align-self: flex-end;
          width: 70%;
        }

        .alt-small-icon {
          width: 26px; height: 26px;
          border-radius: 50%;
          border: 2px solid #7dba86;
          display: flex; align-items: center; justify-content: center;
          color: #7dba86; font-size: 13px; flex-shrink: 0;
        }

        .alt-small-title { font-size: 14px; font-weight: 600; color: #111; }

        .bubble-stack {
          display: flex;
          flex-direction: column;
          gap: 20px;
          align-items: flex-start;
          padding-top: 8px;
        }

        .bubble {
          position: relative;
          padding: 12px 22px;
          font-size: 14px;
          font-weight: 600;
          width: fit-content;
          border-radius: 12px;
        }

        .bubble-purple { background: #6867e7; color: #fff; }
        .bubble-yellow { background: #7dba86; color: #fff; }
        .bubble-white  { background: #fff; color: #111; }

        /* NOTHING TO LOSE */
        .ntl-section {
          background: #111;
          padding: 90px 60px 100px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 60px;
        }

        .ntl-heading {
          font-size: clamp(60px, 9vw, 120px);
          font-weight: 300;
          color: #FFFFFF;
          line-height: 1.0;
          letter-spacing: -0.04em;
          margin-bottom: 0;
          flex-shrink: 0;
        }

        .ntl-pills {
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: flex-start;
        }

        .ntl-pill-row {
          display: flex;
          gap: 12px;
        }

        .ntl-pill {
          border: 2px solid #333;
          color: #999;
          font-size: clamp(22px, 3vw, 38px);
          font-weight: 400;
          padding: 18px 40px;
          border-radius: 16px;
          letter-spacing: -0.02em;
          background: transparent;
        }

        .ntl-pill-green {
          border: 2px solid #7dba86;
          color: #7dba86;
          font-size: clamp(22px, 3vw, 38px);
          font-weight: 700;
          padding: 18px 40px;
          border-radius: 16px;
          letter-spacing: -0.02em;
          background: transparent;
        }

        /* CTA */
        .cta-section {
          background: #0a0a0a;
          text-align: center;
          padding: 80px 40px 120px;
        }

        .cta-heading {
          font-size: clamp(36px, 6vw, 76px);
          font-weight: 800;
          color: #FFFFFF;
          letter-spacing: -0.04em;
          line-height: 1.1;
          margin-bottom: 20px;
        }

        .cta-sub {
          font-size: 15px;
          color: #999;
          font-weight: 300;
          max-width: 480px;
          margin: 0 auto;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .bento-grid {
            grid-template-columns: 1fr;
          }
          .bento-tall { grid-row: span 1; }
          .ntl-pill-row {
            flex-direction: column;
          }
          .ntl-section {
            flex-direction: column;
            align-items: flex-start;
          }
          .ntl-heading {
            margin-bottom: 48px;
          }
          .hero-titles {
            flex-direction: column;
            gap: 32px;
            align-items: flex-start;
          }
          .hero-text-content {
            text-align: left;
          }
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="navbar">
        <span className="nav-logo">But, What If...</span>
        <button className="nav-cta" onClick={onStartChat}>Challenge Your Idea</button>
      </nav>
      <div className="nav-accent"></div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-titles">
          <div className="hero-pill-row">
            <div className="hero-pill hero-pill-dark">But,</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div className="hero-pill hero-pill-light">What If...</div>
              <div className="hero-emoji-circle">🤔</div>
            </div>
          </div>
          <div className="hero-text-content">
            <p className="hero-headline">Every decision sounds right—until someone questions it.</p>
            <p className="hero-description">This platform acts as your Devil's Advocate, analyzing your choices, challenging assumptions, and revealing the risks you might be missing.</p>
          </div>
        </div>
        <div className="hero-actions">
          <button className="btn-primary" onClick={onStartChat}>Challenge Now</button>
          <button className="btn-ghost" onClick={handleLearnMore}>Learn More</button>
        </div>
      </section>

      <div className="hero-section-divider"></div>

      {/* BENTO SECTION */}
      <div id="features-section" className="overlap-tagline">
        Logic, risk analysis, and a few perspectives you might not enjoy—but probably need. And we'll be with you.
      </div>

      <div className="bento-section">
        <div className="bento-grid">

          {/* TALL LEFT: Fork it */}
          <div className="bento-card bento-tall">
            <div className="help-badge">help us build better</div>
            <div>
              <div className="bento-tall-headline">
                <div className="fork-line">Fork it.</div>
                <div className="fork-line fork-blue">Break it.</div>
                <div className="fork-line fork-green">Improve it.</div>
              </div>
              <div className="code-block" style={{ marginTop: '20px' }}>
                <span className="kw">setChatSessions</span>(updateSessions);<br />
                localStorage.setItem(<span className="st">'chatSessions'</span>, JSON.stringify(updatedSessions));<br />
                {'}, messages, currentChatId);'}<br /><br />
                <span className="kw">const</span> <span className="fn">generateChatTitle</span> = (msgs: ChatMessage[]): string =&gt; {'{'}<br />
                &nbsp;&nbsp;<span className="kw">const</span> userMsg = msgs.find( m =&gt; m.role === <span className="st">'user'</span>);<br />
                &nbsp;&nbsp;<span className="kw">if</span> (userMsg) {'{'}<br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="kw">return</span> userMsg.content.slice(0, 40) + (userMsg.content.length &gt; 40 ? <span className="st">'...'</span> : <span className="st">''</span>);<br />
                &nbsp;&nbsp;{'}'}<br />
                &nbsp;&nbsp;<span className="kw">return</span> <span className="st">'New Chat'</span>;<br />
                {'}'};<br /><br />
                <span className="kw">const</span> createNewChat = () =&gt; {'{'}<br />
                &nbsp;&nbsp;<span className="kw">const</span> newId = Date.now().toString();<br />
                &nbsp;&nbsp;<span className="kw">const</span> newSession: ChatSession = {'{'}<br />
                &nbsp;&nbsp;&nbsp;&nbsp;id: newId,
              </div>
            </div>
          </div>

          {/* PURPLE: Pill cards */}
          <div className="bento-card bento-purple">
            <div className="pill-stack">
              <div className="pill-card angled">Blindspot Detection</div>
              <div className="pill-card">
                Logical Weakness Check
                <div className="pill-sub">Find flaws in your logic.</div>
              </div>
              <div className="pill-card angled2">Risk Identification</div>
            </div>
          </div>

          {/* PINK TOP RIGHT: Think. Then Think. Again. */}
          <div className="bento-card bento-pink-top">
            <div className="think-text">Think.<br />Then Think.<br />Again.</div>
            <div className="think-emoji">🤩</div>
          </div>

          {/* PINK BOTTOM MIDDLE: Alternative Views */}
          <div className="bento-card bento-pink-bot">
            <div className="alt-pill-stack">
              <span className="floating-label">Bias Neutralization</span>
              <div className="alt-main-card">
                <div className="alt-check">✓</div>
                <div className="alt-main-title">Alternative<br />Views</div>
                <span className="edit-tag">Edit</span>
              </div>
              <span className="alt-bottom-label">Hidden Assumption Audit</span>
              <div className="alt-small-card">
                <div className="alt-small-icon">✓</div>
                <div className="alt-small-title">Decision Validation</div>
              </div>
            </div>
          </div>

          {/* GREEN: Sounds good bubbles */}
          <div className="bento-card bento-green">
            <div className="bubble-stack">
              <div className="bubble bubble-purple">Sounds Good.</div>
              <div className="bubble bubble-yellow">Questionable</div>
              <div className="bubble bubble-white">What could go wrong?</div>
            </div>
          </div>

        </div>
      </div>

      {/* NOTHING TO LOSE */}
      <section className="ntl-section">
        <h2 className="ntl-heading">Nothing<br />to lose.</h2>
        <div className="ntl-pills">
          <div className="ntl-pill-row">
            <div className="ntl-pill">No Cost</div>
            <div className="ntl-pill">No Login</div>
          </div>
          <div className="ntl-pill ntl-pill-green">Just Smart Decisions</div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="cta-section">
        <h2 className="cta-heading">Ready to stress-<br />test your ideas?</h2>
        <p className="cta-sub">Challenge your assumptions today to build a more resilient and certain future.</p>
      </section>
    </div>
  );
}
