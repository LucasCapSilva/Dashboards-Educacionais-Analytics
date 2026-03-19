import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { ThemeInitializer } from './ThemeInitializer';

export const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-[#0f1117] text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      <ThemeInitializer />
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};