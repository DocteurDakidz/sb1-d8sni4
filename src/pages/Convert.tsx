import { useState } from 'react';

export default function Convert() {
  const [points, setPoints] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('EUR');
  const conversionRates = {
    EUR: 0.01,
    USD: 0.012,
    GBP: 0.009
  };

  const calculateConversion = () => {
    const numPoints = parseFloat(points);
    if (isNaN(numPoints)) return 0;
    return (numPoints * conversionRates[selectedCurrency as keyof typeof conversionRates]).toFixed(2);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Convertir vos Points</h2>
        
        <div className="max-w-xl mx-auto space-y-8">
          <div className="bg-indigo-50 p-4 rounded-lg text-center">
            <h3 className="text-lg font-medium text-indigo-900">Solde de Points Disponible</h3>
            <p className="text-3xl font-bold text-indigo-600">1,234</p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="points" className="block text-sm font-medium text-gray-700 mb-1">
                Points à convertir
              </label>
              <input
                type="number"
                id="points"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Entrez le nombre de points"
                min="0"
                max="1234"
              />
            </div>

            <div>
              <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
                Devise de conversion
              </label>
              <select
                id="currency"
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="EUR">Euro (EUR)</option>
                <option value="USD">Dollar US (USD)</option>
                <option value="GBP">Livre Sterling (GBP)</option>
              </select>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mt-4">
              <div className="text-center">
                <h4 className="text-sm font-medium text-gray-700">Montant estimé</h4>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {calculateConversion()} {selectedCurrency}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Taux de conversion: 1 point = {conversionRates[selectedCurrency as keyof typeof conversionRates]} {selectedCurrency}
                </p>
              </div>
            </div>

            <button
              type="button"
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => alert('Conversion confirmée !')}
            >
              Confirmer la Conversion
            </button>
          </div>

          <div className="text-sm text-gray-500">
            <h4 className="font-medium text-gray-700 mb-2">Conditions de conversion :</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Minimum de conversion : 100 points</li>
              <li>Les conversions sont définitives et ne peuvent pas être annulées</li>
              <li>Le montant converti sera transféré dans les 3-5 jours ouvrés</li>
              <li>Les taux de conversion sont mis à jour quotidiennement</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}