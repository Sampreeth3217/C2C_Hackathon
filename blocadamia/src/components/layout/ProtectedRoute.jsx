import { Navigate } from 'react-router-dom';
import { useApp } from '../../hooks/useApp';

export default function ProtectedRoute({ children }) {
  const { wallet, isGuest } = useApp();
  if (!wallet.connected && !isGuest) return <Navigate to="/" replace />;
  return children;
}
