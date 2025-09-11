import GlassCard from '../components/ui/GlassCard';
import PrimaryButton from '../components/ui/PrimaryButton';
import PieChartCard from '../components/charts/PieChartCard';
import Speedometer from '../components/charts/Speedometer';
import { budgetAlloc, reputation, transactions as tx } from '../data/mocks';
import { formatNexa } from '../utils/currency';

export default function Dashboard() {
  // Convert 0–100 reputation percentage to 300–900 credit-style scale
  const repScore = Math.round(300 + (reputation.score * (900 - 300)) / 100);
  return (
    <div className="space-y-6">
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
        <GlassCard>
          <div className="heading mb-2">Reputation Score</div>
          <Speedometer value={repScore} />
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="md:col-span-2">
          <div className="heading mb-4">Transactions</div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-center">
              <thead className="text-gray-500">
                <tr>
                  <th className="py-2">Date</th>
                  <th>Recipient</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {tx.map((t) => (
                  <tr key={t.id} className="border-t border-white/10">
                    <td className="py-2">{t.date}</td>
                    <td>{t.recipient}</td>
                    <td>{t.category}</td>
                    <td>{formatNexa(t.amount)}</td>
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
  </div>
  );
}
