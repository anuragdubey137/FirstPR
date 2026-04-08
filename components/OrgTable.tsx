export default function OrgTable({ orgs }: { orgs: any[] }) {
  if (!Array.isArray(orgs) || orgs.length === 0) {
    return <p className="p-6 text-gray-400">Loading organizations...</p>;
  }

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="grid grid-cols-12 text-xs text-gray-400 border-b border-gray-800 pb-2 mb-3">
        <div className="col-span-2">Company</div>
        <div className="col-span-4">Repository</div>
        <div className="col-span-2">Language</div>
        <div className="col-span-3">Tags</div>
        <div className="col-span-1 text-right">Action</div>
      </div>

      {/* ROWS */}
      <div className="space-y-2">
        {orgs.map((org, i) => (
          <div
            key={i}
            className="grid grid-cols-12 items-center bg-[#0f172a] border border-gray-800 rounded-lg p-3 hover:border-gray-600 transition"
          >
            {/* Company (clickable) */}
            <div className="col-span-2 font-medium">
              <a
                href={org.companyUrl}
                target="_blank"
                className="text-white hover:underline"
              >
                {org.company}
              </a>
            </div>

            {/* Repo */}
            <div className="col-span-4">
              <a
                href={`https://github.com/${org.repo}`}
                target="_blank"
                className="text-blue-400 text-sm hover:underline"
                >
                {org.repo}
                </a>
              <p className="text-xs text-gray-500 line-clamp-1">
                {org.description}
              </p>
            </div>

            {/* Language */}
            <div className="col-span-2">
              <span className="text-xs bg-blue-600/20 text-blue-400 px-2 py-1 rounded">
                {org.language}
              </span>
            </div>

            {/* Tags */}
            <div className="col-span-3 flex flex-wrap gap-2">
              {org.tags?.slice(0, 3).map((tag: string, idx: number) => (
                <span
                  key={idx}
                  className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>

            {/* Action */}
            <div className="col-span-1 text-right">
              <a
                href={org.careerUrl}
                target="_blank"
                className="bg-white text-black px-3 py-1.5 rounded-md text-xs font-medium hover:bg-gray-200 transition"
              >
                View
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}