 "use client";
import { useState } from "react";

export default function HtmlEncoder() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const encode = (str: string) =>
    str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");

  const decode = (str: string) =>
    str.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#039;/g, "'");

  const output = mode === "encode" ? encode(input) : decode(input);

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <a href="/" className="text-blue-400 hover:underline">← DevKit</a>
        <h1 className="text-xl font-bold">HTML Encoder / Decoder</h1>
      </header>
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
        <div className="flex gap-3">
          {(["encode", "decode"] as const).map((m) => (
            <button key={m} onClick={() => setMode(m)}
              className={`px-6 py-2 rounded-lg font-semibold capitalize transition ${mode === m ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"}`}>
              {m}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-gray-400 text-sm block mb-2">Input</label>
            <textarea
              className="w-full h-64 bg-gray-900 border border-gray-700 rounded-xl p-4 font-mono text-sm text-white focus:outline-none focus:border-blue-500 resize-none"
              placeholder={mode === "encode" ? "<h1>Hello World</h1>" : "&lt;h1&gt;Hello World&lt;/h1&gt;"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-gray-400 text-sm">Output</label>
              {output && (
                <button onClick={() => navigator.clipboard.writeText(output)}
                  className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-lg text-sm transition">
                  Copy
                </button>
              )}
            </div>
            <textarea
              className="w-full h-64 bg-gray-900 border border-gray-700 rounded-xl p-4 font-mono text-sm text-green-400 focus:outline-none resize-none"
              readOnly value={output}
              placeholder="Result appears here..."
            />
          </div>
        </div>
      </div>
    </main>
  );
}
