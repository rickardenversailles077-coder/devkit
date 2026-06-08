 "use client";
import { useState } from "react";

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("");

  const getMatches = () => {
    if (!pattern) return [];
    try {
      const regex = new RegExp(pattern, flags);
      return text.match(regex) || [];
    } catch {
      return [];
    }
  };

  const isValid = () => {
    try {
      new RegExp(pattern, flags);
      return true;
    } catch {
      return false;
    }
  };

  const matches = getMatches();

  const highlightText = () => {
    if (!pattern || !text) return text;
    try {
      const regex = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
      return text.replace(regex, (match) => `__MATCH__${match}__END__`);
    } catch {
      return text;
    }
  };

  const parts = highlightText().split(/(__MATCH__|__END__)/);

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <a href="/" className="text-blue-400 hover:underline">← DevKit</a>
        <h1 className="text-xl font-bold">Regex Tester</h1>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
        {/* Pattern */}
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
          <label className="block text-gray-400 mb-2 text-sm">Expression régulière</label>
          <div className="flex gap-3">
            <input
              className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 font-mono text-yellow-400 focus:outline-none focus:border-blue-500"
              placeholder="ex: \d+ ou [a-z]+"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
            />
            <input
              className="w-20 bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 font-mono text-center focus:outline-none focus:border-blue-500"
              placeholder="flags"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
            />
          </div>
          {pattern && (
            <p className={`mt-2 text-sm ${isValid() ? "text-green-400" : "text-red-400"}`}>
              {isValid() ? "✅ Regex valide" : "❌ Regex invalide"}
            </p>
          )}
        </div>

        {/* Text */}
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
          <label className="block text-gray-400 mb-2 text-sm">Texte à tester</label>
          <textarea
            className="w-full h-40 bg-gray-800 border border-gray-600 rounded-lg p-4 font-mono text-sm focus:outline-none focus:border-blue-500"
            placeholder="Colle ton texte ici..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        {/* Results */}
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <label className="text-gray-400 text-sm">Résultats</label>
            <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
              {matches.length} match{matches.length !== 1 ? "es" : ""}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {matches.length > 0 ? matches.map((match, i) => (
              <span key={i} className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-lg font-mono text-sm font-bold">
                {match}
              </span>
            )) : (
              <p className="text-gray-500 text-sm">Aucun résultat</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
