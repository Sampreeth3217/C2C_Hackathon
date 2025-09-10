export default function GlassCard({ className = '', children }) {
  return (
    <div className={`glass-card ${className}`}>
      {children}
    </div>
  );
}
