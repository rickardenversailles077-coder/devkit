 "use client";
import { useState } from "react";

export default function ColorConverter() {
  const [hex, setHex] = useState("#3b82f6");

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <a href="/" className="text-blue-400 hover:underline">← DevKit</a>
        <h1 className="text-xl font-bold">Color Converter</h1>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        {/* Color preview */}
        <div className="w-48 h-48 rounded-2xl mx-auto mb-8 shadow-2xl border border-gray-700"
          style={{ backgroundColor: hex }} />

        {/* Color picker */}
        <input
          type="color"
          value={hex}
          onChange={(e) => setHex(e.target.value)}
          className="w-16 h-16 rounded-xl cursor-pointer border-0 bg-transparent mx-auto block mb-8"
        />

        {/* Results */}
        <div className="grid grid-cols-1 gap-4">
          {[
            { label: "HEX", value: hex.toUpperCase() },
            { label: "RGB", value: `rgb(${r}, ${g}, ${b})` },
            { label: "HSL", value: `hsl(${h}, ${s}%, ${l}%)` },
          ].map((item) => (
            <div key={item.label} className="bg-gray-900 border border-gray-700 rounded-xl p-4 flex items-center justify-between">
              <span className="text-gray-400 font-mono text-sm">{item.label}</span>
              <span className="font-mono text-lg">{item.value}</span>
              <button
                onClick={() => navigator.clipboard.writeText(item.value)}
                className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-lg text-sm transition"
              >
                Copier
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
