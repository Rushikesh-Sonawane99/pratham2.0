/** @type {import('next').NextConfig} */
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  basePath: '/fields-form-builder', // This should match the path set in Nginx
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig