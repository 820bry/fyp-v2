import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// pwa
import { VitePWA } from "vite-plugin-pwa"


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), 
    VitePWA({
      registerType:'autoUpdate',
      devOptions: {
        enabled: true,
        type: 'module'
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      manifest:{
        name:"MentalQuest - Mental Health Support System",
        short_name:"MentalQuest",
        description:"A Mental Health Support System for a Final Year Project",
        theme_color: "#ffffff",
        display: "standalone",  
        icons:[
          {  
            src: '/pwa-192x192.png',  
            sizes: '192x192',  
            type: 'image/png',  
          },  
          {  
            src: '/pwa-512x512.png',  
            sizes: '512x512',  
            type: 'image/png',  
          },  
          {  
            src: '/pwa-512x512.png',  
            sizes: '512x512',  
            type: 'image/png',  
            purpose: 'maskable',  
          },],
      }
    })],
})