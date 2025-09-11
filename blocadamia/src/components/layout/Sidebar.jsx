import { NavLink } from 'react-router-dom';
import { navLinks } from './navLinks';

export function Sidebar() {
  return (
    <aside className="hidden md:block border-r border-white/20 dark:border-gray-800 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md">
      <nav className="p-3 space-y-1">
  {navLinks.map((item) => (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/70 dark:hover:bg-gray-800/70 ${isActive ? 'gradient-primary text-white' : 'text-gray-700 dark:text-gray-200'}`}>
            <item.icon /> <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export function BottomNav() {
  return (
  <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-white/20 dark:border-gray-800 grid grid-cols-6">
  {navLinks.map((item) => (
        <NavLink key={item.to} to={item.to} className={({ isActive }) => `flex items-center justify-center py-2 text-lg ${isActive ? 'text-primary' : 'text-gray-600 dark:text-gray-300'}`}>
          <item.icon />
        </NavLink>
      ))}
    </nav>
  );
}
