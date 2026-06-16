interface Column {
  header: string;
  accessor: string;
}

interface QueueWidgetProps {
  title: string;
  data: any[];
  columns: Column[];
  isLoading?: boolean;
}

export default function QueueWidget({ title, data, columns, isLoading }: QueueWidgetProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col h-full">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        {isLoading && <span className="text-xs text-gray-500 animate-pulse">Refreshing...</span>}
      </div>
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 uppercase text-xs">
            <tr>
              {columns.map((col) => (
                <th key={col.accessor} className="px-6 py-3 font-medium">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-8 text-center text-gray-500">
                  No records found
                </td>
              </tr>
            ) : (
              data.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                  {columns.map((col) => (
                    <td key={col.accessor} className="px-6 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">
                      {item[col.accessor] || '-'}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
