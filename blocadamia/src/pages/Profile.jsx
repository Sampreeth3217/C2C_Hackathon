import { motion } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import PrimaryButton from '../components/ui/PrimaryButton';
import { useApp } from '../hooks/useApp';

export default function Profile() {
  const { wallet, user } = useApp();
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <GlassCard>
        <div className="flex items-center gap-4">
          <img src={user.avatar || 'https://api.dicebear.com/9.x/identicon/svg?seed=blocadamia'} alt="avatar" className="h-16 w-16 rounded-full" />
          <div>
            <div className="heading">{user.name}</div>
            <div className="text-sm text-gray-600">Wallet: {wallet.address || 'Not connected'}</div>
            {wallet.address && (
              <PrimaryButton className="mt-2" onClick={() => navigator.clipboard.writeText(wallet.address)}>Copy Address</PrimaryButton>
            )}
          </div>
        </div>
      </GlassCard>
      <GlassCard>
        <div className="heading mb-2">Recent Activity</div>
        <div className="text-sm text-gray-600">No recent activity.</div>
      </GlassCard>
  </motion.div>
  );
}
