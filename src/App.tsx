import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';

const Dashboard = lazy(() => import('./features/dashboard/Dashboard'));
const Home = lazy(() => import('./features/home/Home'));
const About = lazy(() => import('./features/about/About'));
const Students = lazy(() => import('./features/students/Students'));
const Courses = lazy(() => import('./features/courses/Courses'));
const Analytics = lazy(() => import('./features/analytics/Analytics'));
const Settings = lazy(() => import('./features/settings/Settings'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-[#0f1117]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="about" element={<About />} />
            <Route path="students" element={<Students />} />
            <Route path="courses" element={<Courses />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
