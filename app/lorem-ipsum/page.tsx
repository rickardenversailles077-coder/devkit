 "use client";
import { useState } from "react";

const WORDS = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat".split(" ");

export default function LoremIpsum() {
  const [count, setCount] = useState(3);
  const [type, setType] = useState<"paragraphs" | "words" | "sentences">("paragraphs");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const randomWords = (n: number) =>
    Array.from({ length: n }, () => WORDS[Math.floor(Math.random() * WORDS.length)]).join(" ");

  const generate = () => {
    if (type === "words") {
      setOutput(randomWords(count));
    } else if (type === "sentences") {
      const sentences = Array.from({ length: count }, () => {
        const s = randomWords(8 + Math.floor(Math.random() * 8));
        return s.charAt(0).toUpperCase() + s.slice(1) + ".";
      });
      setOutput(sentences.join(" "));
    } else {
      const paragraphs = Array.from({ length: count }, () => {
        const sentences = Array.from({ length: 4 + Math.floor(Math.random() * 3) }, () => {
          const s = randomWords(8 + Math.floor(Math.random() * 8));
          return s.charAt(0).toUpperCase() + s.slice(1) + ".";
        });
        return sentences.join(" ");
      });
      setOutput(paragraphs.join("\n\n"));
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <a href="/" className="text-blue-400 hover:underline">← DevKit</a>
        <h1 className="text-xl font-bold">Lorem Ipsum Generator</h1>
      </header>
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 flex flex-wrap items-center gap-4">
          <input
            type="number" min={1} max={50} value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-20 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-center focus:outline-none focus:border-blue-500"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value as any)}
            className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="paragraphs">Paragraphs</option>
            <option value="sentences">Sentences</option>
            <option value="words">Words</option>
          </select>
          <button onClick={generate} className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg font-semibold transition">
            Generate
          </button>
        </div>
        {output && (
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
            <div className="flex justify-end mb-3">
              <button onClick={copy} className={`px-4 py-1 rounded-lg text-sm transition ${copied ? "bg-green-600" : "bg-gray-700 hover:bg-gray-600"}`}>
                {copied ? "✓ Copied!" : "Copy"}
              </button>
            </div>
            <p className="whitespace-pre-line text-gray-300 leading-relaxed">{output}</p>
          </div>
        )}
      </div>
    </main>
  );
}
