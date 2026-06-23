 "use client";
import { useState } from "react";

export default function PercentageCalculator() {
  const [value, setValue] = useState("50");
  const [total, setTotal] = useState("200");

  const v = parseFloat(value) || 0;
  const t = parseFloat(total) || 1;
  const percentage = (v / t) * 100;

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <a href="/" className="text-blue-400 hover:underline">← DevKit</a>
        <h1 className="text-xl font-bold">Percentage Calculator</h1>
      </header>
      <div className="max-w-xl mx-auto px-6 py-10 space-y-6">
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 space-y-4">
          <p className="text-gray-400">What is</p>
          <input
            type="number"
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <p className="text-gray-400">out of</p>
          <input
            type="number"
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
          />
        </div>
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-8 text-center">
          <p className="text-5xl font-bold text-green-400">{percentage.toFixed(2)}%</p>
        </div>
      </div>
    </main>
  );
}
