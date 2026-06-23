 "use client";
import { useState } from "react";

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [hash, setHash] = useState("");
  const [copied, setCopied] = useState(false);

  const generateHash = async () => {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    setHash(hashHex);
  };

  const copy = () => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <a href="/" className="text-blue-400 hover:underline">← DevKit</a>
        <h1 className="text-xl font-bold">SHA-256 Hash Generator</h1>
      </header>
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">
        <textarea
          className="w-full h-32 bg-gray-900 border border-gray-700 rounded-xl p-4 focus:outline-none focus:border-blue-500 resize-none"
          placeholder="Enter text to hash..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={generateHash} className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg font-semibold transition">
          Generate SHA-256 Hash
        </button>
        {hash && (
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 flex items-center justify-between gap-4">
            <span className="font-mono text-sm text-green-400 break-all">{hash}</span>
            <button onClick={copy} className={`px-4 py-2 rounded-lg text-sm font-semibold transition flex-shrink-0 ${copied ? "bg-green-600" : "bg-gray-700 hover:bg-gray-600"}`}>
              {copied ? "✓" : "Copy"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
