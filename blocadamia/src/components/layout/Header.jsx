import { Link } from 'react-router-dom';
import { useApp } from '../../hooks/useApp';
import { FaCircle } from 'react-icons/fa';

export default function Header() {
  const { wallet, connectWallet, disconnectWallet, networkOnline } = useApp();
  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/vite.svg" alt="Blocadamia" className="h-8" />
          <span className="font-bold text-lg">Blocadamia</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className={`flex items-center gap-1 text-sm ${networkOnline ? 'text-green-600' : 'text-red-600'}`}>
            <FaCircle className="text-xs"/> {networkOnline ? 'Connected' : 'Offline'}
          </span>
          {wallet.connected ? (
            <button onClick={disconnectWallet} className="text-sm rounded-lg px-3 py-1 bg-blue-50 border border-blue-200">{wallet.address}</button>
          ) : (
            <button onClick={connectWallet} className="text-sm rounded-lg px-3 py-1 gradient-primary text-white">Connect</button>
          )}
        </div>
      </div>
    </header>
  );
}
