 "use client";
import { useState } from "react";

export default function Base64() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const encode = () => {
    try {
      setOutput(btoa(unescape(encodeURIComponent(input))));
      setError("");
    } catch {
      setError("❌ Erreur d'encodage");
    }
  };

  const decode = () => {
    try {
      setOutput(decodeURIComponent(escape(atob(input))));
      setError("");
    } catch {
      setError("❌ Base64 invalide !");
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
        <h1 className="text-xl font-bold">Base64 Encoder / Decoder</h1>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
          <label className="block text-gray-400 mb-2 text-sm">Texte ou Base64</label>
          <textarea
            className="w-full h-40 bg-gray-800 border border-gray-600 rounded-lg p-4 font-mono text-sm text-white focus:outline-none focus:border-blue-500"
            placeholder="Colle ton texte ou ta chaîne Base64 ici..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="flex gap-3 mt-3">
            <button onClick={encode} className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg font-semibold transition">
              Encoder 🔐
            </button>
            <button onClick={decode} className="bg-purple-600 hover:bg-purple-500 px-6 py-2 rounded-lg font-semibold transition">
              Décoder 🔓
            </button>
            <button onClick={clear} className="bg-gray-800 hover:bg-gray-700 px-6 py-2 rounded-lg font-semibold transition">
              Effacer
            </button>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-gray-400 text-sm">Résultat</label>
            {output && (
              <button
                onClick={() => navigator.clipboard.writeText(output)}
                className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-lg text-sm transition"
              >
                Copier
              </button>
            )}
          </div>
          {error && <p className="text-red-400 mb-2">{error}</p>}
          <textarea
            className="w-full h-40 bg-gray-800 border border-gray-600 rounded-lg p-4 font-mono text-sm text-green-400 focus:outline-none"
            readOnly
            value={output}
            placeholder="Le résultat apparaît ici..."
          />
        </div>
      </div>
    </main>
  );
}
