import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Active Hub',
    short_name: 'ActiveHub',
    description: 'מצא פעילויות ספורט בקהילה שלך עם Active Hub.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f2f2f2', // Light gray background
    theme_color: '#3498db', // Calming blue primary
    icons: [
      {
        src: '/icon-192x192.png', // Placeholder, actual icon needed
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png', // Placeholder, actual icon needed
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    dir: 'rtl',
    lang: 'he-IL',
  }
}
