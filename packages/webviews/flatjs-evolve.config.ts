import {
  defineConfig,
  type EvolveEntryItemOption,
  type EvolveEntryMap,
} from '@flatjs/evolve';
import { createLaunchEditorMiddleware } from '@flatjs/evolve-launch-editor';
const getHeadBeforeScripts = (serveMode: boolean) => {
  return [
    'https://unpkg.com/dayjs@1.11.11/dayjs.min.js',
    ...(serveMode
      ? [
          'https://unpkg.com/react@18.2.0/umd/react.development.js',
          'https://unpkg.com/react-dom@18.2.0/umd/react-dom.development.js',
          'https://unpkg.com/antd@5.17.0/dist/antd.js',
        ]
      : [
          'https://unpkg.com/react@18.2.0/umd/react.production.min.js',
          'https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js',
          'https://unpkg.com/antd@5.17.0/dist/antd.min.js',
        ]),
  ];
};

const getEntryMap = (
  serveMode: boolean,
  modules: Array<{ name: string; options: EvolveEntryItemOption }>
) => {
  const entryMap: EvolveEntryMap = {};
  modules.forEach((module) => {
    entryMap[`${module.name}`] = {
      entry: [`./src/pages/${module.name}/index`],
      options: {
        favicon: '/favicon.ico',
        headBeforeScripts: getHeadBeforeScripts(serveMode),
        ...module.options,
      },
    };
  });
  return entryMap;
};

export default defineConfig((env) => ({
  projectVirtualPath: '',
  devServer: {
    middlewares: [
      createLaunchEditorMiddleware({
        // launchEditor: TrustedEditor.VSCodeInsiders,
      }),
    ],
    mockOptions: {
      port: 8000,
      staticMap: {
        '/static': 'static',
      },
    },
  },
  globalCompilerOptions: {
    runTsChecker: true,
  },
  loaderOptions: {
    pixelOptions: false,
    babelOptions: {
      plugins: [
        [
          // For `@vscode/webview-ui-toolkit/react`
          '@babel/plugin-transform-classes',
          {
            loose: false,
          },
        ],
      ],
    },
    postcssOptions: {
      plugins: [
        [env.resolve(import.meta.url, 'tailwindcss'), {}],
        env.resolve(import.meta.url, 'postcss-preset-env'),
      ],
    },
  },
  multiHtmlCdn: {
    me: ['http://localhost:8000/public/'],
    rc: ['https://file.40017.cn/jinfu/'],
    prod: ['./'],
    ntv: ['https://file.40017.cn/jinfu/'],
  },
  multiHtmlCdnEnvResolver: function envResolver() {
    return ~location.href.indexOf('localhost') ? 'me' : undefined;
  },
  webpack: {
    externals: {
      antd: 'antd',
      dayjs: 'dayjs',
      vscode: 'commonjs vscode',
    },
    minimizer: false,
    enableBundleHashName: env.command === 'serve',
    publicPath: '',
  },
  entryMap: getEntryMap(env.command === 'serve', [
    {
      name: 'dashboard',
      options: {
        title: '', // 'dashboard',
        useRelativeAssetPath: true,
      },
    },
  ]),
}));
