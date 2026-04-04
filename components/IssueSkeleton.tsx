export default function IssueSkeleton() {
  return (
    <div className="p-4 bg-[#020617] rounded-xl border border-gray-800 animate-pulse">
      
      <div className="h-3 w-24 bg-gray-700 rounded mb-2"></div>

      <div className="h-4 w-full bg-gray-700 rounded mb-2"></div>
      <div className="h-4 w-3/4 bg-gray-700 rounded mb-3"></div>

      <div className="flex gap-2 mb-3">
        <div className="h-3 w-12 bg-gray-700 rounded"></div>
        <div className="h-3 w-10 bg-gray-700 rounded"></div>
      </div>

      <div className="h-3 w-16 bg-gray-700 rounded"></div>
    </div>
  );
}