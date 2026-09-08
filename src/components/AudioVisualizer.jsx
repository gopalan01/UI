import React, { useEffect, useRef } from 'react';

/**
 * Modern, simple & attractive audio wave visualizer
 * Placed beneath the Central Mic / Tap to Speak button.
 * Features:
 * - Silky smooth fluid harmonic ribbon waves (tapered cleanly at edges)
 * - Gentle, peaceful breathing motion in idle state (alive yet calm & simple)
 * - Dynamic, luminous fluid waveforms when listening, thinking, or speaking
 * - High-DPI canvas scaling (devicePixelRatio) for razor-sharp visual clarity
 * - Zero clutter: no jagged spikes, no random dots, clean Siri/Gemini-style glow
 */
export default function AudioVisualizer({ state = 'idle', isListening = false, isSpeaking = false }) {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const currentActivityRef = useRef(0.08);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let phase = 0;

    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      if (width === 0 || height === 0) {
        animationFrameId.current = requestAnimationFrame(render);
        return;
      }

      // Sync canvas dimensions with high-DPI scaling
      if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Determine target voice activity level & animation pace
      let targetActivity = 0.08; // serene, peaceful breathing idle
      let speed = 0.024;

      if (isListening || state === 'listening') {
        targetActivity = 0.85;
        speed = 0.052;
      } else if (isSpeaking || state === 'speaking') {
        targetActivity = 1.0;
        speed = 0.062;
      } else if (state === 'thinking') {
        targetActivity = 0.45;
        speed = 0.038;
      }

      // Butter-smooth interpolation between states
      currentActivityRef.current += (targetActivity - currentActivityRef.current) * 0.08;
      const activity = currentActivityRef.current;
      const centerY = height / 2;

      // Soft ambient center bloom when voice activity is detected
      if (activity > 0.15) {
        const glowRadius = Math.min(width * 0.38, 130);
        const radialGlow = ctx.createRadialGradient(width / 2, centerY, 0, width / 2, centerY, glowRadius);
        radialGlow.addColorStop(0, `rgba(99, 102, 241, ${0.14 * activity})`);
        radialGlow.addColorStop(0.5, `rgba(0, 229, 255, ${0.07 * activity})`);
        radialGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = radialGlow;
        ctx.fillRect(0, 0, width, height);
      }

      // Vibrant, modern gradient definitions
      const coreGradient = ctx.createLinearGradient(0, 0, width, 0);
      coreGradient.addColorStop(0, '#00e5ff');
      coreGradient.addColorStop(0.3, '#6366f1');
      coreGradient.addColorStop(0.7, '#a855f7');
      coreGradient.addColorStop(1, '#ec4899');

      const secondaryGradient = ctx.createLinearGradient(0, 0, width, 0);
      secondaryGradient.addColorStop(0, 'rgba(0, 229, 255, 0.45)');
      secondaryGradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.55)');
      secondaryGradient.addColorStop(1, 'rgba(236, 72, 153, 0.45)');

      const ambientGradient = ctx.createLinearGradient(0, 0, width, 0);
      ambientGradient.addColorStop(0, 'rgba(0, 229, 255, 0.22)');
      ambientGradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.28)');
      ambientGradient.addColorStop(1, 'rgba(236, 72, 153, 0.22)');

      // Maximum wave amplitude scaled by container height and activity
      const maxAmplitude = (height * 0.42) * Math.max(0.12, activity);

      // --- Layer 1: Soft Ambient Background Wave ---
      ctx.beginPath();
      for (let x = 0; x <= width; x += 3) {
        const norm = x / width;
        const envelope = Math.pow(Math.sin(norm * Math.PI), 1.6);
        const theta = norm * Math.PI * 2;
        const wave = Math.sin(theta * 1.5 - phase * 1.3) * 0.6 + Math.cos(theta * 3.0 + phase * 1.1) * 0.4;
        const y = centerY + wave * (maxAmplitude * 0.65) * envelope;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = ambientGradient;
      ctx.lineWidth = 1.8;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();

      // --- Layer 2: Harmonic Counter-Wave ---
      ctx.beginPath();
      for (let x = 0; x <= width; x += 2) {
        const norm = x / width;
        const envelope = Math.pow(Math.sin(norm * Math.PI), 1.7);
        const theta = norm * Math.PI * 2;
        const wave = Math.sin(theta * 2.2 + phase * 1.6) * 0.65 + Math.cos(theta * 4.2 - phase * 1.2) * 0.35;
        const y = centerY + wave * (maxAmplitude * 0.85) * envelope;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = secondaryGradient;
      ctx.lineWidth = 2.0;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();

      // --- Layer 3: Primary Glowing Vocal Ribbon ---
      ctx.beginPath();
      for (let x = 0; x <= width; x += 2) {
        const norm = x / width;
        const envelope = Math.pow(Math.sin(norm * Math.PI), 1.8);
        const theta = norm * Math.PI * 2;
        const wave = Math.sin(theta * 1.8 - phase * 2.2) * 0.7 + Math.sin(theta * 3.6 + phase * 1.4) * 0.3;
        const y = centerY + wave * maxAmplitude * envelope;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = coreGradient;
      ctx.lineWidth = activity > 0.4 ? 2.8 : 2.0;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowColor = 'rgba(99, 102, 241, 0.65)';
      ctx.shadowBlur = activity > 0.3 ? 10 : 4;
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.restore();

      phase += speed;
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
