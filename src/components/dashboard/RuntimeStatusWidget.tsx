import { useDashboardStore } from '../../stores/useDashboardStore';
import { usePolling } from '../../hooks/usePolling';

export default function RuntimeStatusWidget() {
  const { runtimeStatus, fetchRuntimeStatus } = useDashboardStore();

  usePolling(fetchRuntimeStatus, 15000);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {runtimeStatus.map((runtime: any) => (
        <div key={runtime.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{runtime.name}</p>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1">{runtime.status}</h3>
            </div>
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
              runtime.status === 'ONLINE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {runtime.status}
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500 dark:text-gray-400">CPU Usage</span>
              <span className="text-gray-900 dark:text-white font-medium">{runtime.cpu}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
              <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${runtime.cpu}%` }}></div>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500 dark:text-gray-400">Memory</span>
              <span className="text-gray-900 dark:text-white font-medium">{runtime.memory}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
              <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${runtime.memory}%` }}></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
