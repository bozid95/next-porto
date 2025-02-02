// components/LoadingSpinner.tsx
export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="spinner-border animate-spin border-4 rounded-full w-16 h-16 border-blue-500"></div>
      <p className="mt-4 text-white">Loading...</p>
    </div>
  );
}
