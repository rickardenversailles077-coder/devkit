 "use client";
import { useState } from "react";

export default function TextToBinary() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const textToBinary = (str: string) =>
    str.split("").map((c) => c.charCodeAt(0).toString(2).padStart(8, "0")).join(" ");

  const binaryToText = (str: string) => {
    try {
      return str.trim().split(/\s+/).map((b) => String.fromCharCode(parseInt(b, 2))).join("");
    } catch {
      return "❌ Invalid binary";
    }
  };

  const output = mode === "encode" ? textToBinary(text) : binaryToText(text);

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <a href="/" className="text-blue-400 hover:underline">← DevKit</a>
        <h1 className="text-xl font-bold">Text to Binary Converter</h1>
      </header>
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
        <div className="flex gap-3">
          {(["encode", "decode"] as const).map((m) => (
            <button key={m} onClick={() => setMode(m)}
              className={`px-6 py-2 rounded-lg font-semibold capitalize transition ${mode === m ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"}`}>
              {m === "encode" ? "Text → Binary" : "Binary → Text"}
            </button>
          ))}
        </div>
        <textarea
          className="w-full h-32 bg-gray-900 border border-gray-700 rounded-xl p-4 font-mono text-sm focus:outline-none focus:border-blue-500 resize-none"
          placeholder={mode === "encode" ? "Hello World" : "01001000 01100101 01101100 01101100 01101111"}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {output && (
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
            <div className="flex justify-end mb-3">
              <button onClick={() => navigator.clipboard.writeText(output)} className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-lg text-sm transition">
                Copy
              </button>
            </div>
            <p className="font-mono text-sm text-green-400 break-all">{output}</p>
          </div>
        )}
      </div>
    </main>
  );
}
