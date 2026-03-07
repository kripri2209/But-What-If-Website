"use client";

export default function OrbitalScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#fff' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem', letterSpacing: '0.1em', color: '#222' }}>Orbital Interactive Screen</h2>
      <p style={{ maxWidth: 600, fontSize: '1.1rem', color: '#444', textAlign: 'center', marginBottom: '2rem' }}>
        Visualize your thoughts orbiting around core questions. This screen helps you see the big picture and connections before diving deeper.
      </p>
      <button
        style={{
          padding: '0.75rem 2rem',
          fontSize: '1.1rem',
          fontWeight: 'bold',
          borderRadius: '8px',
          background: '#222',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          transition: 'background 0.2s',
        }}
        onClick={onContinue}
      >
        Continue
      </button>
    </div>
  );
}
