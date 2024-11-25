import { useState } from 'react';
import { 
  PlusIcon,
  CalendarIcon,
  UserGroupIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

interface Campaign {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  target: string;
  points: number;
  status: 'active' | 'scheduled' | 'completed';
  progress: number;
}

const campaigns: Campaign[] = [
  {
    id: '1',
    title: 'Challenge trimestriel',
    description: 'Objectifs de vente pour Q1 2024',
    startDate: new Date(2024, 0, 1),
    endDate: new Date(2024, 2, 31),
    target: 'Service Commercial',
    points: 1000,
    status: 'active',
    progress: 65,
  },
  // Ajoutez plus de campagnes ici
];

export default function Campaigns() {
  const [showAddCampaign, setShowAddCampaign] = useState(false);

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Gestion des campagnes
          </h1>
          <button
            type="button"
            onClick={() => setShowAddCampaign(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Créer une campagne
          </button>
        </div>
      </div>

      {/* Statistiques des campagnes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="bg-green-100 rounded-md p-3">
                <ChartBarIcon className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">
                Campagnes actives
              </h3>
              <p className="text-2xl font-semibold text-gray-900">3</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="bg-blue-100 rounded-md p-3">
                <UserGroupIcon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">
                Participants
              </h3>
              <p className="text-2xl font-semibold text-gray-900">245</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="bg-purple-100 rounded-md p-3">
                <ChartBarIcon className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">
                Points distribués
              </h3>
              <p className="text-2xl font-semibold text-gray-900">12,500</p>
            </div>
          </div>
        </div>
      </div>

      {/* Liste des campagnes */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="divide-y divide-gray-200">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      {campaign.title}
                    </h3>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        campaign.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : campaign.status === 'scheduled'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {campaign.status === 'active'
                        ? 'Active'
                        : campaign.status === 'scheduled'
                        ? 'Planifiée'
                        : 'Terminée'}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {campaign.description}
                  </p>
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                    <span>
                      {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                    </span>
                    <UserGroupIcon className="flex-shrink-0 ml-6 mr-1.5 h-5 w-5 text-gray-400" />
                    <span>{campaign.target}</span>
                    <ChartBarIcon className="flex-shrink-0 ml-6 mr-1.5 h-5 w-5 text-gray-400" />
                    <span>{campaign.points} points</span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block text-indigo-600">
                        {campaign.progress}% Complété
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                    <div
                      style={{ width: `${campaign.progress}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal d'ajout de campagne */}
      {showAddCampaign && (
        <div className="fixed inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100">
                  <ChartBarIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Créer une nouvelle campagne
                  </h3>
                </div>
              </div>
              <form className="mt-6 space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Titre
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                      Date de début
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      id="startDate"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                      Date de fin
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      id="endDate"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="target" className="block text-sm font-medium text-gray-700">
                    Cible
                  </label>
                  <select
                    id="target"
                    name="target"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option>Service Commercial</option>
                    <option>Marketing</option>
                    <option>RH</option>
                    <option>IT</option>
                    <option>Tous les services</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="points" className="block text-sm font-medium text-gray-700">
                    Points à distribuer
                  </label>
                  <input
                    type="number"
                    name="points"
                    id="points"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </form>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                >
                  Créer
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => setShowAddCampaign(false)}
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}