 "use client";
import { useState } from "react";

export default function JwtDecoder() {
  const [token, setToken] = useState("");

  const decode = () => {
    try {
      const parts = token.split(".");
      if (parts.length !== 3) return null;
      const header = JSON.parse(atob(parts[0]));
      const payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));
      return { header, payload };
    } catch {
      return null;
    }
  };

  const result = token ? decode() : null;

  const formatDate = (timestamp: number) =>
    new Date(timestamp * 1000).toLocaleString();

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <a href="/" className="text-blue-400 hover:underline">← DevKit</a>
        <h1 className="text-xl font-bold">JWT Decoder</h1>
      </header>
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
          <label className="text-gray-400 text-sm block mb-2">Paste your JWT token</label>
          <textarea
            className="w-full h-32 bg-gray-800 border border-gray-600 rounded-lg p-4 font-mono text-sm text-yellow-400 focus:outline-none focus:border-blue-500 resize-none"
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
        </div>
        {token && !result && (
          <p className="text-red-400">❌ Invalid JWT token</p>
        )}
        {result && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
              <h2 className="text-blue-400 font-bold mb-3">Header</h2>
              <pre className="font-mono text-sm text-green-400 whitespace-pre-wrap">
                {JSON.stringify(result.header, null, 2)}
              </pre>
            </div>
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
              <h2 className="text-blue-400 font-bold mb-3">Payload</h2>
              <pre className="font-mono text-sm text-green-400 whitespace-pre-wrap">
                {JSON.stringify(result.payload, null, 2)}
              </pre>
              {result.payload.exp && (
                <p className="text-gray-400 text-sm mt-3">
                  Expires: {formatDate(result.payload.exp)}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
