import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: React.ComponentType<{ className?: string }>;
}

export default function StatCard({ title, value, change, changeType, icon: Icon }: StatCardProps) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">
                  {value}
                </div>
                <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                  changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {changeType === 'increase' ? (
                    <ArrowUpIcon className="self-center flex-shrink-0 h-4 w-4 text-green-500" aria-hidden="true" />
                  ) : (
                    <ArrowDownIcon className="self-center flex-shrink-0 h-4 w-4 text-red-500" aria-hidden="true" />
                  )}
                  <span className="ml-1">{change}</span>
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}