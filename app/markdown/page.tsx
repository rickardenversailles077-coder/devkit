"use client";
import { useState } from "react";
import { marked } from "marked";

export default function MarkdownPreview() {
  const [input, setInput] = useState("# Hello DevKit!\n\nWrite your **markdown** here and see the *preview* in real time.\n\n- Item 1\n- Item 2\n- Item 3\n\n> This is a quote\n\n`code inline`\n\n```\ncode block\n```");

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <a href="/" className="text-blue-400 hover:underline">← DevKit</a>
        <h1 className="text-xl font-bold">Markdown Preview</h1>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[75vh]">
          {/* Editor */}
          <div className="flex flex-col">
            <label className="text-gray-400 text-sm mb-2">Editor</label>
            <textarea
              className="flex-1 bg-gray-900 border border-gray-700 rounded-xl p-4 font-mono text-sm text-white focus:outline-none focus:border-blue-500 resize-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          {/* Preview */}
          <div className="flex flex-col">
            <label className="text-gray-400 text-sm mb-2">Preview</label>
            <div
              className="flex-1 bg-gray-900 border border-gray-700 rounded-xl p-6 overflow-auto prose prose-invert prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: marked(input) }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}