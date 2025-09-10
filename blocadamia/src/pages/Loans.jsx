import { motion } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import InputField from '../components/ui/InputField';
import PrimaryButton from '../components/ui/PrimaryButton';
import { loans as mockLoans } from '../data/mocks';
import { formatNexa } from '../utils/currency';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function Loans() {
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [term, setTerm] = useState('3 months');

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard>
          <div className="heading mb-4">Loan Request</div>
          <div className="space-y-3">
            <InputField label="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="500" />
            <label className="block">
              <div className="label mb-1">Reason</div>
              <textarea className="w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 px-3 py-2 bg-white/70" rows="3" value={reason} onChange={(e) => setReason(e.target.value)} />
            </label>
            <label className="block">
              <div className="label mb-1">Terms</div>
              <select className="w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 px-3 py-2 bg-white/70" value={term} onChange={(e) => setTerm(e.target.value)}>
                <option>3 months</option>
                <option>6 months</option>
                <option>12 months</option>
              </select>
            </label>
            <PrimaryButton onClick={() => toast.success('Loan request submitted')}>Submit</PrimaryButton>
          </div>
        </GlassCard>
        <GlassCard>
          <div className="heading mb-4">Active Loans</div>
          <div className="space-y-3">
            {mockLoans.filter(l => l.status === 'active').map((l) => (
              <div key={l.id} className="p-3 rounded-xl bg-white/70 border border-white/10">
                <div className="flex items-center justify-between"><div className="font-semibold">{l.id}</div><div>{formatNexa(l.amount)}</div></div>
                <div className="h-2 bg-gray-200 rounded-full mt-2">
                  <div className="h-2 bg-primary rounded-full" style={{ width: `${l.repaidPct}%` }} />
                </div>
                <div className="text-xs text-gray-600 mt-1">{l.repaidPct}% repaid • Due {l.due}</div>
                <PrimaryButton className="mt-2">Repay</PrimaryButton>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
      <GlassCard>
        <div className="heading mb-2">Past Loans</div>
        <div className="grid md:grid-cols-3 gap-3">
          {mockLoans.filter(l => l.status !== 'active').map((l) => (
            <div key={l.id} className="p-3 rounded-xl bg-white/70 border border-white/10">
              <div className="font-semibold">{l.id}</div>
              <div className="text-sm">{formatNexa(l.amount)} • {l.status === 'paid' ? <span className="status-chip status-success">paid</span> : <span className="status-chip status-pending">unpaid</span>}</div>
            </div>
          ))}
        </div>
      </GlassCard>
  </motion.div>
  );
}
