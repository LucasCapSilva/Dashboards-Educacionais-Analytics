import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  LineChart, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  GraduationCap
} from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';
import clsx from 'clsx';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'Alunos', path: '/students' },
  { icon: BookOpen, label: 'Turmas & Cursos', path: '/courses' },
  { icon: LineChart, label: 'Analytics', path: '/analytics' },
  { icon: Settings, label: 'Configurações', path: '/settings' },
];

interface SidebarProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar = ({ mobileOpen, onCloseMobile }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const { schoolName, logoUrl } = useThemeStore();

  return (
    <>
      <motion.aside 
        initial={{ width: 240 }}
        animate={{ width: collapsed ? 80 : 240 }}
        className="h-screen bg-white dark:bg-[#12141a] border-r border-gray-200 dark:border-white/5 hidden lg:flex flex-col z-20 sticky top-0"
      >
        <div className="p-4 flex items-center justify-between h-16 border-b border-gray-200 dark:border-white/5">
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-bold text-lg text-brand-600 dark:text-brand-400 truncate flex items-center gap-2"
              >
                {logoUrl ? (
                  <img src={logoUrl} alt={schoolName} className="h-8 w-8 object-contain" />
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-500 flex items-center justify-center">
                    <GraduationCap size={20} />
                  </div>
                )}
                <span className="truncate">{schoolName}</span>
              </motion.div>
            )}
          </AnimatePresence>
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 transition-colors"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto overflow-x-hidden">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative",
                isActive 
                  ? "bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400" 
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"
              )}
            >
              <item.icon size={20} className="min-w-[20px]" />
              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="whitespace-nowrap overflow-hidden font-medium text-sm"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {!collapsed && (
                 <motion.div 
                    className="absolute right-2 w-1.5 h-1.5 rounded-full bg-brand-500 opacity-0 group-[.active]:opacity-100"
                    layoutId="activeIndicator"
                 />
              )}
            </NavLink>
          ))}
        </nav>
      </motion.aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseMobile}
              className="fixed inset-0 bg-black/45 z-30 lg:hidden"
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'tween', duration: 0.2 }}
              className="fixed inset-y-0 left-0 w-[280px] max-w-[85vw] bg-white dark:bg-[#12141a] border-r border-gray-200 dark:border-white/5 flex flex-col z-40 lg:hidden"
            >
              <div className="px-4 flex items-center justify-between h-16 border-b border-gray-200 dark:border-white/5">
                <div className="font-bold text-lg text-brand-600 dark:text-brand-400 truncate flex items-center gap-2">
                  {logoUrl ? (
                    <img src={logoUrl} alt={schoolName} className="h-8 w-8 object-contain" />
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-500 flex items-center justify-center">
                      <GraduationCap size={20} />
                    </div>
                  )}
                  <span className="truncate">{schoolName}</span>
                </div>
                <button
                  type="button"
                  onClick={onCloseMobile}
                  className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
              </div>
              <nav className="flex-1 p-3 space-y-1 overflow-y-auto overflow-x-hidden">
                {menuItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onCloseMobile}
                    className={({ isActive }) => clsx(
                      "flex items-center gap-3 px-3 py-3 rounded-lg transition-all",
                      isActive
                        ? "bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"
                    )}
                  >
                    <item.icon size={20} />
                    <span className="truncate">{item.label}</span>
                  </NavLink>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
