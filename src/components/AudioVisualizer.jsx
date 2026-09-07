import React, { useEffect, useRef } from 'react';

export default function AudioVisualizer({ state = 'idle', isListening = false, isSpeaking = false }) {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const currentActivityRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let phase = 0;

    const render = () => {
      // Handle canvas resizing
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      ctx.clearRect(0, 0, width, height);

      // Determine target activity:
      // 0 when not speaking / idle / ready (STRAIGHT LINE)
      // 1 when reply comes / speaking / listening / thinking (UP-DOWN WAVE)
      let targetActivity = 0;
      if (isSpeaking || state === 'speaking') {
        targetActivity = 1.0;
      } else if (isListening || state === 'listening') {
        targetActivity = 0.85;
      } else if (state === 'thinking') {
        targetActivity = 0.55;
      }

      // Smooth interpolation so transition between straight line and wave is butter smooth
      currentActivityRef.current += (targetActivity - currentActivityRef.current) * 0.12;
      const activity = currentActivityRef.current;
      const centerY = height / 2;

      // Create rich vibrant gradient
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, '#00d2ff');
      gradient.addColorStop(0.35, '#5b3fff');
      gradient.addColorStop(0.7, '#a855f7');
      gradient.addColorStop(1, '#ec4899');

      if (activity < 0.005) {
        // ==========================================
        // 1. IDLE / NOT SPEAKING: STRAIGHT LINE
        // ==========================================
        ctx.beginPath();
        ctx.moveTo(0, centerY);
        ctx.lineTo(width, centerY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.shadowColor = 'rgba(91, 63, 255, 0.45)';
        ctx.shadowBlur = 8;
        ctx.stroke();

        // Subtle center beam accent
        ctx.beginPath();
        ctx.arc(width / 2, centerY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#00d2ff';
        ctx.shadowBlur = 10;
        ctx.fill();

        ctx.shadowBlur = 0;
      } else {
        // ==========================================
        // 2. ACTIVE / REPLYING / SPEAKING: UP-DOWN DYNAMIC SOUNDWAVE
        // ==========================================
        // Layer 1: Soft Inverted Wave Background
        ctx.beginPath();
        for (let x = 0; x <= width; x += 3) {
          const normX = (x / width) * Math.PI * 2;
          const envelope = Math.sin((x / width) * Math.PI);
          const w1 = Math.sin(normX * 2.5 - phase * 3.2) * 0.45;
          const w2 = Math.cos(normX * 5.0 + phase * 2.2) * 0.3;
          const disp = (w1 + w2) * envelope * (height * 0.38) * activity;
          const y = centerY + disp;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'rgba(0, 210, 255, 0.4)';
        ctx.lineWidth = 1.8;
        ctx.stroke();

        // Layer 2: Main Vibrant Up-Down Harmonic Audio Wave
        ctx.beginPath();
        for (let x = 0; x <= width; x += 2) {
          const normX = (x / width) * Math.PI * 2;
          const envelope = Math.sin((x / width) * Math.PI);
          const w1 = Math.sin(normX * 3.2 + phase * 4.0) * 0.5;
          const w2 = Math.sin(normX * 6.5 - phase * 2.8) * 0.35;
          const w3 = Math.cos(normX * 9.8 + phase * 5.2) * 0.2;
          const disp = (w1 + w2 + w3) * envelope * (height * 0.45) * activity;
          const y = centerY + disp;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3.0;
        ctx.lineCap = 'round';
        ctx.shadowColor = 'rgba(168, 85, 247, 0.7)';
        ctx.shadowBlur = 12;
        ctx.stroke();

        // Layer 3: Dynamic equalizer pulse bars dancing up and down along the wave
        const numNodes = 28;
        const spacing = width / numNodes;
        for (let i = 1; i < numNodes; i++) {
          const x = i * spacing;
          const normX = (x / width) * Math.PI * 2;
          const envelope = Math.sin((x / width) * Math.PI);
          const w = Math.sin(normX * 3.2 + phase * 4.0) * 0.5 + Math.sin(normX * 6.5 - phase * 2.8) * 0.35;
          const disp = Math.abs(w * envelope * (height * 0.45) * activity);
          const barH = Math.max(3, disp * 0.95);

          ctx.beginPath();
          ctx.moveTo(x, centerY - barH);
          ctx.lineTo(x, centerY + barH);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2.2;
          ctx.lineCap = 'round';
          ctx.stroke();
        }

        ctx.shadowBlur = 0;
      }

      phase += 0.05;
      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [state, isListening, isSpeaking]);

  return (
    <div className="audio-visualizer-wrapper">
      <canvas ref={canvasRef} className="audio-visualizer-canvas" />
    </div>
  );
}
