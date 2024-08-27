import { defineConfig } from '@flatjs/mock';

export default defineConfig({
  projectCwd: process.cwd(),
  hostname: 'dev.flatjs.com',
  mockBaseDir: `./mocks`,
  port: 40000,
  chunkSize: 50,
  staticMap: {
    '/static': 'static',
  },
  mockMap: {
    '/export-class': { type: 'REST', defs: ['export-class'], middlewares: {} },
    /**
     * others
     */
    '/*': { type: 'REST', defs: ['others'], middlewares: {} },
  },
});
