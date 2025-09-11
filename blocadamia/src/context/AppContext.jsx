import { useEffect, useMemo, useState } from 'react';
import { AppContext } from './context';

export function AppProvider({ children }) {
  const [wallet, setWallet] = useState({ connected: false, address: '' });
  // Load user from localStorage if available, else default
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('user');
      if (raw) return JSON.parse(raw);
    } catch (e) {
      void e; // ignore corrupted localStorage
    }
    return {
      name: 'Guest',
      email: '',
      bio: '',
      avatar: '',
    };
  });
  const [isGuest, setIsGuest] = useState(true);
  const [networkOnline, setNetworkOnline] = useState(true);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored);
    } else {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark'); else root.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  // Persist user profile to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('user', JSON.stringify(user));
    } catch (e) {
      void e; // storage may be unavailable (private mode)
    }
  }, [user]);

  const connectWallet = async () => {
    // Mock connect
    const address = '0x1234...ABCD';
    setWallet({ connected: true, address });
    setIsGuest(false);
  };

  const disconnectWallet = () => {
    setWallet({ connected: false, address: '' });
  };

  const value = useMemo(() => ({
    wallet,
    user,
    networkOnline,
    isGuest,
  theme,
    connectWallet,
    disconnectWallet,
    setUser,
    setNetworkOnline,
    setIsGuest,
  toggleTheme,
  }), [wallet, user, networkOnline, isGuest, theme]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Hook moved to hooks/useApp.jsx to keep this file exporting only components
