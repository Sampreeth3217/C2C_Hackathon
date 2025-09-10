import { createContext, useContext, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [wallet, setWallet] = useState({ connected: false, address: '' });
  const [user, setUser] = useState({ name: 'Guest', avatar: '' });
  const [networkOnline, setNetworkOnline] = useState(true);

  const connectWallet = async () => {
    // Mock connect
    const address = '0x1234...ABCD';
    setWallet({ connected: true, address });
    toast.success('Wallet connected');
  };

  const disconnectWallet = () => {
    setWallet({ connected: false, address: '' });
    toast.info('Wallet disconnected');
  };

  const value = useMemo(() => ({
    wallet,
    user,
    networkOnline,
    connectWallet,
    disconnectWallet,
    setUser,
    setNetworkOnline,
  }), [wallet, user, networkOnline]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
