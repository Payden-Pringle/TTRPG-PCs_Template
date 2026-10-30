module.exports = {
  async rewrites() {
    return [{ source: '/', destination: '/home' }]
  },
  async redirects() {
    return [
      { source: '/about-me', destination: '/about', permanent: true },
      { source: '/ttrpgs/about-me', destination: '/about', permanent: true },
      { source: '/session-0', destination: '/ttrpgs/session-0', permanent: true },
    ]
  },
}
