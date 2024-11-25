import { useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { 
  PaperAirplaneIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

export default function Recognition() {
  const [message, setMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [points, setPoints] = useState(50);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle recognition submission
    console.log({ message, selectedUser, points });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Envoyer une reconnaissance
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="user" className="block text-sm font-medium text-gray-700">
              Destinataire
            </label>
            <select
              id="user"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Sélectionner un collègue</option>
              <option value="1">Marie Dupont</option>
              <option value="2">Pierre Martin</option>
              <option value="3">Sophie Bernard</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message de reconnaissance
            </label>
            <textarea
              id="message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Écrivez votre message de reconnaissance..."
            />
          </div>

          <div>
            <label htmlFor="points" className="block text-sm font-medium text-gray-700">
              Points à attribuer
            </label>
            <input
              type="number"
              id="points"
              min="10"
              max="100"
              step="10"
              value={points}
              onChange={(e) => setPoints(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PaperAirplaneIcon className="h-5 w-5 mr-2" />
              Envoyer la reconnaissance
            </button>
          </div>
        </form>
      </div>

      {/* Feed des reconnaissances */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Reconnaissances récentes
        </h2>
        
        <div className="space-y-6">
          {[1, 2, 3].map((recognition) => (
            <div key={recognition} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-4">
                  <img
                    src={`https://ui-avatars.com/api/?name=User+${recognition}&background=random`}
                    alt=""
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      Marie Dupont → Pierre Martin
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Excellent travail sur le projet client ! Merci pour ton implication.
                    </p>
                    <div className="mt-2 text-sm text-gray-500">
                      {format(new Date(), 'PPP', { locale: fr })} • 50 points
                    </div>
                  </div>
                </div>
                <button className="flex items-center text-gray-400 hover:text-red-500">
                  <HeartIcon className="h-5 w-5" />
                  <span className="ml-1 text-sm">12</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}