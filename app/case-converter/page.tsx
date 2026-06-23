 "use client";
import { useState } from "react";

export default function CaseConverter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const toCamelCase = (s: string) =>
    s.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase());

  const toSnakeCase = (s: string) =>
    s.toLowerCase().trim().replace(/[^a-zA-Z0-9]+/g, "_");

  const toKebabCase = (s: string) =>
    s.toLowerCase().trim().replace(/[^a-zA-Z0-9]+/g, "-");

  const toPascalCase = (s: string) => {
    const camel = toCamelCase(s);
    return camel.charAt(0).toUpperCase() + camel.slice(1);
  };

  const conversions = [
    { label: "UPPERCASE", value: text.toUpperCase() },
    { label: "lowercase", value: text.toLowerCase() },
    { label: "Title Case", value: text.replace(/\w\S*/g, (t) => t[0].toUpperCase() + t.slice(1).toLowerCase()) },
    { label: "camelCase", value: toCamelCase(text) },
    { label: "PascalCase", value: toPascalCase(text) },
    { label: "snake_case", value: toSnakeCase(text) },
    { label: "kebab-case", value: toKebabCase(text) },
  ];

  const copy = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <a href="/" className="text-blue-400 hover:underline">← DevKit</a>
        <h1 className="text-xl font-bold">Case Converter</h1>
      </header>
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">
        <textarea
          className="w-full h-32 bg-gray-900 border border-gray-700 rounded-xl p-4 focus:outline-none focus:border-blue-500 resize-none"
          placeholder="Type or paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="space-y-2">
          {conversions.map((c) => (
            <div key={c.label} className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 flex items-center justify-between gap-4">
              <div className="flex-1 overflow-hidden">
                <p className="text-gray-500 text-xs">{c.label}</p>
                <p className="font-mono text-sm text-green-400 truncate">{c.value || "—"}</p>
              </div>
              <button
                onClick={() => copy(c.value, c.label)}
                className={`px-3 py-1 rounded-lg text-sm transition flex-shrink-0 ${copied === c.label ? "bg-green-600" : "bg-gray-700 hover:bg-gray-600"}`}
              >
                {copied === c.label ? "✓" : "Copy"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
