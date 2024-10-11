export default {
  base: './',
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_BACKEND_URL, // Use environment variable
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    sourcemap: true, // Enable source maps in production
  },
};
