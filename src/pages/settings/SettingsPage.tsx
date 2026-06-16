import { useState, useEffect } from 'react';
import { getSettings, updateSetting } from '../../services/settings';
import { Save, Info } from 'lucide-react';
import { PermissionGuard } from '../../components/PermissionGuard';

export default function SettingsPage() {
  const [settings, setSettings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getSettings();
        setSettings(data);
      } catch (error) {
        console.error('Failed to fetch settings', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleUpdate = async (key: string, newValue: string) => {
    setIsSaving(key);
    try {
      await updateSetting(key, newValue);
      // Refresh settings
      const data = await getSettings();
      setSettings(data);
    } catch (error) {
      alert('Failed to update setting');
    } finally {
      setIsSaving(null);
    }
  };

  if (isLoading) return <div>Loading settings...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">System Settings</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Configure global platform parameters</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
        {settings.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No settings available</div>
        ) : (
          settings.map((setting) => (
            <div key={setting.key} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                    {setting.key.replace(/_/g, ' ')}
                  </h4>
                  <div className="ml-2 group relative">
                    <Info size={14} className="text-gray-400 cursor-help" />
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-lg z-10">
                      {setting.description || 'System configuration parameter'}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-mono">{setting.key}</p>
              </div>

              <div className="flex items-center space-x-3 w-full md:w-auto">
                <input
                  type="text"
                  defaultValue={setting.value}
                  onBlur={(e) => {
                    if (e.target.value !== setting.value) {
                      handleUpdate(setting.key, e.target.value);
                    }
                  }}
                  className="flex-1 md:w-64 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                />
                <PermissionGuard permission="SETTINGS_UPDATE">
                  <button
                    disabled={isSaving === setting.key}
                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors disabled:opacity-50"
                  >
                    {isSaving === setting.key ? (
                      <div className="h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Save size={20} />
                    )}
                  </button>
                </PermissionGuard>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 p-4 rounded-md flex items-start">
        <Info className="text-yellow-600 mr-3 mt-0.5" size={18} />
        <p className="text-xs text-yellow-800 dark:text-yellow-300">
          Changes to system settings may take a few minutes to propagate across all runtimes. 
          Use caution when modifying core security parameters.
        </p>
      </div>
    </div>
  );
}
