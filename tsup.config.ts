import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/server.ts'],
  outDir: 'build',
  format: ['cjs'],
  target: 'es2020',
  splitting: false,
  sourcemap: true,
  clean: true,
  shims: false,
  dts: false,
  esbuildOptions(options) {
    options.loader = {
      ...options.loader,
      '.sql': 'text',
    }
  },
})
