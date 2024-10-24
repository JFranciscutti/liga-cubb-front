import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import svgrPlugin from 'vite-plugin-svgr';
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths(), VitePWA(), svgrPlugin()],
  server: {
    port: 5173,
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
  },
  //base: '/liga-cubb-front/',
});
