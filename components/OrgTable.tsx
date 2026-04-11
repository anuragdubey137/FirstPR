export default function OrgTable({ orgs }: { orgs: any[] }) {
  if (!Array.isArray(orgs) || orgs.length === 0) {
    return <p className="p-6 text-gray-400">Loading organizations...</p>;
  }

  return (
    <div className="p-4 md:p-6">

      {/* DESKTOP HEADER */}
      <div className="hidden md:grid grid-cols-12 text-xs text-gray-400 border-b border-gray-800 pb-2 mb-4">
        <div className="col-span-2">Company</div>
        <div className="col-span-4">Repository</div>
        <div className="col-span-2">Language</div>
        <div className="col-span-3">Tags</div>
        <div className="col-span-1 text-right">Action</div>
      </div>

      {/* ROWS */}
      <div className="space-y-4">
        {orgs.map((org, i) => (

          <div
            key={i}
            className="bg-[#0f172a] border border-gray-800 rounded-xl p-4 hover:border-gray-600 transition"
          >

            {/* 🔹 MOBILE VIEW */}
            <div className="md:hidden space-y-3">

              <div>
                <p className="text-sm text-gray-400">Company</p>
                <a
                  href={org.companyUrl}
                  target="_blank"
                  className="text-white font-semibold hover:underline"
                >
                  {org.company}
                </a>
              </div>

              <div>
                <p className="text-sm text-gray-400">Repository</p>
                <a
                  href={`https://github.com/${org.repo}`}
                  target="_blank"
                  className="text-blue-400 hover:underline text-sm"
                >
                  {org.repo}
                </a>
                <p className="text-xs text-gray-500 mt-1">
                  {org.description}
                </p>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs bg-blue-600/20 text-blue-400 px-2 py-1 rounded">
                  {org.language}
                </span>

                <a
                  href={org.careerUrl}
                  target="_blank"
                  className="bg-white text-black px-3 py-1.5 rounded-md text-xs font-medium"
                >
                  View
                </a>
              </div>

              <div className="flex flex-wrap gap-2">
                {org.tags?.slice(0, 3).map((tag: string, idx: number) => (
                  <span
                    key={idx}
                    className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>

            </div>

            {/* 🔹 DESKTOP GRID */}
            <div className="hidden md:grid grid-cols-12 items-center gap-4">

              <div className="col-span-2 font-medium">
                <a
                  href={org.companyUrl}
                  target="_blank"
                  className="text-white hover:underline"
                >
                  {org.company}
                </a>
              </div>

              <div className="col-span-4">
                <a
                  href={`https://github.com/${org.repo}`}
                  target="_blank"
                  className="text-blue-400 text-sm hover:underline"
                >
                  {org.repo}
                </a>
                <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                  {org.description}
                </p>
              </div>

              <div className="col-span-2">
                <span className="text-xs bg-blue-600/20 text-blue-400 px-2 py-1 rounded">
                  {org.language}
                </span>
              </div>

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

          </div>
        ))}
      </div>
    </div>
  );
}