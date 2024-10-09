export default {
  base: './', // 
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Points to backend server for development
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Rewrites /api to the root path
      },
    },
  },
};
