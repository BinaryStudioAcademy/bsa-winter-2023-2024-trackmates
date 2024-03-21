// vite.config.ts
import reactPlugin from "file:///F:/A%20PROJECT/bsa-winter-2023-2024-trackmates/node_modules/@vitejs/plugin-react/dist/index.mjs";
import browserslist from "file:///F:/A%20PROJECT/bsa-winter-2023-2024-trackmates/node_modules/browserslist/index.js";
import { Features, browserslistToTargets } from "file:///F:/A%20PROJECT/bsa-winter-2023-2024-trackmates/node_modules/lightningcss/node/index.mjs";
import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "file:///F:/A%20PROJECT/bsa-winter-2023-2024-trackmates/node_modules/vite/dist/node/index.js";
import { VitePWA } from "file:///F:/A%20PROJECT/bsa-winter-2023-2024-trackmates/node_modules/vite-plugin-pwa/dist/index.js";
import svgr from "file:///F:/A%20PROJECT/bsa-winter-2023-2024-trackmates/node_modules/vite-plugin-svgr/dist/index.js";
var __vite_injected_original_import_meta_url = "file:///F:/A%20PROJECT/bsa-winter-2023-2024-trackmates/apps/frontend/vite.config.ts";
var config = ({ mode }) => {
  const {
    VITE_APP_API_ORIGIN_URL,
    VITE_APP_DEVELOPMENT_PORT,
    VITE_APP_PROXY_SERVER_URL
  } = loadEnv(mode, process.cwd());
  const vitePWA = VitePWA({
    devOptions: {
      enabled: true
    },
    manifest: {
      description: "TrackMates \u2014 keep an eye on your learning progress and track the progress of your friends as you navigate through courses together!",
      icons: [
        {
          sizes: "192x192",
          src: "/assets/android-chrome-192x192.png",
          type: "image/png"
        },
        {
          sizes: "512x512",
          src: "/assets/android-chrome-512x512.png",
          type: "image/png"
        },
        {
          sizes: "16x16",
          src: "/assets/favicon-16x16.png",
          type: "image/png"
        },
        {
          sizes: "32x32",
          src: "/assets/favicon-32x32.png",
          type: "image/png"
        }
      ],
      name: "TrackMates",
      screenshots: [
        {
          form_factor: "wide",
          sizes: "1274x810",
          src: "/assets/screen-desk-first.jpg",
          type: "image/jpg"
        },
        {
          form_factor: "wide",
          sizes: "1274x810",
          src: "/assets/screen-desk-second.jpg",
          type: "image/jpg"
        },
        {
          form_factor: "wide",
          sizes: "1274x810",
          src: "/assets/screen-desk-third.jpg",
          type: "image/jpg"
        },
        {
          sizes: "768x488",
          src: "/assets/screen-desk-fourth.jpg",
          type: "image/jpg"
        }
      ],
      short_name: "TrackMNates",
      theme_color: "#0b372f"
    },
    outDir: "build",
    registerType: "autoUpdate",
    workbox: {
      navigateFallbackDenylist: [/\/v1\/documentation(\/static\/index\.html)?/]
    }
  });
  return defineConfig({
    build: {
      cssMinify: "lightningcss",
      outDir: "build"
    },
    css: {
      lightningcss: {
        drafts: {
          customMedia: true
        },
        include: Features.MediaQueries,
        targets: browserslistToTargets(
          browserslist(["last 2 version", "not dead"])
        )
      },
      transformer: "lightningcss"
    },
    plugins: [reactPlugin(), svgr(), vitePWA],
    resolve: {
      alias: [
        {
          find: "~",
          replacement: fileURLToPath(new URL("src", __vite_injected_original_import_meta_url))
        }
      ]
    },
    server: {
      port: Number(VITE_APP_DEVELOPMENT_PORT),
      proxy: {
        [VITE_APP_API_ORIGIN_URL]: {
          changeOrigin: true,
          target: VITE_APP_PROXY_SERVER_URL
        }
      }
    }
  });
};
var vite_config_default = config;
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxBIFBST0pFQ1RcXFxcYnNhLXdpbnRlci0yMDIzLTIwMjQtdHJhY2ttYXRlc1xcXFxhcHBzXFxcXGZyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJGOlxcXFxBIFBST0pFQ1RcXFxcYnNhLXdpbnRlci0yMDIzLTIwMjQtdHJhY2ttYXRlc1xcXFxhcHBzXFxcXGZyb250ZW5kXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9GOi9BJTIwUFJPSkVDVC9ic2Etd2ludGVyLTIwMjMtMjAyNC10cmFja21hdGVzL2FwcHMvZnJvbnRlbmQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3RQbHVnaW4gZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5pbXBvcnQgYnJvd3NlcnNsaXN0IGZyb20gXCJicm93c2Vyc2xpc3RcIjtcbmltcG9ydCB7IEZlYXR1cmVzLCBicm93c2Vyc2xpc3RUb1RhcmdldHMgfSBmcm9tIFwibGlnaHRuaW5nY3NzXCI7XG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoIH0gZnJvbSBcIm5vZGU6dXJsXCI7XG5pbXBvcnQgeyB0eXBlIENvbmZpZ0VudiwgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tIFwidml0ZS1wbHVnaW4tcHdhXCI7XG5pbXBvcnQgc3ZnciBmcm9tIFwidml0ZS1wbHVnaW4tc3ZnclwiO1xuXG5jb25zdCBjb25maWcgPSAoeyBtb2RlIH06IENvbmZpZ0Vudik6IFJldHVyblR5cGU8dHlwZW9mIGRlZmluZUNvbmZpZz4gPT4ge1xuXHRjb25zdCB7XG5cdFx0VklURV9BUFBfQVBJX09SSUdJTl9VUkwsXG5cdFx0VklURV9BUFBfREVWRUxPUE1FTlRfUE9SVCxcblx0XHRWSVRFX0FQUF9QUk9YWV9TRVJWRVJfVVJMLFxuXHR9ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKTtcblxuXHRjb25zdCB2aXRlUFdBID0gVml0ZVBXQSh7XG5cdFx0ZGV2T3B0aW9uczoge1xuXHRcdFx0ZW5hYmxlZDogdHJ1ZSxcblx0XHR9LFxuXHRcdG1hbmlmZXN0OiB7XG5cdFx0XHRkZXNjcmlwdGlvbjpcblx0XHRcdFx0XCJUcmFja01hdGVzIFx1MjAxNCBrZWVwIGFuIGV5ZSBvbiB5b3VyIGxlYXJuaW5nIHByb2dyZXNzIGFuZCB0cmFjayB0aGUgcHJvZ3Jlc3Mgb2YgeW91ciBmcmllbmRzIGFzIHlvdSBuYXZpZ2F0ZSB0aHJvdWdoIGNvdXJzZXMgdG9nZXRoZXIhXCIsXG5cdFx0XHRpY29uczogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0c2l6ZXM6IFwiMTkyeDE5MlwiLFxuXHRcdFx0XHRcdHNyYzogXCIvYXNzZXRzL2FuZHJvaWQtY2hyb21lLTE5MngxOTIucG5nXCIsXG5cdFx0XHRcdFx0dHlwZTogXCJpbWFnZS9wbmdcIixcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHNpemVzOiBcIjUxMng1MTJcIixcblx0XHRcdFx0XHRzcmM6IFwiL2Fzc2V0cy9hbmRyb2lkLWNocm9tZS01MTJ4NTEyLnBuZ1wiLFxuXHRcdFx0XHRcdHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRzaXplczogXCIxNngxNlwiLFxuXHRcdFx0XHRcdHNyYzogXCIvYXNzZXRzL2Zhdmljb24tMTZ4MTYucG5nXCIsXG5cdFx0XHRcdFx0dHlwZTogXCJpbWFnZS9wbmdcIixcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHNpemVzOiBcIjMyeDMyXCIsXG5cdFx0XHRcdFx0c3JjOiBcIi9hc3NldHMvZmF2aWNvbi0zMngzMi5wbmdcIixcblx0XHRcdFx0XHR0eXBlOiBcImltYWdlL3BuZ1wiLFxuXHRcdFx0XHR9LFxuXHRcdFx0XSxcblx0XHRcdG5hbWU6IFwiVHJhY2tNYXRlc1wiLFxuXHRcdFx0c2NyZWVuc2hvdHM6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGZvcm1fZmFjdG9yOiBcIndpZGVcIixcblx0XHRcdFx0XHRzaXplczogXCIxMjc0eDgxMFwiLFxuXHRcdFx0XHRcdHNyYzogXCIvYXNzZXRzL3NjcmVlbi1kZXNrLWZpcnN0LmpwZ1wiLFxuXHRcdFx0XHRcdHR5cGU6IFwiaW1hZ2UvanBnXCIsXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRmb3JtX2ZhY3RvcjogXCJ3aWRlXCIsXG5cdFx0XHRcdFx0c2l6ZXM6IFwiMTI3NHg4MTBcIixcblx0XHRcdFx0XHRzcmM6IFwiL2Fzc2V0cy9zY3JlZW4tZGVzay1zZWNvbmQuanBnXCIsXG5cdFx0XHRcdFx0dHlwZTogXCJpbWFnZS9qcGdcIixcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGZvcm1fZmFjdG9yOiBcIndpZGVcIixcblx0XHRcdFx0XHRzaXplczogXCIxMjc0eDgxMFwiLFxuXHRcdFx0XHRcdHNyYzogXCIvYXNzZXRzL3NjcmVlbi1kZXNrLXRoaXJkLmpwZ1wiLFxuXHRcdFx0XHRcdHR5cGU6IFwiaW1hZ2UvanBnXCIsXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRzaXplczogXCI3Njh4NDg4XCIsXG5cdFx0XHRcdFx0c3JjOiBcIi9hc3NldHMvc2NyZWVuLWRlc2stZm91cnRoLmpwZ1wiLFxuXHRcdFx0XHRcdHR5cGU6IFwiaW1hZ2UvanBnXCIsXG5cdFx0XHRcdH0sXG5cdFx0XHRdLFxuXHRcdFx0c2hvcnRfbmFtZTogXCJUcmFja01OYXRlc1wiLFxuXHRcdFx0dGhlbWVfY29sb3I6IFwiIzBiMzcyZlwiLFxuXHRcdH0sXG5cdFx0b3V0RGlyOiBcImJ1aWxkXCIsXG5cdFx0cmVnaXN0ZXJUeXBlOiBcImF1dG9VcGRhdGVcIixcblx0XHR3b3JrYm94OiB7XG5cdFx0XHRuYXZpZ2F0ZUZhbGxiYWNrRGVueWxpc3Q6IFsvXFwvdjFcXC9kb2N1bWVudGF0aW9uKFxcL3N0YXRpY1xcL2luZGV4XFwuaHRtbCk/L10sXG5cdFx0fSxcblx0fSk7XG5cblx0cmV0dXJuIGRlZmluZUNvbmZpZyh7XG5cdFx0YnVpbGQ6IHtcblx0XHRcdGNzc01pbmlmeTogXCJsaWdodG5pbmdjc3NcIixcblx0XHRcdG91dERpcjogXCJidWlsZFwiLFxuXHRcdH0sXG5cdFx0Y3NzOiB7XG5cdFx0XHRsaWdodG5pbmdjc3M6IHtcblx0XHRcdFx0ZHJhZnRzOiB7XG5cdFx0XHRcdFx0Y3VzdG9tTWVkaWE6IHRydWUsXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGluY2x1ZGU6IEZlYXR1cmVzLk1lZGlhUXVlcmllcyxcblx0XHRcdFx0dGFyZ2V0czogYnJvd3NlcnNsaXN0VG9UYXJnZXRzKFxuXHRcdFx0XHRcdGJyb3dzZXJzbGlzdChbXCJsYXN0IDIgdmVyc2lvblwiLCBcIm5vdCBkZWFkXCJdKSxcblx0XHRcdFx0KSxcblx0XHRcdH0sXG5cdFx0XHR0cmFuc2Zvcm1lcjogXCJsaWdodG5pbmdjc3NcIixcblx0XHR9LFxuXHRcdHBsdWdpbnM6IFtyZWFjdFBsdWdpbigpLCBzdmdyKCksIHZpdGVQV0FdLFxuXHRcdHJlc29sdmU6IHtcblx0XHRcdGFsaWFzOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRmaW5kOiBcIn5cIixcblx0XHRcdFx0XHRyZXBsYWNlbWVudDogZmlsZVVSTFRvUGF0aChuZXcgVVJMKFwic3JjXCIsIGltcG9ydC5tZXRhLnVybCkpLFxuXHRcdFx0XHR9LFxuXHRcdFx0XSxcblx0XHR9LFxuXHRcdHNlcnZlcjoge1xuXHRcdFx0cG9ydDogTnVtYmVyKFZJVEVfQVBQX0RFVkVMT1BNRU5UX1BPUlQpLFxuXHRcdFx0cHJveHk6IHtcblx0XHRcdFx0W1ZJVEVfQVBQX0FQSV9PUklHSU5fVVJMIGFzIHN0cmluZ106IHtcblx0XHRcdFx0XHRjaGFuZ2VPcmlnaW46IHRydWUsXG5cdFx0XHRcdFx0dGFyZ2V0OiBWSVRFX0FQUF9QUk9YWV9TRVJWRVJfVVJMLFxuXHRcdFx0XHR9LFxuXHRcdFx0fSxcblx0XHR9LFxuXHR9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNFcsT0FBTyxpQkFBaUI7QUFDcFksT0FBTyxrQkFBa0I7QUFDekIsU0FBUyxVQUFVLDZCQUE2QjtBQUNoRCxTQUFTLHFCQUFxQjtBQUM5QixTQUF5QixjQUFjLGVBQWU7QUFDdEQsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sVUFBVTtBQU5vTixJQUFNLDJDQUEyQztBQVF0UixJQUFNLFNBQVMsQ0FBQyxFQUFFLEtBQUssTUFBa0Q7QUFDeEUsUUFBTTtBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0QsSUFBSSxRQUFRLE1BQU0sUUFBUSxJQUFJLENBQUM7QUFFL0IsUUFBTSxVQUFVLFFBQVE7QUFBQSxJQUN2QixZQUFZO0FBQUEsTUFDWCxTQUFTO0FBQUEsSUFDVjtBQUFBLElBQ0EsVUFBVTtBQUFBLE1BQ1QsYUFDQztBQUFBLE1BQ0QsT0FBTztBQUFBLFFBQ047QUFBQSxVQUNDLE9BQU87QUFBQSxVQUNQLEtBQUs7QUFBQSxVQUNMLE1BQU07QUFBQSxRQUNQO0FBQUEsUUFDQTtBQUFBLFVBQ0MsT0FBTztBQUFBLFVBQ1AsS0FBSztBQUFBLFVBQ0wsTUFBTTtBQUFBLFFBQ1A7QUFBQSxRQUNBO0FBQUEsVUFDQyxPQUFPO0FBQUEsVUFDUCxLQUFLO0FBQUEsVUFDTCxNQUFNO0FBQUEsUUFDUDtBQUFBLFFBQ0E7QUFBQSxVQUNDLE9BQU87QUFBQSxVQUNQLEtBQUs7QUFBQSxVQUNMLE1BQU07QUFBQSxRQUNQO0FBQUEsTUFDRDtBQUFBLE1BQ0EsTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLFFBQ1o7QUFBQSxVQUNDLGFBQWE7QUFBQSxVQUNiLE9BQU87QUFBQSxVQUNQLEtBQUs7QUFBQSxVQUNMLE1BQU07QUFBQSxRQUNQO0FBQUEsUUFDQTtBQUFBLFVBQ0MsYUFBYTtBQUFBLFVBQ2IsT0FBTztBQUFBLFVBQ1AsS0FBSztBQUFBLFVBQ0wsTUFBTTtBQUFBLFFBQ1A7QUFBQSxRQUNBO0FBQUEsVUFDQyxhQUFhO0FBQUEsVUFDYixPQUFPO0FBQUEsVUFDUCxLQUFLO0FBQUEsVUFDTCxNQUFNO0FBQUEsUUFDUDtBQUFBLFFBQ0E7QUFBQSxVQUNDLE9BQU87QUFBQSxVQUNQLEtBQUs7QUFBQSxVQUNMLE1BQU07QUFBQSxRQUNQO0FBQUEsTUFDRDtBQUFBLE1BQ0EsWUFBWTtBQUFBLE1BQ1osYUFBYTtBQUFBLElBQ2Q7QUFBQSxJQUNBLFFBQVE7QUFBQSxJQUNSLGNBQWM7QUFBQSxJQUNkLFNBQVM7QUFBQSxNQUNSLDBCQUEwQixDQUFDLDZDQUE2QztBQUFBLElBQ3pFO0FBQUEsRUFDRCxDQUFDO0FBRUQsU0FBTyxhQUFhO0FBQUEsSUFDbkIsT0FBTztBQUFBLE1BQ04sV0FBVztBQUFBLE1BQ1gsUUFBUTtBQUFBLElBQ1Q7QUFBQSxJQUNBLEtBQUs7QUFBQSxNQUNKLGNBQWM7QUFBQSxRQUNiLFFBQVE7QUFBQSxVQUNQLGFBQWE7QUFBQSxRQUNkO0FBQUEsUUFDQSxTQUFTLFNBQVM7QUFBQSxRQUNsQixTQUFTO0FBQUEsVUFDUixhQUFhLENBQUMsa0JBQWtCLFVBQVUsQ0FBQztBQUFBLFFBQzVDO0FBQUEsTUFDRDtBQUFBLE1BQ0EsYUFBYTtBQUFBLElBQ2Q7QUFBQSxJQUNBLFNBQVMsQ0FBQyxZQUFZLEdBQUcsS0FBSyxHQUFHLE9BQU87QUFBQSxJQUN4QyxTQUFTO0FBQUEsTUFDUixPQUFPO0FBQUEsUUFDTjtBQUFBLFVBQ0MsTUFBTTtBQUFBLFVBQ04sYUFBYSxjQUFjLElBQUksSUFBSSxPQUFPLHdDQUFlLENBQUM7QUFBQSxRQUMzRDtBQUFBLE1BQ0Q7QUFBQSxJQUNEO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDUCxNQUFNLE9BQU8seUJBQXlCO0FBQUEsTUFDdEMsT0FBTztBQUFBLFFBQ04sQ0FBQyx1QkFBaUMsR0FBRztBQUFBLFVBQ3BDLGNBQWM7QUFBQSxVQUNkLFFBQVE7QUFBQSxRQUNUO0FBQUEsTUFDRDtBQUFBLElBQ0Q7QUFBQSxFQUNELENBQUM7QUFDRjtBQUVBLElBQU8sc0JBQVE7IiwKICAibmFtZXMiOiBbXQp9Cg==
