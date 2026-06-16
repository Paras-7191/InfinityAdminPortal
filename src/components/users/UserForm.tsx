import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useEffect } from 'react';

const userSchema = z.object({
  full_name: z.string().min(1, 'Full name is required'),
  role: z.enum(['SUPER_ADMIN', 'ADMIN', 'AGENT']),
  admin_id: z.string().optional(),
  password: z.string().optional(),
  mobile_number: z.string().optional(),
  status: z.string().optional(),
});

type UserFormValues = z.infer<typeof userSchema>;

interface UserFormProps {
  initialData?: any;
  onSubmit: (data: UserFormValues) => void;
  isLoading?: boolean;
}

export default function UserForm({ initialData, onSubmit, isLoading }: UserFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: initialData || {
      role: 'ADMIN',
      status: 'ACTIVE',
    },
  });

  const selectedRole = watch('role');

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
        <input
          {...register('full_name')}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.full_name && <p className="mt-1 text-sm text-red-600">{errors.full_name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
        <select
          {...register('role')}
          disabled={!!initialData}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="SUPER_ADMIN">Super Admin</option>
          <option value="ADMIN">Admin</option>
          <option value="AGENT">Agent</option>
        </select>
      </div>

      {(selectedRole === 'ADMIN' || selectedRole === 'SUPER_ADMIN') && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Admin ID</label>
            <input
              {...register('admin_id')}
              disabled={!!initialData}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          {!initialData && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <input
                type="password"
                {...register('password')}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          )}
        </>
      )}

      {selectedRole === 'AGENT' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mobile Number</label>
          <input
            {...register('mobile_number')}
            disabled={!!initialData}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      )}

      {initialData && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
          <select
            {...register('status')}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="ACTIVE">Active</option>
            <option value="DISABLED">Disabled</option>
          </select>
        </div>
      )}

      <div className="pt-4 flex justify-end space-x-3">
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : initialData ? 'Update User' : 'Create User'}
        </button>
      </div>
    </form>
  );
}
