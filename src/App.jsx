import { useEffect, useState } from 'react';

function App() {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event;
      setPosition({ x: clientX, y: clientY });
    };
    if (enabled) {
      window.addEventListener('pointermove', handleMove);
    }
    return () => {
      window.removeEventListener('pointermove', handleMove);
    };
  }, [enabled]);

  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled);
  }, [enabled]);

  useEffect(() => {
    if (!enabled) {
      setPosition({ x: 0, y: 0 });
    }
  }, [enabled]);

  return (
    <>
      <main>
        {enabled && (
          <div
            style={{
              position: 'absolute',
              backgroundColor: 'rgba(0,0,0,0.5)',
              border: '1px solid #fff',
              borderRadius: '50%',
              opacity: 0.8,
              pointerEvents: 'none',
              width: 80,
              height: 80,
              left: position.x - 40,
              top: position.y - 40,
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                position: 'absolute',
                width: '105vw',
                height: '105vh',
                backgroundImage: 'url(https://mookairosie.org.au/wp-content/uploads/2024/03/wheres-wally-1280x790.webp)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                left: `-${position.x}px`,
                top: `-${position.y}px`,
              }}
            />
          </div>
        )}

        <button onClick={() => setEnabled(!enabled)}>
          {enabled ? 'Desactivar' : "WHERE'S WALDO?"}
        </button>
      </main>
    </>
  );
}

export default App;
