"use client";
import { useState } from "react";

const PLATFORMS = [
  { name: "X (Twitter)", limit: 280 },
  { name: "Instagram Caption", limit: 2200 },
  { name: "Facebook Post", limit: 63206 },
  { name: "LinkedIn Post", limit: 3000 },
  { name: "Meta Title (SEO)", limit: 60 },
  { name: "Meta Description (SEO)", limit: 160 },
  { name: "YouTube Title", limit: 100 },
];

export default function CharLimit() {
  const [text, setText] = useState("");
  const len = text.length;

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <a href="/" className="text-blue-400 hover:underline">← DevKit</a>
        <h1 className="text-xl font-bold">Character Limit Checker</h1>
      </header>
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">
        <textarea
          className="w-full h-40 bg-gray-900 border border-gray-700 rounded-xl p-4 focus:outline-none focus:border-blue-500 resize-none"
          placeholder="Type or paste your text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="space-y-2">
          {PLATFORMS.map((p) => {
            const remaining = p.limit - len;
            const over = remaining < 0;
            const pct = Math.min((len / p.limit) * 100, 100);
            return (
              <div key={p.name} className="bg-gray-900 border border-gray-700 rounded-xl p-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-300">{p.name}</span>
                  <span className={over ? "text-red-400 font-bold" : "text-gray-400"}>
                    {len} / {p.limit}
                  </span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${over ? "bg-red-500" : "bg-blue-500"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}