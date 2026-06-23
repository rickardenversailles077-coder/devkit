 "use client";
import { useState } from "react";

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("");

  const calculate = () => {
    if (!birthDate) return null;
    const birth = new Date(birthDate);
    const now = new Date();
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();
    if (days < 0) {
      months--;
      days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    const totalDays = Math.floor((now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    return { years, months, days, totalDays };
  };

  const result = calculate();

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <a href="/" className="text-blue-400 hover:underline">← DevKit</a>
        <h1 className="text-xl font-bold">Age Calculator</h1>
      </header>
      <div className="max-w-xl mx-auto px-6 py-10 space-y-6">
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
          <label className="text-gray-400 text-sm block mb-2">Date of birth</label>
          <input
            type="date"
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </div>
        {result && (
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-8 text-center space-y-2">
            <p className="text-4xl font-bold text-green-400">
              {result.years} years, {result.months} months, {result.days} days
            </p>
            <p className="text-gray-400">({result.totalDays.toLocaleString()} total days)</p>
          </div>
        )}
      </div>
    </main>
  );
}
