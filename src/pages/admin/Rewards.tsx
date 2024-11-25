import { useState } from 'react';
import { 
  PlusIcon,
  TagIcon,
  GiftIcon,
  TicketIcon,
  AcademicCapIcon,
  TrashIcon,
  PencilIcon
} from '@heroicons/react/24/outline';

interface Reward {
  id: string;
  name: string;
  description: string;
  category: 'gift' | 'experience' | 'training' | 'voucher';
  points: number;
  stock: number;
  image: string;
  active: boolean;
}

const categories = [
  { id: 'gift', name: 'Cadeaux', icon: GiftIcon },
  { id: 'experience', name: 'Expériences', icon: TicketIcon },
  { id: 'training', name: 'Formations', icon: AcademicCapIcon },
  { id: 'voucher', name: 'Bons d\'achat', icon: TagIcon },
];

const mockRewards: Reward[] = [
  {
    id: '1',
    name: 'Bon d\'achat Amazon',
    description: 'Bon d\'achat de 50€ valable sur Amazon',
    category: 'voucher',
    points: 500,
    stock: 100,
    image: 'https://placehold.co/300x200',
    active: true,
  },
  {
    id: '2',
    name: 'Formation en ligne',
    description: 'Accès à une formation en ligne au choix',
    category: 'training',
    points: 1000,
    stock: 50,
    image: 'https://placehold.co/300x200',
    active: true,
  },
];

export default function AdminRewards() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAddReward, setShowAddReward] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRewards = mockRewards.filter((reward) => {
    const matchesCategory = selectedCategory === 'all' || reward.category === selectedCategory;
    const matchesSearch = reward.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         reward.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Gestion des récompenses
          </h1>
          <button
            type="button"
            onClick={() => setShowAddReward(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Ajouter une récompense
          </button>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <input
              type="text"
              className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Rechercher une récompense..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex space-x-4">
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">Toutes les catégories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Liste des récompenses */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRewards.map((reward) => (
          <div key={reward.id} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={reward.image}
                alt={reward.name}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{reward.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{reward.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    className="text-red-600 hover:text-red-900"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-indigo-600">
                  {reward.points} points
                </span>
                <span className="text-sm text-gray-500">
                  Stock: {reward.stock}
                </span>
              </div>
              <div className="mt-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  reward.active
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {reward.active ? 'Actif' : 'Inactif'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal d'ajout de récompense */}
      {showAddReward && (
        <div className="fixed inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="mt-3 text-center sm:mt-5">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Ajouter une nouvelle récompense
                </h3>
              </div>
              <form className="mt-6 space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nom
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
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
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Catégorie
                  </label>
                  <select
                    id="category"
                    name="category"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="points" className="block text-sm font-medium text-gray-700">
                    Points requis
                  </label>
                  <input
                    type="number"
                    name="points"
                    id="points"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                    Stock disponible
                  </label>
                  <input
                    type="number"
                    name="stock"
                    id="stock"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </form>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                >
                  Ajouter
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => setShowAddReward(false)}
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