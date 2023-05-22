// vite.config.js
import { defineConfig } from "file:///Users/mcwachira/Documents/GitHub/techShop/frontend/node_modules/vite/dist/node/index.js";
import react from "file:///Users/mcwachira/Documents/GitHub/techShop/frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8001"
        // changeOrigin: true,
        // secure: false,
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbWN3YWNoaXJhL0RvY3VtZW50cy9HaXRIdWIvdGVjaFNob3AvZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9tY3dhY2hpcmEvRG9jdW1lbnRzL0dpdEh1Yi90ZWNoU2hvcC9mcm9udGVuZC92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvbWN3YWNoaXJhL0RvY3VtZW50cy9HaXRIdWIvdGVjaFNob3AvZnJvbnRlbmQvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlYWN0KCldLFxuXG4gIHNlcnZlcjoge1xuXG4gICAgcHJveHk6IHtcblxuICAgICAgJy9hcGknOiB7XG4gICAgICAgIHRhcmdldDogJ2h0dHA6Ly8xMjcuMC4wLjE6ODAwMScsXG4gICAgICAgIC8vIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgLy8gc2VjdXJlOiBmYWxzZSxcbiAgICAgIH0sXG5cbiAgICB9LFxuICB9XG5cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTJVLFNBQVMsb0JBQW9CO0FBQ3hXLE9BQU8sV0FBVztBQUdsQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFFakIsUUFBUTtBQUFBLElBRU4sT0FBTztBQUFBLE1BRUwsUUFBUTtBQUFBLFFBQ04sUUFBUTtBQUFBO0FBQUE7QUFBQSxNQUdWO0FBQUEsSUFFRjtBQUFBLEVBQ0Y7QUFFRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
