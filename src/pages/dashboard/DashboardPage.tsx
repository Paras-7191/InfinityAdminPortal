import { useDashboardStore } from '../../stores/useDashboardStore';
import { usePolling } from '../../hooks/usePolling';
import RuntimeStatusWidget from '../../components/dashboard/RuntimeStatusWidget';
import QueueWidget from '../../components/dashboard/QueueWidget';
import ActivityFeedWidget from '../../components/dashboard/ActivityFeedWidget';

export default function DashboardPage() {
  const { 
    otpQueue, 
    fetchOtpQueue, 
    activationQueue, 
    fetchActivationQueue,
    systemLogs,
    fetchSystemLogs
  } = useDashboardStore();

  usePolling(fetchOtpQueue, 5000);
  usePolling(fetchActivationQueue, 5000);
  usePolling(fetchSystemLogs, 10000);

  const otpColumns = [
    { header: 'Type', accessor: 'otp_type' },
    { header: 'User ID', accessor: 'user_id' },
    { header: 'Status', accessor: 'status' },
    { header: 'Requested At', accessor: 'requested_at' },
  ];

  const activationColumns = [
    { header: 'Request ID', accessor: 'request_id' },
    { header: 'Client', accessor: 'client_name' },
    { header: 'Software', accessor: 'software_name' },
    { header: 'Status', accessor: 'status' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Runtime Status</h2>
        <div className="mt-4">
          <RuntimeStatusWidget />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-[400px]">
        <QueueWidget 
          title="OTP Queue" 
          data={otpQueue} 
          columns={otpColumns} 
        />
        <QueueWidget 
          title="Activation Queue" 
          data={activationQueue} 
          columns={activationColumns} 
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-[500px]">
        <ActivityFeedWidget />
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col h-full">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Logs</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {systemLogs.length === 0 ? (
              <div className="text-center text-gray-500 py-8">No recent logs</div>
            ) : (
              systemLogs.slice(0, 10).map((log, idx) => (
                <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded border-l-4 border-blue-500">
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                    <span>{log.event}</span>
                    <span>{log.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-800 dark:text-gray-200">{log.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
