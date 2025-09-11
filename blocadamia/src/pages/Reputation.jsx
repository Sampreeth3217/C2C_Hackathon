import { motion } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import Speedometer from '../components/charts/Speedometer';
import { reputation, activity } from '../data/mocks';

export default function ReputationPage() {
  return (
  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard>
          <div className="heading mb-2">Reputation (CIBIL-like)</div>
          <Speedometer value={Math.round(300 + (reputation.score / 100) * 600)} />
        </GlassCard>
        <GlassCard className="md:col-span-2">
          <div className="heading mb-4">Badges</div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {reputation.badges.map((b) => (
              <div key={b.id} className="p-3 rounded-xl bg-white/70 border border-white/10 text-center">🏅 {b.title}</div>
            ))}
          </div>
        </GlassCard>
      </div>
      <GlassCard>
        <div className="heading mb-3">Recent Events</div>
        <ul className="space-y-2">
          {activity.map((a) => (
            <li key={a.id} className="flex items-center gap-2"><span>{a.type === 'up' ? '👍' : '👎'}</span> <span className="text-sm" title={a.text}>{a.text}</span></li>
          ))}
        </ul>
      </GlassCard>
  </motion.div>
  );
}
