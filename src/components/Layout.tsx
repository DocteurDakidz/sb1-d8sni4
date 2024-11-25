import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useAuthStore } from '../store/authStore';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="pl-64">
        <Navbar user={user} onLogout={handleLogout} />
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}