 "use client";
import { useState } from "react";

export default function BmiCalculator() {
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("175");

  const w = parseFloat(weight);
  const h = parseFloat(height) / 100;
  const bmi = w && h ? w / (h * h) : 0;

  const getCategory = () => {
    if (bmi < 18.5) return { label: "Underweight", color: "#3b82f6" };
    if (bmi < 25) return { label: "Normal weight", color: "#22c55e" };
    if (bmi < 30) return { label: "Overweight", color: "#f97316" };
    return { label: "Obese", color: "#ef4444" };
  };

  const category = getCategory();

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <a href="/" className="text-blue-400 hover:underline">← DevKit</a>
        <h1 className="text-xl font-bold">BMI Calculator</h1>
      </header>
      <div className="max-w-xl mx-auto px-6 py-10 space-y-6">
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 space-y-4">
          <div>
            <label className="text-gray-400 text-sm block mb-1">Weight (kg)</label>
            <input
              type="number"
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div>
            <label className="text-gray-400 text-sm block mb-1">Height (cm)</label>
            <input
              type="number"
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
        </div>
        {bmi > 0 && (
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-8 text-center">
            <p className="text-5xl font-bold mb-2" style={{ color: category.color }}>{bmi.toFixed(1)}</p>
            <p className="text-lg font-semibold" style={{ color: category.color }}>{category.label}</p>
          </div>
        )}
      </div>
    </main>
  );
}
