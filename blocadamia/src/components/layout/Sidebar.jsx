import { NavLink } from 'react-router-dom';
import { FaHome, FaMoneyBill, FaChartPie, FaUniversity, FaMedal, FaUser } from 'react-icons/fa';

const links = [
  { to: '/app', label: 'Dashboard', icon: FaHome },
  { to: '/app/payments', label: 'Payments', icon: FaMoneyBill },
  { to: '/app/budgets', label: 'Budgets', icon: FaChartPie },
  { to: '/app/loans', label: 'Loans', icon: FaUniversity },
  { to: '/app/reputation', label: 'Reputation', icon: FaMedal },
  { to: '/app/profile', label: 'Profile', icon: FaUser },
];

export function Sidebar() {
  return (
    <aside className="hidden md:block border-r border-white/20 bg-white/60 backdrop-blur-md">
      <nav className="p-4 space-y-1">
        {links.map((item) => (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/70 ${isActive ? 'gradient-primary text-white' : ''}`}>
            <item.icon /> <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-white/20 grid grid-cols-6">
      {links.map((item) => (
        <NavLink key={item.to} to={item.to} className={({ isActive }) => `flex flex-col items-center py-2 text-xs ${isActive ? 'text-primary' : 'text-gray-600'}`}>
          <item.icon />
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
