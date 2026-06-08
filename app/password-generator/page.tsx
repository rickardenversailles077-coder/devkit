"use client";
import { useState } from "react";

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    let chars = "";
    if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (!chars) return;
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
    setCopied(false);
  };

  const copy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrength = () => {
    let score = 0;
    if (uppercase) score++;
    if (lowercase) score++;
    if (numbers) score++;
    if (symbols) score++;
    if (length >= 12) score++;
    if (length >= 16) score++;
    if (score <= 2) return { label: "Weak", color: "#ef4444" };
    if (score <= 4) return { label: "Medium", color: "#f97316" };
    return { label: "Strong", color: "#22c55e" };
  };

  const strength = getStrength();

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <a href="/" className="text-blue-400 hover:underline">← DevKit</a>
        <h1 className="text-xl font-bold">Password Generator</h1>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-10 space-y-6">
        {/* Password display */}
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-lg text-green-400 break-all flex-1">
              {password || "Click Generate to create a password"}
            </p>
            {password && (
              <button onClick={copy} className={`px-4 py-2 rounded-lg text-sm font-semibold transition flex-shrink-0 ${copied ? "bg-green-600" : "bg-gray-700 hover:bg-gray-600"}`}>
                {copied ? "✓ Copied!" : "Copy"}
              </button>
            )}
          </div>
          {password && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-sm text-gray-400">Strength:</span>
              <span className="text-sm font-bold" style={{ color: strength.color }}>{strength.label}</span>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 space-y-5">
          {/* Length */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-gray-400 text-sm">Length</label>
              <span className="text-white font-bold">{length}</span>
            </div>
            <input
              type="range" min={4} max={64} value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full accent-blue-500"
            />
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Uppercase (A-Z)", value: uppercase, set: setUppercase },
              { label: "Lowercase (a-z)", value: lowercase, set: setLowercase },
              { label: "Numbers (0-9)", value: numbers, set: setNumbers },
              { label: "Symbols (!@#)", value: symbols, set: setSymbols },
            ].map((opt) => (
              <button
                key={opt.label}
                onClick={() => opt.set(!opt.value)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition text-sm ${
                  opt.value
                    ? "border-blue-500 bg-blue-500/10 text-blue-400"
                    : "border-gray-700 bg-gray-800 text-gray-400"
                }`}
              >
                <span>{opt.value ? "✓" : "○"}</span>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Generate button */}
        <button
          onClick={generate}
          className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-bold text-lg transition"
        >
          Generate Password 🔐
        </button>
      </div>
    </main>
  );
}