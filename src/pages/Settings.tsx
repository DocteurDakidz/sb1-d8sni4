import { useState } from 'react';

export default function Settings() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weekly: true,
    marketing: false
  });

  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    language: 'fr'
  });

  const [security, setSecurity] = useState({
    twoFactor: false
  });

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Profile Settings */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Profil</h2>
        <form onSubmit={handleProfileSubmit} className="space-y-6">
          <div className="flex items-center space-x-6">
            <div className="flex-shrink-0">
              <img
                className="h-16 w-16 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Profile"
              />
            </div>
            <button
              type="button"
              className="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Changer la photo
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nom complet
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                Langue
              </label>
              <select
                id="language"
                name="language"
                value={profile.language}
                onChange={(e) => setProfile({ ...profile, language: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
            </div>
          </div>
        </form>
      </div>

      {/* Notification Settings */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Notifications</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Notifications par email</h3>
              <p className="text-sm text-gray-500">Recevoir des notifications par email</p>
            </div>
            <button
              onClick={() => handleNotificationChange('email')}
              className={`${
                notifications.email ? 'bg-indigo-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            >
              <span
                className={`${
                  notifications.email ? 'translate-x-5' : 'translate-x-0'
                } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Notifications push</h3>
              <p className="text-sm text-gray-500">Recevoir des notifications push sur votre appareil</p>
            </div>
            <button
              onClick={() => handleNotificationChange('push')}
              className={`${
                notifications.push ? 'bg-indigo-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            >
              <span
                className={`${
                  notifications.push ? 'translate-x-5' : 'translate-x-0'
                } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Résumé hebdomadaire</h3>
              <p className="text-sm text-gray-500">Recevoir un résumé hebdomadaire de vos récompenses</p>
            </div>
            <button
              onClick={() => handleNotificationChange('weekly')}
              className={`${
                notifications.weekly ? 'bg-indigo-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring -offset-2`}
            >
              <span
                className={`${
                  notifications.weekly ? 'translate-x-5' : 'translate-x-0'
                } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Sécurité</h2>
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Authentification à deux facteurs</h3>
                <p className="text-sm text-gray-500">Ajouter une couche de sécurité supplémentaire à votre compte</p>
              </div>
              <button
                onClick={() => setSecurity(prev => ({ ...prev, twoFactor: !prev.twoFactor }))}
                className={`${
                  security.twoFactor ? 'bg-indigo-600' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
              >
                <span
                  className={`${
                    security.twoFactor ? 'translate-x-5' : 'translate-x-0'
                  } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                />
              </button>
            </div>
          </div>

          <div>
            <button
              type="button"
              className="text-sm text-red-600 hover:text-red-500 font-medium"
            >
              Changer le mot de passe
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={handleProfileSubmit}
        >
          Enregistrer les modifications
        </button>
      </div>
    </div>
  );
}