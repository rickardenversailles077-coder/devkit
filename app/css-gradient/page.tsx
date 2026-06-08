 "use client";
import { useState } from "react";

export default function CssGradient() {
  const [color1, setColor1] = useState("#3b82f6");
  const [color2, setColor2] = useState("#8b5cf6");
  const [angle, setAngle] = useState(135);
  const [type, setType] = useState("linear");
  const [copied, setCopied] = useState(false);

  const css = type === "linear"
    ? `background: linear-gradient(${angle}deg, ${color1}, ${color2});`
    : `background: radial-gradient(circle, ${color1}, ${color2});`;

  const handleCopy = () => {
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <a href="/" className="text-blue-400 hover:underline">← DevKit</a>
        <h1 className="text-xl font-bold">CSS Gradient Generator</h1>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
        {/* Preview */}
        <div
          className="w-full h-48 rounded-2xl border border-gray-700 shadow-2xl"
          style={{ background: type === "linear"
            ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
            : `radial-gradient(circle, ${color1}, ${color2})` }}
        />

        {/* Controls */}
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 space-y-6">
          {/* Type */}
          <div>
            <label className="text-gray-400 text-sm block mb-3">Type</label>
            <div className="flex gap-3">
              {["linear", "radial"].map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`px-6 py-2 rounded-lg font-semibold transition capitalize ${
                    type === t
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-gray-400 text-sm block mb-2">Color 1</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  className="w-12 h-12 rounded-lg cursor-pointer border-0 bg-transparent"
                />
                <span className="font-mono text-sm">{color1.toUpperCase()}</span>
              </div>
            </div>
            <div>
              <label className="text-gray-400 text-sm block mb-2">Color 2</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  className="w-12 h-12 rounded-lg cursor-pointer border-0 bg-transparent"
                />
                <span className="font-mono text-sm">{color2.toUpperCase()}</span>
              </div>
            </div>
          </div>

          {/* Angle */}
          {type === "linear" && (
            <div>
              <label className="text-gray-400 text-sm block mb-2">
                Angle — <span className="text-white font-bold">{angle}°</span>
              </label>
              <input
                type="range"
                min={0}
                max={360}
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>
          )}
        </div>

        {/* CSS Output */}
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <label className="text-gray-400 text-sm">CSS Code</label>
            <button
              onClick={handleCopy}
              className={`px-4 py-1 rounded-lg text-sm font-semibold transition ${
                copied ? "bg-green-600 text-white" : "bg-gray-700 hover:bg-gray-600 text-white"
              }`}
            >
              {copied ? "✓ Copied!" : "Copy"}
            </button>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm text-green-400">
            {css}
          </div>
        </div>
      </div>
    </main>
  );
}
