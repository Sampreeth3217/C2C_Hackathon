export default function SecondaryButton({ children, className = '', ...props }) {
  return (
    <button
      className={`rounded-xl px-4 py-2 font-semibold border border-blue-300 text-primary bg-white/60 hover:shadow-[0_0_24px_rgba(74,144,226,0.35)] transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
