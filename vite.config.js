import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        academics: resolve(__dirname, 'academics.html'),
        admissions: resolve(__dirname, 'admissions.html'),
        campus: resolve(__dirname, 'campus.html'),
        studentLife: resolve(__dirname, 'student-life.html'),
        contact: resolve(__dirname, 'contact.html'),
        news: resolve(__dirname, 'news.html'),
        careers: resolve(__dirname, 'careers.html'),
        legal: resolve(__dirname, 'legal.html')
      }
    }
  }
});
