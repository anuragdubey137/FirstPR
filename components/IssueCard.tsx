export default function IssueCard({ issue }: any) {
  return (
    <div className="p-4 bg-[#020617] rounded-xl border border-gray-800 hover:border-gray-600 transition">
      
      {/* Repo */}
      <p className="text-xs text-gray-400 mb-1">
        {issue.repository_url.split("/").slice(-2).join("/")}
      </p>

      {/* Title */}
      <h3 className="font-semibold line-clamp-2">
        {issue.title}
      </h3>

      {/* Labels */}
      <div className="flex flex-wrap gap-2 mt-2">
        {issue.labels.slice(0, 3).map((label: any) => (
          <span
            key={label.id}
            className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-300"
          >
            {label.name}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
        <span>💬 {issue.comments}</span>

        <a
          href={issue.html_url}
          target="_blank"
          className="text-blue-400 hover:underline"
        >
          View →
        </a>
      </div>
    </div>
  );
}