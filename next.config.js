/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		// Serve images straight from /public instead of through Vercel's
		// Image Optimization, which has a monthly quota on the free plan.
		// Images are pre-compressed to WebP before they're committed.
		unoptimized: true,
	},
}

module.exports = nextConfig
