import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import { useReminders } from '../hooks/useReminders';

export default function MainLayout() {
  useReminders();
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <Navbar />
        <main className="flex-1 px-4 md:px-8 py-5 pb-24 md:pb-10 max-w-5xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
