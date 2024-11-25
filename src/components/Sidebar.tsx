import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  GiftIcon, 
  Cog6ToothIcon, 
  ArrowPathRoundedSquareIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useAuthStore } from '../store/authStore';

export default function Sidebar() {
  const location = useLocation();
  const user = useAuthStore(state => state.user);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Récompenses', href: '/rewards', icon: GiftIcon },
    { name: 'Reconnaissance', href: '/recognition', icon: UserGroupIcon },
    { name: 'Convertir', href: '/convert', icon: ArrowPathRoundedSquareIcon },
    ...(user?.role === 'admin' ? [
      { name: 'Paramètres', href: '/settings', icon: Cog6ToothIcon }
    ] : [])
  ];

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
      <div className="flex h-16 items-center justify-center border-b border-gray-200">
        <span className="text-xl font-bold text-indigo-600">Rewardz</span>
      </div>
      <nav className="mt-5 px-2">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={clsx(
              'group flex items-center px-2 py-2 text-base font-medium rounded-md',
              location.pathname === item.href
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            )}
          >
            <item.icon
              className={clsx(
                'mr-4 h-6 w-6',
                location.pathname === item.href
                  ? 'text-indigo-600'
                  : 'text-gray-400 group-hover:text-gray-500'
              )}
            />
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}