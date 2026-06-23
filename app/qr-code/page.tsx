 "use client";
import { useState } from "react";

export default function QrCode() {
  const [text, setText] = useState("https://devkit-inky.vercel.app");

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}`;

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <a href="/" className="text-blue-400 hover:underline">← DevKit</a>
        <h1 className="text-xl font-bold">QR Code Generator</h1>
      </header>
      <div className="max-w-2xl mx-auto px-6 py-10 space-y-6 text-center">
        <input
          className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
          placeholder="Enter text or URL"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {text && (
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-8 inline-block">
            <img src={qrUrl} alt="QR Code" className="rounded-lg" />
            <a
              href={qrUrl}
              download="qrcode.png"
              className="block mt-4 bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg font-semibold transition"
            >
              Download PNG
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
