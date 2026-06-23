 "use client";
import { useState } from "react";

export default function SlugGenerator() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const slug = text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  const copy = () => {
    navigator.clipboard.writeText(slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <a href="/" className="text-blue-400 hover:underline">← DevKit</a>
        <h1 className="text-xl font-bold">Slug Generator</h1>
      </header>
      <div className="max-w-2xl mx-auto px-6 py-10 space-y-6">
        <div>
          <label className="text-gray-400 text-sm block mb-2">Your text or title</label>
          <input
            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
            placeholder="My Awesome Blog Post Title!"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        {slug && (
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 flex items-center justify-between">
            <span className="font-mono text-lg text-green-400">{slug}</span>
            <button onClick={copy} className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${copied ? "bg-green-600" : "bg-gray-700 hover:bg-gray-600"}`}>
              {copied ? "✓ Copied!" : "Copy"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
