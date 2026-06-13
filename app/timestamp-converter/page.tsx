 "use client";
import { useState } from "react";

export default function TimestampConverter() {
  const [timestamp, setTimestamp] = useState("");
  const [date, setDate] = useState("");

  const now = Math.floor(Date.now() / 1000);

  const fromTimestamp = () => {
    const ts = parseInt(timestamp);
    if (isNaN(ts)) return null;
    const d = new Date(ts * 1000);
    return {
      utc: d.toUTCString(),
      iso: d.toISOString(),
      local: d.toLocaleString(),
    };
  };

  const fromDate = () => {
    if (!date) return null;
    return Math.floor(new Date(date).getTime() / 1000);
  };

  const tsResult = timestamp ? fromTimestamp() : null;
  const dateResult = date ? fromDate() : null;

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <a href="/" className="text-blue-400 hover:underline">← DevKit</a>
        <h1 className="text-xl font-bold">Timestamp Converter</h1>
      </header>
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">
        {/* Current timestamp */}
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Current Unix Timestamp</p>
            <p className="font-mono text-2xl text-green-400 font-bold">{now}</p>
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(String(now))}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm transition"
          >
            Copy
          </button>
        </div>

        {/* Timestamp to date */}
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 space-y-4">
          <label className="text-gray-400 text-sm block">Unix Timestamp → Date</label>
          <input
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 font-mono focus:outline-none focus:border-blue-500"
            placeholder="e.g. 1700000000"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
          />
          {tsResult && (
            <div className="space-y-2">
              {Object.entries(tsResult).map(([key, val]) => (
                <div key={key} className="flex justify-between items-center bg-gray-800 rounded-lg px-4 py-2">
                  <span className="text-gray-400 text-sm capitalize">{key}</span>
                  <span className="font-mono text-sm text-green-400">{val}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Date to timestamp */}
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 space-y-4">
          <label className="text-gray-400 text-sm block">Date → Unix Timestamp</label>
          <input
            type="datetime-local"
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          {dateResult && (
            <div className="flex justify-between items-center bg-gray-800 rounded-lg px-4 py-2">
              <span className="text-gray-400 text-sm">Unix Timestamp</span>
              <span className="font-mono text-green-400">{dateResult}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
