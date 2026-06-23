 "use client";
import { useState } from "react";

export default function CsvToJson() {
  const [csv, setCsv] = useState("name,age,city\nJohn,30,Paris\nJane,25,London");
  const [copied, setCopied] = useState(false);

  const convert = () => {
    try {
      const lines = csv.trim().split("\n");
      const headers = lines[0].split(",").map((h) => h.trim());
      const result = lines.slice(1).map((line) => {
        const values = line.split(",").map((v) => v.trim());
        const obj: Record<string, string> = {};
        headers.forEach((h, i) => (obj[h] = values[i] ?? ""));
        return obj;
      });
      return JSON.stringify(result, null, 2);
    } catch {
      return "❌ Invalid CSV format";
    }
  };

  const output = csv ? convert() : "";

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <a href="/" className="text-blue-400 hover:underline">← DevKit</a>
        <h1 className="text-xl font-bold">CSV to JSON Converter</h1>
      </header>
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-gray-400 text-sm block mb-2">CSV Input</label>
            <textarea
              className="w-full h-64 bg-gray-900 border border-gray-700 rounded-xl p-4 font-mono text-sm focus:outline-none focus:border-blue-500 resize-none"
              value={csv}
              onChange={(e) => setCsv(e.target.value)}
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-gray-400 text-sm">JSON Output</label>
              {output && (
                <button onClick={copy} className={`px-3 py-1 rounded-lg text-sm transition ${copied ? "bg-green-600" : "bg-gray-700 hover:bg-gray-600"}`}>
                  {copied ? "✓ Copied!" : "Copy"}
                </button>
              )}
            </div>
            <textarea
              className="w-full h-64 bg-gray-900 border border-gray-700 rounded-xl p-4 font-mono text-sm text-green-400 focus:outline-none resize-none"
              readOnly value={output}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
