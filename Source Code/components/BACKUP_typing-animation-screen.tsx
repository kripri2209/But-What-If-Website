/**
 * BACKUP: Typing Animation Interactive Screen
 * 
 * This was the first interactive screen that showed a typing animation
 * with text "WELCOME TO BUT, WHAT IF..." before the orbital dots screen.
 * 
 * Removed from chat-interface.tsx but saved here for future restoration.
 */

// ==================== STATE ====================
// Add to component state:
// const [showIntro, setShowIntro] = useState(false);
// const [introText, setIntroText] = useState("WELCOME TO BUT, WHAT IF...");

// ==================== useEffect HOOKS ====================

// Check if intro should be shown (after mount to avoid hydration issues)
// useEffect(() => {
//   // Check if user skipped intro in this session
//   const introSkippedThisSession = sessionStorage.getItem('introSkipped');
//   if (introSkippedThisSession !== 'true') {
//     setShowIntro(true);
//   }
// }, []);

// Typing animation logic
// useEffect(() => {
//   if (!showIntro) return;
//   const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
//   const typeFlow = async () => {
//     const textElement = document.getElementById("text");
//     const cursor = document.getElementById("cursor");
//     const body = document.getElementById("typing-body");
//     if (!textElement || !cursor || !body) return;
//     const fullText = introText;
//     for (let i = 0; i <= fullText.length; i++) {
//       textElement.innerText = fullText.slice(0, i);
//       await sleep(150);
//     }
//     await sleep(2000);
//     // Delete last word (after last space)
//     const lastSpace = fullText.lastIndexOf(" ");
//     for (let i = fullText.length; i >= lastSpace + 1; i--) {
//       textElement.innerText = fullText.slice(0, i);
//       await sleep(100);
//     }
//     await sleep(2000);
//     // Delete everything
//     for (let i = lastSpace + 1; i >= 0; i--) {
//       textElement.innerText = fullText.slice(0, i);
//       await sleep(100);
//     }
//     await sleep(2000);
//     body.classList.add("black-screen");
//     textElement.style.display = "none";
//     cursor.style.display = "none";
//     await sleep(2000);
//     setShowIntro(false);
//     setShowOrbitalDots(true);
//   };
//   const timer = setTimeout(typeFlow, 100);
//   return () => {
//     clearTimeout(timer);
//   };
// }, [showIntro]);

// ==================== JSX RENDER ====================

export const TypingAnimationScreen = () => {
  return (
    <>
      <div
        id="typing-body"
        onClick={() => {
          // Skip directly to landing page (only for this session)
          sessionStorage.setItem('introSkipped', 'true');
          // setShowIntro(false);
          // setShowOrbitalDots(false);
          // setShowLandingPage(true);
        }}
        style={{
          margin: 0,
          padding: 0,
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#0a0a0a",
          color: "#FFFFFF",
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
              backgroundColor: "#FFFFFF",
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
            color: "#666",
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
          background: #0a0a0a !important;
          opacity: 1 !important;
        }
      `}</style>
    </>
  );
};

// ==================== INTEGRATION NOTES ====================
// To restore this screen:
// 1. Add back showIntro and introText state
// 2. Add back the two useEffect hooks above
// 3. Replace the "if (showOrbitalDots)" check with the typing screen JSX
// 4. Update the initial check useEffect to show typing screen instead of going directly to orbital dots
