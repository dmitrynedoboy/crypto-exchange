/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  env: {
    API_CURR_LIST:
      'https://api.changenow.io/v1/currencies?active=true&fixedRate=true',
    API_MIN_AMOUNT: 'https://api.changenow.io/v1/min-amount/',
    API_ESTIMATED_AMOUNT: 'https://api.changenow.io/v1/exchange-amount/',
    API_KEY: 'c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd'
  },
  reactStrictMode: false,
  images: {
    domains: ['content-api.changenow.io']
  }
};

module.exports = nextConfig;
