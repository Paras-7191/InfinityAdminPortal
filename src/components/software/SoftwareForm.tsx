import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useEffect } from 'react';

const softwareSchema = z.object({
  software_name: z.string().min(1, 'Software name is required'),
  status: z.enum(['ACTIVE', 'DISABLED']),
});

type SoftwareFormValues = z.infer<typeof softwareSchema>;

interface SoftwareFormProps {
  initialData?: any;
  onSubmit: (data: SoftwareFormValues) => void;
  isLoading?: boolean;
}

export default function SoftwareForm({ initialData, onSubmit, isLoading }: SoftwareFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SoftwareFormValues>({
    resolver: zodResolver(softwareSchema),
    defaultValues: initialData || {
      status: 'ACTIVE',
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Software Name</label>
        <input
          {...register('software_name')}
          disabled={!!initialData}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.software_name && <p className="mt-1 text-sm text-red-600">{errors.software_name.message}</p>}
      </div>

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

      <div className="pt-4 flex justify-end space-x-3">
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : initialData ? 'Update Software' : 'Create Software'}
        </button>
      </div>
    </form>
  );
}
