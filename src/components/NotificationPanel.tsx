import { Fragment, useCallback } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { BellIcon, CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useNotificationStore } from '../store/notificationStore';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

const getNotificationIcon = (type: string) => {
  const iconClasses = 'h-6 w-6';
  switch (type) {
    case 'success':
      return <CheckCircleIcon className={`${iconClasses} text-green-500`} />;
    case 'warning':
      return <ExclamationCircleIcon className={`${iconClasses} text-yellow-500`} />;
    case 'error':
      return <XMarkIcon className={`${iconClasses} text-red-500`} />;
    default:
      return <InformationCircleIcon className={`${iconClasses} text-blue-500`} />;
  }
};

export default function NotificationPanel() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification } = useNotificationStore();

  const handleMarkAsRead = useCallback((id: string) => {
    markAsRead(id);
  }, [markAsRead]);

  const handleRemoveNotification = useCallback((id: string) => {
    removeNotification(id);
  }, [removeNotification]);

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
        <BellIcon className="h-6 w-6 text-gray-500" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 block h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-96 origin-top-right rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-4 py-3 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-indigo-600 hover:text-indigo-500 transition-colors"
                >
                  Tout marquer comme lu
                </button>
              )}
            </div>
          </div>

          <div className="max-h-[28rem] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-6 text-center text-gray-500">
                Aucune notification
              </div>
            ) : (
              notifications.map((notification) => (
                <Menu.Item key={notification.id}>
                  <div
                    className={`px-4 py-3 hover:bg-gray-50 transition-colors ${
                      !notification.read ? 'bg-indigo-50' : ''
                    }`}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              {notification.message}
                            </p>
                          </div>
                          <button
                            onClick={() => handleRemoveNotification(notification.id)}
                            className="ml-4 text-gray-400 hover:text-gray-500 transition-colors"
                          >
                            <XMarkIcon className="h-5 w-5" />
                          </button>
                        </div>
                        <div className="mt-2 flex justify-between items-center">
                          <p className="text-xs text-gray-500">
                            {formatDistanceToNow(new Date(notification.date), {
                              addSuffix: true,
                              locale: fr,
                            })}
                          </p>
                          {!notification.read && (
                            <button
                              onClick={() => handleMarkAsRead(notification.id)}
                              className="text-xs text-indigo-600 hover:text-indigo-500 transition-colors"
                            >
                              Marquer comme lu
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Menu.Item>
              ))
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}