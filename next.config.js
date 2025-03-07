const nextConfig = {
	// image config while using remote images
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'epic.gsfc.nasa.gov',
				port: '',
				pathname: '/archive/**',
				search: ''
			}
		]
	},
	webpack: (config) => {
		config.externals.push({
			harperdb: 'commonjs harperdb',
		});

		return config;
	},
};

export default nextConfig;