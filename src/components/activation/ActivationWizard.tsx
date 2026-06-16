import { useState, useEffect } from 'react';
import { getClients } from '../../services/clients';
import { getSoftware } from '../../services/software';
import { createActivationRequest, verifyActivation } from '../../services/activation';
import { Shield, CheckCircle, AlertCircle } from 'lucide-react';

interface ActivationWizardProps {
  initialClientId?: string;
  onSuccess?: () => void;
}

export default function ActivationWizard({ initialClientId, onSuccess }: ActivationWizardProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [clients, setClients] = useState<any[]>([]);
  const [software, setSoftware] = useState<any[]>([]);
  const [selectedClientId, setSelectedClientId] = useState(initialClientId || '');
  const [selectedSoftwareId, setSelectedSoftwareId] = useState('');
  const [requestId, setRequestId] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientsData, softwareData] = await Promise.all([
          getClients(),
          getSoftware()
        ]);
        setClients(clientsData);
        setSoftware(softwareData.filter((s: any) => s.status === 'ACTIVE'));
      } catch (err) {
        console.error('Failed to fetch wizard data', err);
      }
    };
    fetchData();
  }, []);

  const handleCreateRequest = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await createActivationRequest(selectedClientId, selectedSoftwareId);
      setRequestId(response.request_id);
      setStep(2);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create activation request');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await verifyActivation(requestId, otp);
      setStep(3);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Stepper */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
              step === s ? 'bg-blue-600 text-white' : 
              step > s ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {step > s ? <CheckCircle size={16} /> : s}
            </div>
            {s < 3 && <div className={`flex-1 h-1 mx-2 ${step > s ? 'bg-green-500' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md flex items-start text-sm">
          <AlertCircle size={18} className="mr-2 mt-0.5" />
          {error}
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Target Client</label>
            <select
              value={selectedClientId}
              onChange={(e) => setSelectedClientId(e.target.value)}
              disabled={!!initialClientId}
              className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select a client...</option>
              {clients.map(c => <option key={c.id} value={c.id}>{c.client_name} ({c.hwid})</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Software Package</label>
            <select
              value={selectedSoftwareId}
              onChange={(e) => setSelectedSoftwareId(e.target.value)}
              className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select software...</option>
              {software.map(s => <option key={s.id} value={s.id}>{s.software_name}</option>)}
            </select>
          </div>
          <button
            onClick={handleCreateRequest}
            disabled={!selectedClientId || !selectedSoftwareId || isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoading ? 'Requesting...' : 'Request Activation'}
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4 text-center">
          <Shield size={48} className="mx-auto text-blue-500 mb-2" />
          <h4 className="text-lg font-medium text-gray-900 dark:text-white">Verify Activation</h4>
          <p className="text-sm text-gray-500">Enter the verification code sent to the client/agent.</p>
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="block w-full text-center text-2xl tracking-widest rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="000000"
          />
          <button
            onClick={handleVerify}
            disabled={otp.length !== 6 || isLoading}
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Verifying...' : 'Complete Activation'}
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="text-center space-y-4 py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h4 className="text-xl font-bold text-gray-900 dark:text-white">Success!</h4>
          <p className="text-gray-500">The software has been successfully activated for this client.</p>
          <button
            onClick={onSuccess}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Finish
          </button>
        </div>
      )}
    </div>
  );
}
