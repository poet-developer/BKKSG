/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },

  images: {
    domains: ['https://bkksg-images.s3.ap-northeast-2.amazonaws.com/ProjectImages_highquality/bkksg_thumbnail.png'],
  },
  
}

module.exports = nextConfig
 