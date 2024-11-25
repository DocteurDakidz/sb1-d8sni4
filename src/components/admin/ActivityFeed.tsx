import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Activity } from '../../store/adminStore';

interface ActivityFeedProps {
  activities: Activity[];
}

export default function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        Activités récentes
      </h2>
      <div className="flow-root">
        <ul className="-mb-8">
          {activities.map((activity, index) => (
            <li key={index}>
              <div className="relative pb-8">
                {index !== activities.length - 1 ? (
                  <span
                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span
                      className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                        activity.type === 'Reward'
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      }`}
                    >
                      {activity.type === 'Reward' ? '🎁' : '🌟'}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm text-gray-500">
                      <span className="font-medium text-gray-900">
                        {activity.details}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      <span>{format(new Date(activity.date), 'PPP', { locale: fr })}</span>
                      <span className={`ml-2 font-medium ${
                        activity.points >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {activity.points >= 0 ? '+' : ''}{activity.points} points
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}