 "use client";
import { useState } from "react";

export default function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(5);
  const [copied, setCopied] = useState<number | null>(null);

  const generate = () => {
    const newUuids = Array.from({ length: count }, () =>
      "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      })
    );
    setUuids(newUuids);
  };

  const copy = (uuid: string, index: number) => {
    navigator.clipboard.writeText(uuid);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join("\n"));
    setCopied(-1);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <a href="/" className="text-blue-400 hover:underline">← DevKit</a>
        <h1 className="text-xl font-bold">UUID Generator</h1>
      </header>
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 flex items-center gap-4">
          <label className="text-gray-400 text-sm">How many?</label>
          <input
            type="number" min={1} max={50} value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-20 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-center focus:outline-none focus:border-blue-500"
          />
          <button onClick={generate} className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg font-semibold transition">
            Generate
          </button>
          {uuids.length > 0 && (
            <button onClick={copyAll} className={`px-6 py-2 rounded-lg font-semibold transition ${copied === -1 ? "bg-green-600" : "bg-gray-700 hover:bg-gray-600"}`}>
              {copied === -1 ? "✓ Copied all!" : "Copy all"}
            </button>
          )}
        </div>
        <div className="space-y-2">
          {uuids.map((uuid, i) => (
            <div key={i} className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 flex items-center justify-between">
              <span className="font-mono text-sm text-green-400">{uuid}</span>
              <button
                onClick={() => copy(uuid, i)}
                className={`px-3 py-1 rounded-lg text-sm transition ${copied === i ? "bg-green-600" : "bg-gray-700 hover:bg-gray-600"}`}
              >
                {copied === i ? "✓" : "Copy"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
