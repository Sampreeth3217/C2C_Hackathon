import { Link, NavLink } from 'react-router-dom';
import { useApp } from '../../hooks/useApp';
import { FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import { navLinks } from './navLinks';

export default function Header() {
  const { wallet, connectWallet, disconnectWallet, networkOnline, theme, toggleTheme } = useApp();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-white/20 dark:border-gray-800">
      <div className="w-full px-3 md:px-4 py-2 md:py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/vite.svg" alt="Blocadamia" className="h-8" />
          <span className="font-bold text-lg">Blocadamia</span>
        </Link>
        <div className="flex items-center gap-2 md:gap-3">
          <div className="flex items-center" aria-live="polite" aria-label={networkOnline ? 'Network connected' : 'Network offline'}>
            <span className="relative flex h-3 w-3">
              <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${networkOnline ? 'bg-green-400' : 'bg-red-400'}`}></span>
              <span className={`relative inline-flex h-3 w-3 rounded-full ${networkOnline ? 'bg-green-500' : 'bg-red-500'}`}></span>
            </span>
            <span className={`ml-2 hidden md:inline text-sm ${networkOnline ? 'text-green-600' : 'text-red-600'}`}>
              {networkOnline ? 'Connected' : 'Offline'}
            </span>
          </div>
          <button onClick={toggleTheme} className="hidden md:inline rounded-lg p-2 border border-white/20 dark:border-gray-700 bg-white/60 dark:bg-gray-800 hover:opacity-90">
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </button>
          {wallet.connected ? (
            <button
              onClick={disconnectWallet}
              className="hidden md:inline max-w-[200px] truncate text-sm rounded-lg px-3 py-1 bg-blue-50 border border-blue-200 text-blue-800 dark:text-blue-900"
              title={wallet.address}
            >
              {wallet.address}
            </button>
          ) : (
            <button onClick={connectWallet} className="hidden md:inline text-sm rounded-lg px-3 py-1 gradient-primary text-white">Connect</button>
          )}
          <button onClick={() => setOpen((o) => !o)} className="md:hidden rounded-lg p-2 border border-white/20 dark:border-gray-700 bg-white/60 dark:bg-gray-800">
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
      {/* Mobile menu panel */}
      {open && (
        <div className="md:hidden border-t border-white/20 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
          <nav className="px-3 py-2 grid grid-cols-2 gap-2">
            {navLinks.map((item) => (
              <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)} className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg ${isActive ? 'gradient-primary text-black' : 'bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-200'}`}>
                <item.icon /> <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
          <div className="px-3 pb-3 flex items-center gap-2">
            <button onClick={toggleTheme} className="rounded-lg p-2 border border-white/20 dark:border-gray-700 bg-white/60 dark:bg-gray-800 hover:opacity-90">
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </button>
            {wallet.connected ? (
              <button
                onClick={disconnectWallet}
                className="text-sm rounded-lg px-3 py-1 bg-blue-50 border border-blue-200 text-blue-800 dark:text-blue-900 truncate"
                title={wallet.address}
              >
                {wallet.address}
              </button>
            ) : (
              <button onClick={connectWallet} className="text-sm rounded-lg px-3 py-1 gradient-primary text-white">Connect</button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
