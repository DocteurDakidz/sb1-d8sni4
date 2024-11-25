import { User } from '../store/authStore';
import NotificationPanel from './NotificationPanel';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

export default function Navbar({ user, onLogout }: NavbarProps) {
  return (
    <nav className="bg-white shadow-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Rewardz</h1>
          <div className="flex items-center space-x-4">
            <NotificationPanel />
            
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center space-x-3">
                <img
                  className="h-8 w-8 rounded-full"
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || '')}&background=random`}
                  alt={user?.name}
                />
                <span className="text-sm font-medium text-gray-700">{user?.name}</span>
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={onLogout}
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } block w-full px-4 py-2 text-left text-sm text-gray-700`}
                      >
                        Se déconnecter
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
}