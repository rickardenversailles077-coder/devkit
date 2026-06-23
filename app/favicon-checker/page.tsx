 "use client";
import { useState } from "react";

export default function FaviconChecker() {
  const [url, setUrl] = useState("");

  const getFaviconUrl = (siteUrl: string) => {
    try {
      const domain = new URL(siteUrl.startsWith("http") ? siteUrl : `https://${siteUrl}`).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    } catch {
      return null;
    }
  };

  const favicon = url ? getFaviconUrl(url) : null;

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <a href="/" className="text-blue-400 hover:underline">← DevKit</a>
        <h1 className="text-xl font-bold">Favicon Checker</h1>
      </header>
      <div className="max-w-xl mx-auto px-6 py-10 space-y-6 text-center">
        <input
          className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
          placeholder="example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        {favicon && (
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-8 inline-block">
            <img src={favicon} alt="Favicon" className="w-24 h-24 mx-auto rounded-lg bg-white p-2" />
            <p className="text-gray-400 text-sm mt-4">Favicon preview at 128x128</p>
          </div>
        )}
      </div>
    </main>
  );
}
