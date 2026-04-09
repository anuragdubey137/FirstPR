interface StatsCardProps {
  title: string;
  value: string | number;
}

export default function StatsCard({ title, value }: StatsCardProps) {
  return (
    <div className="bg-[#111827] p-4 rounded-xl border border-gray-800">
      <p className="text-sm text-gray-400">{title}</p>
      <h2 className="text-xl font-semibold">{value}</h2>
    </div>
  );
}