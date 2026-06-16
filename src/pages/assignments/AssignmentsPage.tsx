import { useState, useEffect } from 'react';
import { getUsers } from '../../services/users';
import { getClients } from '../../services/clients';
import { getSoftware } from '../../services/software';
import { assignClient, unassignClient, assignSoftware, unassignSoftware, getClientAssignments, getSoftwareAssignments } from '../../services/assignments';

import { UserRound, Monitor, Cpu, Plus, Trash2 } from 'lucide-react';

export default function AssignmentsPage() {
  const [agents, setAgents] = useState<Record<string, any>[]>([]);
  const [clients, setClients] = useState<Record<string, any>[]>([]);
  const [software, setSoftware] = useState<Record<string, any>[]>([]);
  const [selectedAgentId, setSelectedAgentId] = useState<string>('');
  const [clientAssignments, setClientAssignments] = useState<Record<string, any>[]>([]);
  const [softwareAssignments, setSoftwareAssignments] = useState<Record<string, any>[]>([]); 
  const [isLoading, setIsLoading] = useState(true);
  const loadAssignments = async () => {
    const [clientAssignmentsData, softwareAssignmentsData] = await Promise.all([
      getClientAssignments(),
      getSoftwareAssignments()
    ]);

    setClientAssignments(clientAssignmentsData);
    setSoftwareAssignments(softwareAssignmentsData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          usersData,
          clientsData,
          softwareData
        ] = await Promise.all([
          getUsers(),
          getClients(),
          getSoftware()
        ]);
        setAgents(usersData.filter((u: Record<string, any>) => u.role === 'AGENT'));
        setClients(clientsData);
        setSoftware(softwareData);
        await loadAssignments();
      } catch (error) {
        console.error('Failed to fetch data', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAssignClient = async (clientId: string) => {
    try {
      await assignClient(selectedAgentId, clientId);
      await loadAssignments();
      alert('Client assigned');
    } catch (error) {
      alert('Failed to assign client');
    }
  };

  const handleUnassignClient = async (clientId: string) => {
    try {
      await unassignClient(selectedAgentId, clientId);
      await loadAssignments();
      alert('Client unassigned');
    } catch (error) {
      alert('Failed to unassign client');
    }
  };

  const handleAssignSoftware = async (softwareId: string) => {
    try {
      await assignSoftware(selectedAgentId, softwareId);
      await loadAssignments();
      alert('Software assigned');
    } catch (error) {
      alert('Failed to assign software');
    }
  };

  const handleUnassignSoftware = async (softwareId: string) => {
    try {
      await unassignSoftware(selectedAgentId, softwareId);
      await loadAssignments();
      alert('Software unassigned');
    } catch (error) {
      alert('Failed to unassign software');
    }
  };

  const isClientAssigned = (clientId: string) =>
    clientAssignments.some(
      assignment =>
        assignment.agent_id === selectedAgentId &&
        assignment.client_id === clientId
    );

  const isSoftwareAssigned = (softwareId: string) =>
    softwareAssignments.some(
      assignment =>
        assignment.agent_id === selectedAgentId &&
        assignment.software_id === softwareId
    );

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Assignment Management</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Distribute clients and software to agents</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <div className="max-w-xs">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Agent</label>
          <div className="relative">
            <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <select
              value={selectedAgentId}
              onChange={(e) => setSelectedAgentId(e.target.value)}
              className="pl-10 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Choose an agent...</option>
              {agents.map(agent => (
                <option key={agent.id} value={agent.id}>{agent.full_name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {selectedAgentId ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Client Assignment Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
              <h3 className="flex items-center font-semibold text-gray-900 dark:text-white">
                <Monitor className="mr-2" size={20} />
                Client Assignments
              </h3>
            </div>
            <div className="p-6 flex-1 space-y-4 overflow-y-auto max-h-[500px]">
              {clients.map(client => (
                <div key={client.id} className="flex items-center justify-between p-3 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{client.client_name}</p>
                    <p className="text-xs text-gray-500 font-mono">{client.hwid}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleAssignClient(client.id)}
                      disabled={isClientAssigned(client.id)}
                      className="p-1 text-green-600 hover:bg-green-50 rounded disabled:opacity-40"
                      title="Assign"
                    >
                      <Plus size={20} />
                    </button>
                    <button
                      onClick={() => handleUnassignClient(client.id)}
                      disabled={!isClientAssigned(client.id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded disabled:opacity-40"
                      title="Unassign"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Software Assignment Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
              <h3 className="flex items-center font-semibold text-gray-900 dark:text-white">
                <Cpu className="mr-2" size={20} />
                Software Assignments
              </h3>
            </div>
            <div className="p-6 flex-1 space-y-4 overflow-y-auto max-h-[500px]">
              {software.map(sw => (
                <div key={sw.id} className="flex items-center justify-between p-3 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{sw.software_name}</p>
                    <span className="text-xs text-green-600 font-semibold">{sw.status}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleAssignSoftware(sw.id)}
                      disabled={isSoftwareAssigned(sw.id)}
                      className="p-1 text-green-600 hover:bg-green-50 rounded disabled:opacity-40"
                      title="Assign"
                    >
                      <Plus size={20} />
                    </button>
                    <button
                      onClick={() => handleUnassignSoftware(sw.id)}
                      disabled={!isSoftwareAssigned(sw.id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded disabled:opacity-40"
                      title="Unassign"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 p-8 text-center rounded-lg">
          <UserRound size={48} className="mx-auto text-blue-400 mb-4" />
          <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300">No agent selected</h3>
          <p className="text-blue-600 dark:text-blue-400 mt-2">Select an agent from the dropdown to manage their assignments.</p>
        </div>
      )}
    </div>
  );
}
