 "use client";
import { useState } from "react";

export default function ColorPalette() {
  const [baseColor, setBaseColor] = useState("#3b82f6");
  const [copied, setCopied] = useState<number | null>(null);

  const hexToHsl = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
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
    return { h: h * 360, s: s * 100, l: l * 100 };
  };

  const hslToHex = (h: number, s: number, l: number) => {
    s /= 100; l /= 100;
    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    const toHex = (x: number) => Math.round(x * 255).toString(16).padStart(2, "0");
    return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
  };

  const { h, s, l } = hexToHsl(baseColor);
  const palette = [
    { name: "Lightest", color: hslToHex(h, s, Math.min(l + 35, 95)) },
    { name: "Light", color: hslToHex(h, s, Math.min(l + 18, 90)) },
    { name: "Base", color: baseColor },
    { name: "Dark", color: hslToHex(h, s, Math.max(l - 18, 10)) },
    { name: "Darkest", color: hslToHex(h, s, Math.max(l - 35, 5)) },
  ];

  const copy = (color: string, i: number) => {
    navigator.clipboard.writeText(color);
    setCopied(i);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <a href="/" className="text-blue-400 hover:underline">← DevKit</a>
        <h1 className="text-xl font-bold">Color Palette Generator</h1>
      </header>
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 flex items-center gap-4">
          <input
            type="color"
            value={baseColor}
            onChange={(e) => setBaseColor(e.target.value)}
            className="w-16 h-16 rounded-xl cursor-pointer border-0 bg-transparent"
          />
          <span className="font-mono text-lg">{baseColor.toUpperCase()}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {palette.map((p, i) => (
            <div key={p.name} className="rounded-xl overflow-hidden border border-gray-700">
              <div className="h-24" style={{ backgroundColor: p.color }} />
              <div className="bg-gray-900 p-3 text-center">
                <p className="text-xs text-gray-500">{p.name}</p>
                <button
                  onClick={() => copy(p.color, i)}
                  className="font-mono text-xs text-green-400 mt-1"
                >
                  {copied === i ? "✓ Copied" : p.color}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
