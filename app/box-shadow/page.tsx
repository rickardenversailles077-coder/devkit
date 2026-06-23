 "use client";
import { useState } from "react";

export default function BoxShadow() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(10);
  const [blur, setBlur] = useState(20);
  const [spread, setSpread] = useState(0);
  const [color, setColor] = useState("#000000");
  const [opacity, setOpacity] = useState(25);
  const [copied, setCopied] = useState(false);

  const hexToRgba = (hex: string, a: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${a / 100})`;
  };

  const shadow = `${x}px ${y}px ${blur}px ${spread}px ${hexToRgba(color, opacity)}`;
  const css = `box-shadow: ${shadow};`;

  const copy = () => {
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <a href="/" className="text-blue-400 hover:underline">← DevKit</a>
        <h1 className="text-xl font-bold">Box Shadow Generator</h1>
      </header>
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">
        <div className="bg-gray-200 rounded-2xl p-16 flex items-center justify-center">
          <div className="w-32 h-32 bg-white rounded-2xl" style={{ boxShadow: shadow }} />
        </div>
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 space-y-4">
          {[
            { label: "Horizontal", value: x, set: setX, min: -50, max: 50 },
            { label: "Vertical", value: y, set: setY, min: -50, max: 50 },
            { label: "Blur", value: blur, set: setBlur, min: 0, max: 100 },
            { label: "Spread", value: spread, set: setSpread, min: -50, max: 50 },
            { label: "Opacity", value: opacity, set: setOpacity, min: 0, max: 100 },
          ].map((slider) => (
            <div key={slider.label}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">{slider.label}</span>
                <span>{slider.value}</span>
              </div>
              <input
                type="range" min={slider.min} max={slider.max} value={slider.value}
                onChange={(e) => slider.set(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>
          ))}
          <div className="flex items-center gap-3">
            <span className="text-gray-400 text-sm">Color</span>
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-12 h-12 rounded-lg cursor-pointer border-0 bg-transparent" />
          </div>
        </div>
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 flex items-center justify-between">
          <code className="text-green-400 font-mono text-sm">{css}</code>
          <button onClick={copy} className={`px-4 py-1 rounded-lg text-sm transition ${copied ? "bg-green-600" : "bg-gray-700 hover:bg-gray-600"}`}>
            {copied ? "✓ Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </main>
  );
}
