export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-gray-500 dark:text-gray-400 font-medium">Loading data...</p>
    </div>
  );
}
