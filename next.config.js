/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
output: 'export',
images: {
unoptimized: true,
domains: ['localhost'],
  },
eslint: {

ignoreDuringBuilds: true
},
  typescript:{
ignoreBuildErrors: true,
},
 
};

module.exports = nextConfig
