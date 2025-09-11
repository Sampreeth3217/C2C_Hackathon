import { FaHome, FaMoneyBill, FaChartPie, FaUniversity, FaMedal, FaUser } from 'react-icons/fa';

export const navLinks = [
  { to: '/app', label: 'Dashboard', icon: FaHome },
  { to: '/app/payments', label: 'Payments', icon: FaMoneyBill },
  { to: '/app/budgets', label: 'Budgets', icon: FaChartPie },
  { to: '/app/loans', label: 'Loans', icon: FaUniversity },
  { to: '/app/reputation', label: 'Reputation', icon: FaMedal },
  { to: '/app/profile', label: 'Profile', icon: FaUser },
];
