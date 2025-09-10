import { useRef } from 'react';

export default function PrimaryButton({ children, className = '', onClick, ...props }) {
  const btnRef = useRef(null);
  const handleClick = (e) => {
    const btn = btnRef.current;
    if (btn) {
      const circle = document.createElement('span');
      const diameter = Math.max(btn.clientWidth, btn.clientHeight);
      const radius = diameter / 2;
      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - (btn.getBoundingClientRect().left + radius)}px`;
      circle.style.top = `${e.clientY - (btn.getBoundingClientRect().top + radius)}px`;
      circle.className = 'pointer-events-none absolute rounded-full bg-white/50 animate-[ripple_600ms_ease-out]';
      btn.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    }
    onClick?.(e);
  };
  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      className={`relative overflow-hidden gradient-primary text-white rounded-xl px-4 py-2 font-semibold shadow-md hover:opacity-95 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
