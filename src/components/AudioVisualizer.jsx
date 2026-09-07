import React, { useEffect, useRef } from 'react';

export default function AudioVisualizer({ state = 'idle', isListening = false, isSpeaking = false }) {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);

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

      const numBars = 36;
      const barWidth = width / numBars - 2.5;
      const centerY = height / 2;

      // Determine intensity based on state
      let activityLevel = 0.15; // Idle ambient
      if (isListening) activityLevel = 0.85;
      else if (isSpeaking) activityLevel = 0.95;
      else if (state === 'thinking') activityLevel = 0.45;

      // Draw gradient bars
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, '#00F0FF');
      gradient.addColorStop(0.5, '#A855F7');
      gradient.addColorStop(1, '#EC4899');

      ctx.fillStyle = gradient;

      for (let i = 0; i < numBars; i++) {
        // Multi-frequency synthetic wave calculation
        const freq1 = Math.sin(i * 0.25 + phase * 2.5);
        const freq2 = Math.cos(i * 0.15 - phase * 1.8);
        const freq3 = Math.sin(i * 0.4 + phase * 3.2);

        const combined = Math.abs(freq1 * 0.5 + freq2 * 0.3 + freq3 * 0.2);
        const barHeight = Math.max(4, combined * (height * 0.85) * activityLevel);

        const x = i * (barWidth + 2.5) + 1.25;
        const y = centerY - barHeight / 2;

        // Rounded bar
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, [2, 2, 2, 2]);
        ctx.fill();
      }

      phase += 0.04;
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
