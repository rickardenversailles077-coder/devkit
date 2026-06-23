 "use client";
import { useState } from "react";

export default function RandomNumber() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [results, setResults] = useState<number[]>([]);
  const [allowDuplicates, setAllowDuplicates] = useState(true);

  const generate = () => {
    if (!allowDuplicates && max - min + 1 < count) {
      setResults([]);
      return;
    }
    const nums: number[] = [];
    if (allowDuplicates) {
      for (let i = 0; i < count; i++) {
        nums.push(Math.floor(Math.random() * (max - min + 1)) + min);
      }
    } else {
      const pool = Array.from({ length: max - min + 1 }, (_, i) => i + min);
      for (let i = 0; i < count; i++) {
        const idx = Math.floor(Math.random() * pool.length);
        nums.push(pool.splice(idx, 1)[0]);
      }
    }
    setResults(nums);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <a href="/" className="text-blue-400 hover:underline">← DevKit</a>
        <h1 className="text-xl font-bold">Random Number Generator</h1>
      </header>
      <div className="max-w-2xl mx-auto px-6 py-10 space-y-6">
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 text-sm block mb-1">Min</label>
              <input type="number" value={min} onChange={(e) => setMin(Number(e.target.value))}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="text-gray-400 text-sm block mb-1">Max</label>
              <input type="number" value={max} onChange={(e) => setMax(Number(e.target.value))}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500" />
            </div>
          </div>
          <div>
            <label className="text-gray-400 text-sm block mb-1">How many numbers?</label>
            <input type="number" min={1} max={100} value={count} onChange={(e) => setCount(Number(e.target.value))}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500" />
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-400">
            <input type="checkbox" checked={allowDuplicates} onChange={(e) => setAllowDuplicates(e.target.checked)} />
            Allow duplicate numbers
          </label>
          <button onClick={generate} className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-lg font-semibold transition">
            Generate
          </button>
        </div>
        {results.length > 0 && (
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 flex flex-wrap gap-3 justify-center">
            {results.map((n, i) => (
              <span key={i} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-mono font-bold text-lg">
                {n}
              </span>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
