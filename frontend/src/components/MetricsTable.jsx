export default function MetricsTable({ metrics }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left text-gray-200 bg-white/10 backdrop-blur-md rounded-xl shadow-lg overflow-hidden">
        <thead className="text-xs uppercase bg-blue-600 text-white">
          <tr>
            <th scope="col" className="px-6 py-3">Metric</th>
            <th scope="col" className="px-6 py-3">Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(metrics).map(([key, value], idx) => (
            <tr
              key={key}
              className={`${
                idx % 2 === 0 ? "bg-white/5" : "bg-white/0"
              } hover:bg-blue-500/20 transition`}
            >
              <td className="px-6 py-4 font-medium capitalize">{key}</td>
              <td className="px-6 py-4">
                {typeof value === "number" ? value.toFixed(4) : value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
