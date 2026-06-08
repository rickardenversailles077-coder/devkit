"use client";
import { useState } from "react";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError("");
    } catch (e) {
      setError("❌ JSON invalide !");
      setOutput("");
    }
  };

  const clear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <a href="/" className="text-blue-400 hover:underline">← DevKit</a>
        <h1 className="text-xl font-bold">JSON Formatter</h1>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-400 mb-2 text-sm">Colle ton JSON ici</label>
            <textarea
              className="w-full h-96 bg-gray-900 border border-gray-700 rounded-xl p-4 font-mono text-sm text-white focus:outline-none focus:border-blue-500"
              placeholder='{"name": "DevKit", "version": 1}'
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="flex gap-3 mt-3">
              <button onClick={format} className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg font-semibold transition">
                Formater ✨
              </button>
              <button onClick={clear} className="bg-gray-800 hover:bg-gray-700 px-6 py-2 rounded-lg font-semibold transition">
                Effacer
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-400 mb-2 text-sm">Résultat</label>
            {error && <p className="text-red-400 mb-2">{error}</p>}
            <textarea
              className="w-full h-96 bg-gray-900 border border-gray-700 rounded-xl p-4 font-mono text-sm text-green-400 focus:outline-none"
              readOnly
              value={output}
              placeholder="Le JSON formaté apparaît ici..."
            />
          </div>
        </div>
      </div>
    </main>
  );
}