import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Best Practice',
    short_name: 'Best Practice',
    description: 'Best Practice',
    start_url: '/',
    display: 'minimal-ui',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/img/BestPracticeIcon.png',
        sizes: '512x512',  // 実際のサイズを指定
        type: 'image/png',
      },
      {
        src: '/img/BestPracticeIcon.png',
        sizes: '192x192',  // 小さいサイズも用意すると良い
        type: 'image/png',
      },
    ],
  }
}

