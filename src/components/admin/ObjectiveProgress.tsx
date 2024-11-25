import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { TeamSummary } from '../../store/adminStore';

interface ObjectiveProgressProps {
  objectives: TeamSummary['objectivesProgress'];
}

export default function ObjectiveProgress({ objectives }: ObjectiveProgressProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        Progression des objectifs
      </h2>
      <div className="space-y-4">
        {objectives.map((objective) => (
          <div key={objective.objectiveId} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-900">
                {objective.title}
              </h3>
              <span className="text-sm text-gray-500">
                Échéance : {format(new Date(objective.deadline), 'dd MMM yyyy', { locale: fr })}
              </span>
            </div>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block text-indigo-600">
                    {objective.progress}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                <div
                  style={{ width: `${objective.progress}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}