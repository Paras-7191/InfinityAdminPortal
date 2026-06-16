import { useState, useEffect } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { Plus, Edit, Trash2, Power } from 'lucide-react';
import { getUsers, deleteUser, forceLogout, createUser, updateUser } from '../../services/users';
import { DataTable } from '../../components/common/DataTable';
import Modal from '../../components/common/Modal';
import { PermissionGuard } from '../../components/PermissionGuard';
import UserForm from '../../components/users/UserForm';

export default function AdminsPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      const admins = data.filter((u: any) => u.role === 'ADMIN' || u.role === 'SUPER_ADMIN');
      setUsers(admins);
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleFormSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      if (selectedUser) {
        await updateUser(selectedUser.id, data);
      } else {
        await createUser(data);
      }
      setIsModalOpen(false);
      fetchUsers();
    } catch (error) {
      alert('Failed to save user');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (userId: string) => {
    if (window.confirm('Are you sure you want to disable/delete this user?')) {
      try {
        await deleteUser(userId);
        fetchUsers();
      } catch (error) {
        alert('Failed to delete user');
      }
    }
  };

  const handleForceLogout = async (userId: string) => {
    if (window.confirm('Force logout this user?')) {
      try {
        await forceLogout(userId);
        alert('User forced to logout');
      } catch (error) {
        alert('Failed to force logout');
      }
    }
  };

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'admin_id',
      header: 'Admin ID',
    },
    {
      accessorKey: 'full_name',
      header: 'Full Name',
    },
    {
      accessorKey: 'role',
      header: 'Role',
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
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <PermissionGuard permission="USER_UPDATE">
            <button 
              onClick={() => { setSelectedUser(row.original); setIsModalOpen(true); }}
              className="text-blue-600 hover:text-blue-800"
            >
              <Edit size={18} />
            </button>
          </PermissionGuard>
          <PermissionGuard permission="USER_UPDATE">
            <button 
              onClick={() => handleForceLogout(row.original.id)}
              className="text-orange-600 hover:text-orange-800"
              title="Force Logout"
            >
              <Power size={18} />
            </button>
          </PermissionGuard>
          <PermissionGuard permission="USER_DISABLE">
            <button 
              onClick={() => handleDelete(row.original.id)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 size={18} />
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Management</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage platform administrators and super admins</p>
        </div>
        <PermissionGuard permission="USER_CREATE">
          <button
            onClick={() => { setSelectedUser(null); setIsModalOpen(true); }}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} className="mr-2" />
            Create Admin
          </button>
        </PermissionGuard>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <DataTable columns={columns} data={users} searchPlaceholder="Search admins..." />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedUser ? 'Edit Admin' : 'Create Admin'}
      >
        <UserForm 
          initialData={selectedUser} 
          onSubmit={handleFormSubmit} 
          isLoading={isSubmitting} 
        />
      </Modal>
    </div>
  );
}
