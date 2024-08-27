import { defineConfig } from '@flatjs/cli-plugin-ci';

export default defineConfig({
  buildEvolve: {
    publishNow: true,
    packNow: true,
    publishFolder: ['shared'],
    timestamp: 'dynamic',
    cleanNodeModules: true,
  },
  publishFtp: {
    connection: {
      port: 21,
      host: '10.177.54.229',
      user: 'webapps',
      password: 'webapps',
    },
  },
  publishCdn: {
    connection: {
      uploadApi: 'http://apisix.itcjf.com/cicd/file_upload/v1',
      // uploadApi: ' http://172.25.82.62:80/cicd/file_upload/v1',
      headers: {
        apikey: 'AqIRvLZ2xkg0suZ',
        host: 'cicd-prod',
      },
    },
  },
});
