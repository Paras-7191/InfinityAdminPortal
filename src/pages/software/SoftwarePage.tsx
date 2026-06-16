import { useState, useEffect } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { Plus, Edit } from 'lucide-react';
import { getSoftware, createSoftware, updateSoftware } from '../../services/software';
import { DataTable } from '../../components/common/DataTable';
import Modal from '../../components/common/Modal';
import { PermissionGuard } from '../../components/PermissionGuard';
import SoftwareForm from '../../components/software/SoftwareForm';

export default function SoftwarePage() {
  const [software, setSoftware] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSoftware, setSelectedSoftware] = useState<any>(null);

  const fetchSoftware = async () => {
    try {
      const data = await getSoftware();
      setSoftware(data);
    } catch (error) {
      console.error('Failed to fetch software', error);
    }
  };

  useEffect(() => {
    fetchSoftware();
  }, []);

  const handleFormSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      if (selectedSoftware) {
        await updateSoftware(selectedSoftware.id, { status: data.status });
      } else {
        await createSoftware(data);
      }
      setIsModalOpen(false);
      fetchSoftware();
    } catch (error) {
      alert('Failed to save software');
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'software_name',
      header: 'Software Name',
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
          <PermissionGuard permission="SOFTWARE_UPDATE">
            <button 
              onClick={() => { setSelectedSoftware(row.original); setIsModalOpen(true); }}
              className="text-blue-600 hover:text-blue-800"
              title="Edit Software"
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Software Management</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage software inventory and availability</p>
        </div>
        <PermissionGuard permission="SOFTWARE_CREATE">
          <button
            onClick={() => { setSelectedSoftware(null); setIsModalOpen(true); }}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} className="mr-2" />
            Create Software
          </button>
        </PermissionGuard>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <DataTable columns={columns} data={software} searchPlaceholder="Search software..." />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedSoftware ? 'Edit Software' : 'Create Software'}
      >
        <SoftwareForm 
          initialData={selectedSoftware} 
          onSubmit={handleFormSubmit} 
          isLoading={isSubmitting} 
        />
      </Modal>
    </div>
  );
}
