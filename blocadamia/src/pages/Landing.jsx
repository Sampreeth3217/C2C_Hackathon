import { motion } from 'framer-motion';
import PrimaryButton from '../components/ui/PrimaryButton';
import SecondaryButton from '../components/ui/SecondaryButton';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import { useState } from 'react';

const slides = [
  { title: 'Peer-to-Peer Finance', desc: 'Send and receive payments seamlessly.' },
  { title: 'Smart Budgets', desc: 'Plan and track your spending with ease.' },
  { title: 'Build Reputation', desc: 'Unlock better loan terms by being reliable.' },
];

export default function Landing() {
  const nav = useNavigate();
  const { connectWallet } = useApp();
  const [index, setIndex] = useState(0);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-background to-backgroundAlt">
      <motion.img initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} src="/vite.svg" alt="Blocadamia" className="h-16 mb-6" />
      <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="heading mb-3">Welcome to Blocadamia</motion.h1>
      <p className="body-text mb-6 max-w-xl">A clean, modern finance dashboard for campus communities.</p>
      <div className="flex gap-3 mb-8">
        <PrimaryButton onClick={async () => { await connectWallet(); nav('/app'); }}>Connect Wallet</PrimaryButton>
        <SecondaryButton onClick={() => nav('/app')}>Continue as Guest</SecondaryButton>
      </div>
      <div className="w-full max-w-2xl">
        <div className="glass-card">
          <div className="h-40 flex flex-col items-center justify-center">
            <div className="text-xl font-semibold">{slides[index].title}</div>
            <div className="text-gray-600">{slides[index].desc}</div>
          </div>
          <div className="flex items-center justify-center gap-2 mt-3">
            {slides.map((_, i) => (
              <button key={i} onClick={() => setIndex(i)} className={`h-2 w-2 rounded-full ${i === index ? 'bg-primary' : 'bg-gray-300'}`} />
            ))}
          </div>
        </div>
      </div>
  </motion.div>
  );
}
