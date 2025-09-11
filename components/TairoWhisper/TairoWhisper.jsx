import React, { useEffect, useState, useRef } from 'react';
import { tairoWhispers } from './tairo-whispers';
import '../../styles/components/tairo-whisper.css';

export default function TairoWhisper({ context, voice = true }) {
  const [whisper, setWhisper] = useState('');
  const [visible, setVisible] = useState(false);
  const idleTimer = useRef(null);

  const getContext = () => {
    if (context) return context;
    const path = window.location.pathname;
    if (path.includes('journal')) return 'journal';
    if (path.includes('map')) return 'map';
    if (path.includes('lake')) return 'lake';
    return 'idle';
  };

  const pickWhisper = (ctx) => {
    const options = tairoWhispers[ctx] || tairoWhispers.idle;
    return options[Math.floor(Math.random() * options.length)];
  };

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = 0.9;
      utter.pitch = 1;
      utter.volume = 0.8;
      utter.lang = 'en-US';
      window.speechSynthesis.speak(utter);
    }
  };

  const triggerWhisper = () => {
    const ctx = getContext();
    const msg = pickWhisper(ctx);
    setWhisper(msg);
    setVisible(true);
    if (voice) speak(msg);
  };

  useEffect(() => {
    const resetIdleTimer = () => {
      clearTimeout(idleTimer.current);
      setVisible(false);
      idleTimer.current = setTimeout(triggerWhisper, 60000); // 60 sec idle
    };

    window.addEventListener('mousemove', resetIdleTimer);
    window.addEventListener('keydown', resetIdleTimer);
    window.addEventListener('click', resetIdleTimer);
    resetIdleTimer();

    return () => {
      clearTimeout(idleTimer.current);
      window.removeEventListener('mousemove', resetIdleTimer);
      window.removeEventListener('keydown', resetIdleTimer);
      window.removeEventListener('click', resetIdleTimer);
    };
  }, []);

  if (!visible || !whisper) return null;

  return (
    <div className="tairo-whisper-container">
      <p className="tairo-whisper-text">𓂀 {whisper}</p>
    </div>
  );
}
