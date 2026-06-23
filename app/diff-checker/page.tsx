 "use client";
import { useState } from "react";

export default function DiffChecker() {
  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");

  const linesA = textA.split("\n");
  const linesB = textB.split("\n");
  const maxLines = Math.max(linesA.length, linesB.length);

  const diffLines = Array.from({ length: maxLines }, (_, i) => ({
    a: linesA[i] ?? "",
    b: linesB[i] ?? "",
    same: linesA[i] === linesB[i],
  }));

  const diffCount = diffLines.filter((l) => !l.same).length;

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <a href="/" className="text-blue-400 hover:underline">← DevKit</a>
        <h1 className="text-xl font-bold">Diff Checker</h1>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-gray-400 text-sm block mb-2">Original Text</label>
            <textarea
              className="w-full h-48 bg-gray-900 border border-gray-700 rounded-xl p-4 font-mono text-sm focus:outline-none focus:border-blue-500 resize-none"
              value={textA}
              onChange={(e) => setTextA(e.target.value)}
            />
          </div>
          <div>
            <label className="text-gray-400 text-sm block mb-2">Changed Text</label>
            <textarea
              className="w-full h-48 bg-gray-900 border border-gray-700 rounded-xl p-4 font-mono text-sm focus:outline-none focus:border-blue-500 resize-none"
              value={textB}
              onChange={(e) => setTextB(e.target.value)}
            />
          </div>
        </div>
        {(textA || textB) && (
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-3">{diffCount} different line{diffCount !== 1 ? "s" : ""}</p>
            <div className="space-y-1 font-mono text-sm">
              {diffLines.map((line, i) => (
                <div key={i} className={`px-3 py-1 rounded ${line.same ? "text-gray-500" : "bg-red-500/10 text-red-300"}`}>
                  <span className="text-gray-600 mr-2">{i + 1}</span>
                  {line.a || line.b || "(empty line)"}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
