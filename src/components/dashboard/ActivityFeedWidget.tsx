import { useDashboardStore } from '../../stores/useDashboardStore';
import { usePolling } from '../../hooks/usePolling';

export default function ActivityFeedWidget() {
  const { liveActivity, fetchLiveActivity } = useDashboardStore();

  usePolling(fetchLiveActivity, 10000);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col h-full">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Live Activity</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        {liveActivity.length === 0 ? (
          <div className="text-center text-gray-500 py-8">No recent activity</div>
        ) : (
          <div className="flow-root">
            <ul className="-mb-8">
              {liveActivity.map((activity, idx) => (
                <li key={idx}>
                  <div className="relative pb-8">
                    {idx !== liveActivity.length - 1 && (
                      <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700" aria-hidden="true" />
                    )}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white dark:ring-gray-800 text-white text-xs font-bold">
                          {activity.type?.[0] || 'A'}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-gray-800 dark:text-gray-200">{activity.message}</p>
                        </div>
                        <div className="text-right text-xs whitespace-nowrap text-gray-500 dark:text-gray-400">
                          <time>{activity.timestamp}</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
