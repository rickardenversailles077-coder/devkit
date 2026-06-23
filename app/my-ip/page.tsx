 "use client";
import { useEffect, useState } from "react";

export default function MyIp() {
  const [ip, setIp] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => setIp(data.ip))
      .catch(() => setIp("Unable to fetch IP"));
  }, []);

  const copy = () => {
    if (!ip) return;
    navigator.clipboard.writeText(ip);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <a href="/" className="text-blue-400 hover:underline">← DevKit</a>
        <h1 className="text-xl font-bold">What's My IP</h1>
      </header>
      <div className="max-w-xl mx-auto px-6 py-20 text-center space-y-6">
        <p className="text-gray-400">Your public IP address is:</p>
        <p className="text-5xl font-mono font-bold text-green-400">{ip || "Loading..."}</p>
        {ip && (
          <button onClick={copy} className={`px-6 py-2 rounded-lg font-semibold transition ${copied ? "bg-green-600" : "bg-blue-600 hover:bg-blue-500"}`}>
            {copied ? "✓ Copied!" : "Copy IP"}
          </button>
        )}
      </div>
    </main>
  );
}
