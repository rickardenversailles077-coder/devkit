 "use client";
import { useState } from "react";

export default function MetaTags() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [copied, setCopied] = useState(false);

  const code = `<title>${title}</title>
<meta name="description" content="${description}" />

<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:url" content="${url}" />
<meta property="og:image" content="${image}" />
<meta property="og:type" content="website" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${description}" />
<meta name="twitter:image" content="${image}" />`;

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <a href="/" className="text-blue-400 hover:underline">← DevKit</a>
        <h1 className="text-xl font-bold">Meta Tag Generator</h1>
      </header>
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 space-y-4">
          {[
            { label: "Page Title", value: title, set: setTitle, placeholder: "My Awesome Website" },
            { label: "Description", value: description, set: setDescription, placeholder: "A short description of your page" },
            { label: "URL", value: url, set: setUrl, placeholder: "https://example.com" },
            { label: "Image URL", value: image, set: setImage, placeholder: "https://example.com/og-image.png" },
          ].map((field) => (
            <div key={field.label}>
              <label className="text-gray-400 text-sm block mb-1">{field.label}</label>
              <input
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                placeholder={field.placeholder}
                value={field.value}
                onChange={(e) => field.set(e.target.value)}
              />
            </div>
          ))}
        </div>
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
          <div className="flex justify-end mb-3">
            <button onClick={copy} className={`px-4 py-1 rounded-lg text-sm transition ${copied ? "bg-green-600" : "bg-gray-700 hover:bg-gray-600"}`}>
              {copied ? "✓ Copied!" : "Copy code"}
            </button>
          </div>
          <pre className="font-mono text-sm text-green-400 whitespace-pre-wrap overflow-x-auto">{code}</pre>
        </div>
      </div>
    </main>
  );
}
