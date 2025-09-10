import { motion } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import PrimaryButton from '../components/ui/PrimaryButton';
import PieChartCard from '../components/charts/PieChartCard';
import GaugeCard from '../components/charts/GaugeCard';
import { budgetAlloc, reputation, transactions as tx } from '../data/mocks';
import { formatNexa } from '../utils/currency';

export default function Dashboard() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="md:col-span-1">
          <div className="heading">Wallet Balance</div>
          <div className="text-3xl font-bold mt-4">{formatNexa(1284.22)}</div>
          <div className="mt-4 flex gap-3">
            <PrimaryButton>Send Payment</PrimaryButton>
            <PrimaryButton className="bg-indigo-600">Request Loan</PrimaryButton>
          </div>
        </GlassCard>
        <PieChartCard title="Budget Allocation" data={budgetAlloc} />
        <GaugeCard title="Reputation Score" value={reputation.score} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="md:col-span-2">
          <div className="heading mb-4">Transactions</div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-gray-500">
                <tr>
                  <th className="py-2">Date</th>
                  <th>Recipient</th>
                  <th>Category</th>
                  <th className="text-right">Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {tx.map((t) => (
                  <tr key={t.id} className="border-t border-white/10">
                    <td className="py-2">{t.date}</td>
                    <td>{t.recipient}</td>
                    <td>{t.category}</td>
                    <td className="text-right">{formatNexa(t.amount)}</td>
                    <td>
                      <span className={`status-chip ${t.status === 'success' ? 'status-success' : t.status === 'pending' ? 'status-pending' : 'status-failed'}`}>{t.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
        <GlassCard>
          <div className="heading mb-4">Quick Actions</div>
          <div className="grid grid-cols-1 gap-3">
            <PrimaryButton>Send Payment</PrimaryButton>
            <PrimaryButton>Request Loan</PrimaryButton>
            <PrimaryButton>Update Budget</PrimaryButton>
          </div>
        </GlassCard>
      </div>
  </motion.div>
  );
}
