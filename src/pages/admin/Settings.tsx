import { useState } from 'react';
import { 
  PaintBrushIcon,
  BellIcon,
  LinkIcon
} from '@heroicons/react/24/outline';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    companyName: 'Ma Société',
    primaryColor: '#4F46E5',
    logo: null,
    emailNotifications: true,
    slackIntegration: false,
    microsoftTeamsIntegration: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle settings update
    console.log(settings);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Paramètres de l'application
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personnalisation */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <PaintBrushIcon className="h-5 w-5 mr-2 text-gray-400" />
              Personnalisation
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                  Nom de l'entreprise
                </label>
                <input
                  type="text"
                  id="companyName"
                  value={settings.companyName}
                  onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700">
                  Couleur principale
                </label>
                <input
                  type="color"
                  id="primaryColor"
                  value={settings.primaryColor}
                  onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                  className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <BellIcon className="h-5 w-5 mr-2 text-gray-400" />
              Notifications
            </h3>
            <div className="mt-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="emailNotifications"
                  checked={settings.emailNotifications}
                  onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-700">
                  Activer les notifications par email
                </label>
              </div>
            </div>
          </div>

          {/* Intégrations */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <LinkIcon className="h-5 w-5 mr-2 text-gray-400" />
              Intégrations
            </h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="slackIntegration"
                  checked={settings.slackIntegration}
                  onChange={(e) => setSettings({ ...settings, slackIntegration: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="slackIntegration" className="ml-2 block text-sm text-gray-700">
                  Intégration Slack
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="teamsIntegration"
                  checked={settings.microsoftTeamsIntegration}
                  onChange={(e) => setSettings({ ...settings, microsoftTeamsIntegration: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="teamsIntegration" className="ml-2 block text-sm text-gray-700">
                  Intégration Microsoft Teams
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Enregistrer les modifications
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}