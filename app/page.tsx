export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-400">DevKit</h1>
        <p className="text-gray-400 text-sm">Free tools for developers</p>
      </header>
      <section className="text-center py-20 px-6">
        <h2 className="text-5xl font-bold mb-4">Your Developer Toolbox</h2>
        <p className="text-gray-400 text-xl max-w-xl mx-auto">
          Fast, free, and simple tools for developers. No login required.
        </p>
      </section>
      <section className="max-w-5xl mx-auto px-6 pb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: "JSON Formatter", desc: "Format and validate your JSON instantly", emoji: "📋", href: "/json-formatter" },
          { name: "Color Converter", desc: "Convert HEX, RGB, HSL colors easily", emoji: "🎨", href: "/color-converter" },
          { name: "Regex Tester", desc: "Test your regular expressions in real time", emoji: "🔍", href: "/regex-tester" },
          { name: "Base64 Encoder", desc: "Encode and decode Base64 strings", emoji: "🔐", href: "/base64" },
          { name: "Markdown Preview", desc: "Preview your Markdown live", emoji: "📝", href: "/markdown" },
          { name: "CSS Gradient", desc: "Generate beautiful CSS gradients", emoji: "🌈", href: "/css-gradient" },
          { name: "Password Generator", desc: "Generate secure random passwords", emoji: "🛡️", href: "/password-generator" },
          { name: "Word Counter", desc: "Count words, characters and read time", emoji: "📊", href: "/word-counter" },
          { name: "UUID Generator", desc: "Generate unique UUIDs instantly", emoji: "🔑", href: "/uuid-generator" },
          { name: "HTML Encoder", desc: "Encode and decode HTML entities", emoji: "🌐", href: "/html-encoder" },
          { name: "JWT Decoder", desc: "Decode and inspect JWT tokens", emoji: "🔓", href: "/jwt-decoder" },
          { name: "Timestamp Converter", desc: "Convert Unix timestamps to dates", emoji: "⏰", href: "/timestamp-converter" },
        ].map((tool) => (
          <a key={tool.name} href={tool.href} className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-500 transition cursor-pointer block">
            <div className="text-4xl mb-3">{tool.emoji}</div>
            <h3 className="text-lg font-semibold mb-2">{tool.name}</h3>
            <p className="text-gray-400 text-sm">{tool.desc}</p>
          </a>
        ))}
      </section>
    </main>
  );
}