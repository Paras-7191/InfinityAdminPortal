import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { verifyOtp } from '../../services/auth';
import { useAuthStore } from '../../stores/useAuthStore';

const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

type OtpFormValues = z.infer<typeof otpSchema>;

export default function VerifyOtpPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const setSession = useAuthStore((state) => state.setSession);

  const userId = location.state?.user_id;

  useEffect(() => {
    if (!userId) {
      navigate('/login');
    }
  }, [userId, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
  });

  const onSubmit = async (data: OtpFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await verifyOtp(userId, data.otp);
      setSession({
        token: response.token,
        user: response.user,
        permissions: response.permissions,
      });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'OTP verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-2">
          Verify OTP
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          Enter the 6-digit code sent to your device
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">OTP Code</label>
            <input
              {...register('otp')}
              placeholder="000000"
              className="mt-1 block w-full text-center text-2xl tracking-widest rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.otp && (
              <p className="mt-1 text-sm text-red-600 text-center">{errors.otp.message}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoading ? 'Verifying...' : 'Verify'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/login')}
            className="text-sm text-blue-600 hover:text-blue-500 font-medium"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
