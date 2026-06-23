import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://devkit-inky.vercel.app";

  const tools = [
    "json-formatter", "color-converter", "regex-tester",
    "base64", "markdown", "css-gradient", "password-generator",
    "word-counter", "uuid-generator", "html-encoder",
    "jwt-decoder", "timestamp-converter", "lorem-ipsum",
    "qr-code", "case-converter", "url-encoder", "base-converter",
    "diff-checker", "slug-generator", "csv-to-json", "meta-tags",
    "char-limit", "favicon-checker", "my-ip", "text-to-binary",
    "bmi-calculator", "percentage-calculator", "age-calculator",
    "hash-generator", "color-palette", "box-shadow", "random-number",
  ];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...tools.map((tool) => ({
      url: `${baseUrl}/${tool}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}