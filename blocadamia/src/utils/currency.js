export function formatNexa(value, opts = {}) {
  const { decimals = 2 } = opts;
  const num = Number(value) || 0;
  const sign = num < 0 ? '-' : '';
  const abs = Math.abs(num);
  const formatted = abs.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${sign}Nexa ${formatted}`;
}
