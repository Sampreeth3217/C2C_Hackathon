import { useMemo, useState } from 'react';
import { AppContext } from './context';
import { toast } from 'react-toastify';

export function AppProvider({ children }) {
  const [wallet, setWallet] = useState({ connected: false, address: '' });
  const [user, setUser] = useState({ name: 'Guest', avatar: '' });
  const [isGuest, setIsGuest] = useState(true);
  const [networkOnline, setNetworkOnline] = useState(true);

  const connectWallet = async () => {
    // Mock connect
    const address = '0x1234...ABCD';
    setWallet({ connected: true, address });
    setIsGuest(false);
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
    isGuest,
    connectWallet,
    disconnectWallet,
    setUser,
    setNetworkOnline,
    setIsGuest,
  }), [wallet, user, networkOnline, isGuest]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Hook moved to hooks/useApp.jsx to keep this file exporting only components
