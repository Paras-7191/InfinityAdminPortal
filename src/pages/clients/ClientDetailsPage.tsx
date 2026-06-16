import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Shield } from 'lucide-react';
import { getClientDetails } from '../../services/clients';
import { PermissionGuard } from '../../components/PermissionGuard';
import Modal from '../../components/common/Modal';
import ActivationWizard from '../../components/activation/ActivationWizard';

export default function ClientDetailsPage() {
  const { clientId } = useParams<{ clientId: string }>();
  const [client, setClient] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isActivationModalOpen, setIsActivationModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      if (!clientId) return;
      try {
        const data = await getClientDetails(clientId);
        setClient(data);
      } catch (error) {
        console.error('Failed to fetch client details', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [clientId]);

  if (isLoading) return <div>Loading details...</div>;
  if (!client) return <div>Client not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/clients')}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{client.client_name}</h2>
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
          client.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {client.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Client Information</h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Client ID</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white font-mono">{client.id}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">HWID</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white font-mono">{client.hwid}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Created At</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">{client.created_at}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Active</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">{client.last_active || 'Never'}</dd>
              </div>
            </dl>
            <div className="mt-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Notes</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 p-3 rounded">
                {client.notes || 'No notes available'}
              </dd>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
            <div className="text-center text-gray-500 py-8">No recent activity recorded for this client</div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <PermissionGuard permission="CLIENT_UPDATE">
                <button className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  <Edit size={18} className="mr-2" />
                  Edit Client
                </button>
              </PermissionGuard>
              <PermissionGuard permission="ACTIVATION_CREATE">
                <button 
                  onClick={() => setIsActivationModalOpen(true)}
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Shield size={18} className="mr-2" />
                  Manual Activation
                </button>
              </PermissionGuard>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Assigned Agents</h3>
            <div className="text-center text-gray-500 py-4">No agents assigned</div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isActivationModalOpen}
        onClose={() => setIsActivationModalOpen(false)}
        title="Software Activation Wizard"
      >
        <ActivationWizard 
          initialClientId={clientId} 
          onSuccess={() => setIsActivationModalOpen(false)} 
        />
      </Modal>
    </div>
  );
}
