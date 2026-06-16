import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { loginAdmin, loginAgent } from '../../services/auth';

const adminSchema = z.object({
  admin_id: z.string().min(1, 'Admin ID is required'),
  password: z.string().min(1, 'Password is required'),
});

const agentSchema = z.object({
  mobile_number: z.string().min(1, 'Mobile number is required'),
});

type AdminFormValues = z.infer<typeof adminSchema>;
type AgentFormValues = z.infer<typeof agentSchema>;

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<'admin' | 'agent'>('admin');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const adminForm = useForm<AdminFormValues>({
    resolver: zodResolver(adminSchema),
  });

  const agentForm = useForm<AgentFormValues>({
    resolver: zodResolver(agentSchema),
  });

  const onAdminSubmit = async (data: AdminFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await loginAdmin(data.admin_id, data.password);
      navigate('/verify-otp', { state: { user_id: response.user_id } });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const onAgentSubmit = async (data: AgentFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      await loginAgent(data.mobile_number);
      navigate('/verify-otp', { state: { user_id: data.mobile_number } });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">
          WinLicense Admin Portal
        </h2>

        <div className="flex mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            className={`flex-1 py-2 text-center font-medium ${
              activeTab === 'admin'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('admin')}
          >
            Admin
          </button>
          <button
            className={`flex-1 py-2 text-center font-medium ${
              activeTab === 'agent'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('agent')}
          >
            Agent
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {activeTab === 'admin' ? (
          <form onSubmit={adminForm.handleSubmit(onAdminSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Admin ID</label>
              <input
                {...adminForm.register('admin_id')}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {adminForm.formState.errors.admin_id && (
                <p className="mt-1 text-sm text-red-600">{adminForm.formState.errors.admin_id.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <input
                type="password"
                {...adminForm.register('password')}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {adminForm.formState.errors.password && (
                <p className="mt-1 text-sm text-red-600">{adminForm.formState.errors.password.message}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : 'Login'}
            </button>
          </form>
        ) : (
          <form onSubmit={agentForm.handleSubmit(onAgentSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mobile Number</label>
              <input
                {...agentForm.register('mobile_number')}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {agentForm.formState.errors.mobile_number && (
                <p className="mt-1 text-sm text-red-600">{agentForm.formState.errors.mobile_number.message}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : 'Login'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
