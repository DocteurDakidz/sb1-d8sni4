import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChartBarIcon,
  UserGroupIcon,
  GiftIcon,
  MegaphoneIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const navigation = [
  { name: 'Tableau de bord', href: '/admin', icon: ChartBarIcon },
  { name: 'Utilisateurs', href: '/admin/users', icon: UserGroupIcon },
  { name: 'Récompenses', href: '/admin/rewards', icon: GiftIcon },
  { name: 'Campagnes', href: '/admin/campaigns', icon: MegaphoneIcon },
  { name: 'Paramètres', href: '/admin/settings', icon: Cog6ToothIcon },
];

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
        <div className="flex h-16 items-center justify-center border-b border-gray-200">
          <span className="text-xl font-bold text-indigo-600">
            Admin Rewardz
          </span>
        </div>
        <nav className="mt-5 px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon
                  className={`mr-4 h-6 w-6 ${
                    isActive
                      ? 'text-indigo-600'
                      : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Bouton de déconnexion */}
        <div className="absolute bottom-0 w-full p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-2 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-md"
          >
            <ArrowLeftOnRectangleIcon className="mr-4 h-6 w-6" />
            Déconnexion
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-64">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>
    </div>
  );
}