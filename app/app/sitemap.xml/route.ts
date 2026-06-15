import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://devkit-inky.vercel.app'

  const tools = [
    'json-formatter',
    'color-converter',
    'regex-tester',
    'base64',
    'markdown',
    'css-gradient',
    'password-generator',
    'word-counter',
    'uuid-generator',
    'html-encoder',
    'jwt-decoder',
    'timestamp-converter',
  ]

  const lastmod = new Date().toISOString()

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
${tools.map((tool) => `  <url>
    <loc>${baseUrl}/${tool}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}