"use client";
import { useState } from "react";

export default function WordCounter() {
  const [text, setText] = useState("");

  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, "").length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
  const readTime = Math.ceil(words / 200);

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <a href="/" className="text-blue-400 hover:underline">← DevKit</a>
        <h1 className="text-xl font-bold">Word Counter</h1>
      </header>
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
        <textarea
          className="w-full h-64 bg-gray-900 border border-gray-700 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 resize-none"
          placeholder="Paste or type your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Words", value: words },
            { label: "Characters", value: chars },
            { label: "Chars (no spaces)", value: charsNoSpace },
            { label: "Read time", value: `${readTime} min` },
          ].map((stat) => (
            <div key={stat.label} className="bg-gray-900 border border-gray-700 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-blue-400">{stat.value}</div>
              <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
        <button
          onClick={() => setText("")}
          className="bg-gray-800 hover:bg-gray-700 px-6 py-2 rounded-lg font-semibold transition"
        >
          Clear
        </button>
      </div>
    </main>
  );
} 
