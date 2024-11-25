import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { 
  ChartBarIcon, 
  TrophyIcon, 
  UserGroupIcon, 
  ClockIcon 
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

// Types pour les données simulées
interface Activity {
  id: string;
  type: 'reward' | 'recognition' | 'challenge';
  title: string;
  description: string;
  points: number;
  date: Date;
}

interface Goal {
  id: string;
  title: string;
  current: number;
  target: number;
  deadline: Date;
}

export default function Dashboard() {
  const { user } = useAuthStore();
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');

  // Données simulées
  const activities: Activity[] = [
    {
      id: '1',
      type: 'reward',
      title: 'Bon d\'achat Amazon',
      description: 'Échange de points contre un bon d\'achat',
      points: -500,
      date: new Date(2024, 0, 15),
    },
    {
      id: '2',
      type: 'recognition',
      title: 'Excellence projet',
      description: 'Reconnaissance de Marie pour le projet client',
      points: 100,
      date: new Date(2024, 0, 14),
    },
    {
      id: '3',
      type: 'challenge',
      title: 'Challenge mensuel',
      description: 'Objectif de vente atteint',
      points: 250,
      date: new Date(2024, 0, 10),
    },
  ];

  const goals: Goal[] = [
    {
      id: '1',
      title: 'Objectif trimestriel',
      current: 75,
      target: 100,
      deadline: new Date(2024, 2, 31),
    },
    {
      id: '2',
      title: 'Formation continue',
      current: 3,
      target: 5,
      deadline: new Date(2024, 5, 30),
    },
  ];

  const stats = [
    {
      name: 'Points disponibles',
      value: '1,234',
      icon: ChartBarIcon,
      change: '+12%',
      changeType: 'increase',
    },
    {
      name: 'Récompenses obtenues',
      value: '12',
      icon: TrophyIcon,
      change: '+3',
      changeType: 'increase',
    },
    {
      name: 'Reconnaissances reçues',
      value: '25',
      icon: UserGroupIcon,
      change: '+5',
      changeType: 'increase',
    },
    {
      name: 'Temps moyen de réponse',
      value: '24h',
      icon: ClockIcon,
      change: '-10%',
      changeType: 'decrease',
    },
  ];

  return (
    <div className="space-y-6">
      {/* En-tête avec message de bienvenue */}
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Bonjour, {user?.name} 👋
        </h1>
        <p className="mt-1 text-gray-500">
          Voici un aperçu de vos récompenses et activités
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                  <p className={`ml-2 text-sm font-medium ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Objectifs */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Objectifs en cours</h2>
        <div className="space-y-4">
          {goals.map((goal) => (
            <div key={goal.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-900">{goal.title}</h3>
                <span className="text-sm text-gray-500">
                  Échéance : {format(goal.deadline, 'dd MMM yyyy', { locale: fr })}
                </span>
              </div>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block text-indigo-600">
                      {Math.round((goal.current / goal.target) * 100)}%
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-gray-600">
                      {goal.current}/{goal.target}
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                  <div
                    style={{ width: `${(goal.current / goal.target) * 100}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activités récentes */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Activités récentes</h2>
          <div className="flex space-x-2">
            {['week', 'month', 'year'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period as typeof selectedPeriod)}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  selectedPeriod === period
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                {period === 'week' ? 'Semaine' : period === 'month' ? 'Mois' : 'Année'}
              </button>
            ))}
          </div>
        </div>
        <div className="flow-root">
          <ul className="-mb-8">
            {activities.map((activity, activityIdx) => (
              <li key={activity.id}>
                <div className="relative pb-8">
                  {activityIdx !== activities.length - 1 ? (
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative flex space-x-3">
                    <div>
                      <span
                        className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                          activity.type === 'reward'
                            ? 'bg-yellow-500'
                            : activity.type === 'recognition'
                            ? 'bg-green-500'
                            : 'bg-indigo-500'
                        }`}
                      >
                        {activity.type === 'reward' ? (
                          <TrophyIcon className="h-5 w-5 text-white" />
                        ) : activity.type === 'recognition' ? (
                          <UserGroupIcon className="h-5 w-5 text-white" />
                        ) : (
                          <ChartBarIcon className="h-5 w-5 text-white" />
                        )}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900">
                        {activity.title}
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        {activity.description}
                      </p>
                      <div className="mt-2 flex items-center space-x-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <ClockIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                          {format(activity.date, 'dd MMM yyyy', { locale: fr })}
                        </div>
                        <div
                          className={`text-sm font-medium ${
                            activity.points >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {activity.points >= 0 ? '+' : ''}{activity.points} points
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}