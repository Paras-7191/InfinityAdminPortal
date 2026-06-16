import { useState, useEffect } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { Plus, Edit, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getClients, createClient, updateClient } from '../../services/clients';
import { DataTable } from '../../components/common/DataTable';
import Modal from '../../components/common/Modal';
import { PermissionGuard } from '../../components/PermissionGuard';
import ClientForm from '../../components/clients/ClientForm';

export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const navigate = useNavigate();

  const fetchClients = async () => {
    try {
      const data = await getClients();
      setClients(data);
    } catch (error) {
      console.error('Failed to fetch clients', error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleFormSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      if (selectedClient) {
        await updateClient(selectedClient.id, data);
      } else {
        await createClient(data);
      }
      setIsModalOpen(false);
      fetchClients();
    } catch (error) {
      alert('Failed to save client');
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'client_name',
      header: 'Client Name',
    },
    {
      accessorKey: 'hwid',
      header: 'HWID',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
          row.original.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {row.original.status}
        </span>
      ),
    },
    {
      accessorKey: 'created_at',
      header: 'Created At',
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => navigate(`/clients/${row.original.id}`)}
            className="text-gray-600 hover:text-gray-800"
            title="View Details"
          >
            <Eye size={18} />
          </button>
          <PermissionGuard permission="CLIENT_UPDATE">
            <button 
              onClick={() => { setSelectedClient(row.original); setIsModalOpen(true); }}
              className="text-blue-600 hover:text-blue-800"
              title="Edit Client"
            >
              <Edit size={18} />
            </button>
          </PermissionGuard>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Client Management</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage clients and HWID registrations</p>
        </div>
        <PermissionGuard permission="CLIENT_CREATE">
          <button
            onClick={() => { setSelectedClient(null); setIsModalOpen(true); }}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} className="mr-2" />
            Create Client
          </button>
        </PermissionGuard>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <DataTable columns={columns} data={clients} searchPlaceholder="Search clients..." />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedClient ? 'Edit Client' : 'Create Client'}
      >
        <ClientForm 
          initialData={selectedClient} 
          onSubmit={handleFormSubmit} 
          isLoading={isSubmitting} 
        />
      </Modal>
    </div>
  );
}
