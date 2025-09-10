import { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import PrimaryButton from '../components/ui/PrimaryButton';
import PieChartCard from '../components/charts/PieChartCard';

export default function Budgets() {
  const [food, setFood] = useState(30);
  const [rent, setRent] = useState(40);
  const [books, setBooks] = useState(15);
  const [misc, setMisc] = useState(15);
  const total = food + rent + books + misc;
  const data = [
    { name: 'Food', value: Math.round((food / total) * 100) },
    { name: 'Rent', value: Math.round((rent / total) * 100) },
    { name: 'Books', value: Math.round((books / total) * 100) },
    { name: 'Misc', value: Math.round((misc / total) * 100) },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard>
          <div className="heading mb-4">Category Sliders</div>
          <div className="space-y-4">
            <Slider label="Food" value={food} setValue={setFood} />
            <Slider label="Rent" value={rent} setValue={setRent} />
            <Slider label="Books" value={books} setValue={setBooks} />
            <Slider label="Misc" value={misc} setValue={setMisc} />
            <PrimaryButton onClick={() => { /* pretend save */ }} className="mt-2">Save Budget</PrimaryButton>
          </div>
        </GlassCard>
        <PieChartCard title="Live Allocation" data={data} />
      </div>
      <GlassCard>
        <div className="heading mb-2">Past Allocations</div>
        <div className="text-sm text-gray-600">No history yet.</div>
      </GlassCard>
  </motion.div>
  );
}

function Slider({ label, value, setValue }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1"><span className="label">{label}</span><span className="text-sm font-medium">{value}%</span></div>
      <input type="range" min="0" max="100" value={value} onChange={(e) => setValue(Number(e.target.value))} className="w-full accent-primary" />
    </div>
  );
}
