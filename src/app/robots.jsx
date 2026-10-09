export default function robots() {
  return {
    rules: {
      userAgent: [
        '*', 
        'Applebot', 
        'Bingbot', 
        'Googlebot', 
        'GPTBot', 
        'Google-Extended', 
        'Claude-Web', 
        'PerplexityBot', 
        'CCBot', 
        'Mediapartners-Google', 
        'AdsBot-Google', 
        'Googlebot-Image', 
        'Googlebot-News', 
        'Googlebot-Video'
      ],
      allow: '/',
      disallow: ['/sudo/', '/sudo', '/api/'],
    },
    sitemap: 'https://subham.digital/sitemap.xml',
  }
}
