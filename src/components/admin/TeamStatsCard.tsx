import { ChartBarIcon, UserGroupIcon, TrophyIcon } from '@heroicons/react/24/outline';
import { TeamSummary } from '../../store/adminStore';

interface TeamStatsCardProps {
  summary: TeamSummary;
}

export default function TeamStatsCard({ summary }: TeamStatsCardProps) {
  const stats = [
    {
      name: 'Points totaux',
      value: summary.totalPoints.toLocaleString(),
      icon: ChartBarIcon,
    },
    {
      name: 'Reconnaissances envoyées',
      value: summary.recognitionsSent.toString(),
      icon: UserGroupIcon,
    },
    {
      name: 'Reconnaissances reçues',
      value: summary.recognitionsReceived.toString(),
      icon: TrophyIcon,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
      {stats.map((stat) => (
        <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {stat.name}
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}