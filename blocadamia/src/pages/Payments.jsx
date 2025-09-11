import { motion } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import InputField from '../components/ui/InputField';
import PrimaryButton from '../components/ui/PrimaryButton';
import { transactions } from '../data/mocks';
import { formatNexa } from '../utils/currency';
import { useState } from 'react';

export default function Payments() {
  const [addr, setAddr] = useState('');
  const [amount, setAmount] = useState('');
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard>
          <div className="heading mb-4">QR Scanner</div>
          <div className="h-56 bg-gray-100/60 rounded-xl flex items-center justify-center mb-3">Mock Camera</div>
          <PrimaryButton>Scan QR</PrimaryButton>
        </GlassCard>
        <GlassCard>
          <div className="heading mb-4">Manual Entry</div>
          <div className="space-y-3">
            <InputField label="Wallet Address" value={addr} onChange={(e) => setAddr(e.target.value)} placeholder="0x..." />
            <InputField label="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" />
            <PrimaryButton>Submit Payment</PrimaryButton>
          </div>
        </GlassCard>
      </div>
      <GlassCard>
        <div className="heading mb-4">Transaction History</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-gray-500">
              <tr>
                <th className="py-2">Date</th>
                <th>Recipient</th>
                <th className="text-right">Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="border-t border-white/10">
                  <td className="py-2">{t.date}</td>
                  <td>{t.recipient}</td>
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
  </motion.div>
  );
}
