export default function InputField({ label, className = '', ...props }) {
  return (
    <label className="block">
      {label && <div className="label mb-1">{label}</div>}
      <input
        className={`w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 px-3 py-2 bg-white/70 ${className}`}
        {...props}
      />
    </label>
  );
}
