import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  defineConfig,
  type EvolveEntryItemOption,
  type EvolveEntryMap,
} from '@flatjs/evolve';

const projectCwd = process.cwd();

const privateKey = readFileSync(
  resolve(projectCwd, './certificate/127.0.0.1+15-key.pem'),
  'utf8'
);
const certificate = readFileSync(
  resolve(projectCwd, './certificate/127.0.0.1+15.pem'),
  'utf8'
);

const getHeadBeforeScripts = (serveMode: boolean) => {
  return [
    'https://file.40017.cn/tcsk/react/dayjs@1.11.11/dayjs.min.js',
    ...(serveMode
      ? [
          'https://file.40017.cn/tcsk/react/react@18.2.0/react.development.js',
          'https://file.40017.cn/tcsk/react/react-dom@18.2.0/react-dom.development.js',
          'https://file.40017.cn/tcsk/react/antd@5.17.0/antd.js',
        ]
      : [
          'https://file.40017.cn/tcsk/react/react@18.2.0/react.production.min.js',
          'https://file.40017.cn/tcsk/react/react-dom@18.2.0/react-dom.production.min.js',
          'https://file.40017.cn/tcsk/react/antd@5.17.0/antd.min.js',
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
  projectVirtualPath: `semic/admin-ui`,
  devServer: {
    https: {
      key: privateKey,
      cert: certificate,
    },
    webSocketURL: {
      hostname: 'oss.kzfoo.com',
    },
    mockOptions: {
      port: 8000,
      staticMap: {
        '/static': 'static',
      },
      proxyMap: {
        '/proxy': {
          // target: 'https://service.kzfinc.com/admin-api',
          target: 'http://localhost:3001/admin-api',
          pathRewrite: { '^/proxy': '' },
          router() {
            // switch (req.query.env) {
            //   case 'me':
            //     return 'http://dev.flatjs.com:4000';
            // }
            return 'http://localhost:3001/admin-api';
            // return 'https://service.kzfinc.com/admin-api';
          },
        },
      },
    },
    defaultServeGlobalData: async (_entry, hostUrl) => {
      return {};
    },
  },
  loaderOptions: {
    pixelOptions: false,
    postcssOptions: {
      plugins: [
        [env.resolve(import.meta.url, 'tailwindcss'), {}],
        env.resolve(import.meta.url, 'postcss-preset-env'),
      ],
    },
    modularImports: [
      {
        libraryName: '@ant-design/icons',
        libraryDirectory: 'es/icons',
        transformToDefaultImport: true,
        camel2DashComponentName: false, // default: true
      },
      {
        libraryName: '@wove/react',
        libraryDirectory: 'cjs',
      },
      {
        libraryName: '@dimjs/secure',
        libraryDirectory: 'cjs',
      },
      {
        libraryName: '@dimjs/lang',
        libraryDirectory: 'cjs',
      },
      {
        libraryName: '@dimjs/utils',
        libraryDirectory: 'cjs',
      },
    ],
  },
  multiHtmlCdn: {
    me: ['http://localhost:8000/public/'],
    rc: ['https://file.40017.cn/jinfu/'],
    prod: ['https://file.40017.cn/jinfu/'],
  },
  multiHtmlCdnEnvResolver: function envResolver() {
    return ~location.href.indexOf('localhost') ? 'me' : undefined;
  },
  webpack: {
    externals: {
      antd: 'antd',
      dayjs: 'dayjs',
    },
    resolve: {
      alias: {
        style: resolve(projectCwd, './src/style'),
        theme: resolve(projectCwd, './src/layout/theme'),
      },
    },
  },
  globalCompilerOptions: {
    runTsChecker: true,
  },
  entryMap: getEntryMap(env.command === 'serve', [
    {
      name: 'dashboard',
      options: {
        title: '', // 'dashboard',
      },
    },
    {
      name: 'erms/supplier',
      options: {
        title: '', // `企业资源管理系统-供应商`,
      },
    },
    {
      name: 'erms/supplier-order-line-process',
      options: {
        title: '', // '企业资源管理系统-订单加工单',
      },
    },
    {
      name: 'erms/supplier-order-line-process-partner-lens',
      options: {
        title: '', // '企业资源管理系统-外部镜片提供商',
      },
    },
    {
      name: 'erms/supplier-order-line-process-partner-processor',
      options: {
        title: '', // '企业资源管理系统-外部加工中心',
      },
    },
    {
      name: 'erms/supplier-order-line-process-printer',
      options: {
        title: '', // '企业资源管理系统-加工单打印',
        serveModuleTemplate: './templates/module-printer.html',
        templatePath: 'templates/index-{0}.html',
      },
    },
    {
      name: 'erms/supplier-stock',
      options: {
        title: '', // '企业资源管理系统-商品库存搜索',
      },
    },
    {
      name: 'erms/supplier-stock-history',
      options: {
        title: '', // '企业资源管理系统-库存日志管理',
      },
    },
    {
      name: 'erms/supplier-stock-insufficient',
      options: {
        title: '', // '企业资源管理系统-商品采购管理',
      },
    },
    {
      name: 'erms/supplier-stock-sufficient',
      options: {
        title: '', // '企业资源管理系统-商品可售库存',
      },
    },
    {
      name: 'erms/supplier-stock-in-transit',
      options: {
        title: '', // '企业资源管理系统-在途库存管理',
      },
    },
    {
      name: 'login',
      options: {
        title: '', // '管理员登陆',
      },
    },
    {
      name: 'main',
      options: {
        title: '', // '框架Main',
      },
    },
    {
      name: 'module/menu',
      options: {
        title: '', // '模块管理-菜单模块',
      },
    },
    {
      name: 'module/normal',
      options: {
        title: '', // '模块管理-普通模块',
      },
    },
    {
      name: 'module/channel',
      options: {
        title: '', // '模块管理-模块渠道',
      },
    },
    {
      name: 'module/template',
      options: {
        title: '', // '模块管理-模版上传',
      },
    },
    {
      name: 'front/catalog/favorite',
      options: {
        title: '', // '前端平台-收藏夹',
      },
    },
    {
      name: 'front/invoice/configuration',
      options: {
        title: '', // '前端平台-发票配置管理',
      },
    },
    {
      name: 'front/invoice/download',
      options: {
        title: '', // '前端平台-发票下载管理',
      },
    },
    {
      name: 'front/review',
      options: {
        title: '', // '产品评论',
      },
    },
    {
      name: 'front/sitemap',
      options: {
        title: '', // '站点地图',
      },
    },
    {
      name: 'front/feed',
      options: {
        title: '', // 'RSS',
      },
    },
    {
      name: 'front/sales/orders',
      options: {
        title: '', // '销售订单',
      },
    },
    {
      name: 'front/tools/usually',
      options: {
        title: '', // '辅助工具',
      },
    },
    {
      name: 'front/tools/editor',
      options: {
        title: '', // '辅助编辑器工具',
      },
    },
    {
      name: 'front/topic/topic-link',
      options: {
        title: '', // '专题页链接',
      },
    },
    {
      name: 'front/topic/article',
      options: {
        title: '', // '专题页文章',
      },
    },
    {
      name: 'front/lens/process-template',
      options: {
        title: '', // '镜片流程-流程模板',
      },
    },
    {
      name: 'front/lens/process-config',
      options: {
        title: '', // '镜片流程-流程配置',
      },
    },
    {
      name: 'front/lens/process-option',
      options: {
        title: '', // '镜片流程-流程选项',
      },
    },
    {
      name: 'front/lens/rx-config',
      options: {
        title: '', // '镜片流程-处方配置',
      },
    },
    {
      name: 'marketing/banner',
      options: {
        title: '', // '市场营销-横幅广告',
      },
    },
    {
      name: 'marketing/view-widget',
      options: {
        title: '', // '市场营销-自定义动态 UI widget',
      },
    },
    {
      name: 'marketing/campaign/coupon',
      options: {
        title: '', // '市场营销-活动优惠券',
      },
    },
    {
      name: 'marketing/campaign/setting',
      options: {
        title: '', // '市场营销-活动配置',
      },
    },
    {
      name: 'marketing/subscription/mails',
      options: {
        title: '', // '市场营销-订阅邮箱管理',
      },
    },
    {
      name: 'marketing/subscription/facet',
      options: {
        title: '', // '市场营销-订阅特征管理',
      },
    },
    {
      name: 'marketing/edm/edm-group',
      options: {
        title: '', // '市场营销-邮件分组管理',
      },
    },
    {
      name: 'marketing/edm/edm-resolver-method',
      options: {
        title: '', // '市场营销-邮件数据解析方式管理',
      },
    },
    {
      name: 'marketing/edm/send-email',
      options: {
        title: '', // '市场营销-单邮件发送',
      },
    },
    {
      name: 'marketing/edm/edm-task',
      options: {
        title: '', // '市场营销-邮件任务管理',
      },
    },
    {
      name: 'marketing/edm/edm-template',
      options: {
        title: '', // '市场营销-邮件模板管理',
      },
    },
    {
      name: 'marketing/edm/edm-template-type',
      options: {
        title: '', // '市场营销-邮件模板分类',
      },
    },
    {
      name: 'marketing/tools/utm-builder',
      options: {
        title: '', // '市场营销-UTM地址生成器',
      },
    },
    {
      name: 'marketing/gift-card/card-list',
      options: {
        title: '', // '市场营销-礼品卡列表',
      },
    },
    {
      name: 'marketing/gift-card/card-config',
      options: {
        title: '', // '市场营销-礼品卡配置',
      },
    },
    {
      name: 'marketing/reporting',
      options: {
        title: '', // '市场营销-报表下载',
      },
    },
    {
      name: 'marketing/setting',
      options: {
        title: '', // '市场营销-前端配置',
      },
    },
    {
      name: 'marketing/search/ranking-config',
      options: {
        title: '', // '市场营销-搜索服务-排名配置',
      },
    },
    {
      name: 'marketing/search/ranking-task',
      options: {
        title: '', // '市场营销-搜索服务-排名任务',
      },
    },
    {
      name: 'support/contactus',
      options: {
        title: '', // '支撑平台-联系我们',
      },
    },
    {
      name: 'support/order-item',
      options: {
        title: '', // '支撑平台-订单信息',
      },
    },
    {
      name: 'support/order-place-assistant',
      options: {
        title: '', // '支撑平台-代下单',
      },
    },
    {
      name: 'support/reward-points',
      options: {
        title: '', // '支撑平台-reward-points',
      },
    },
    {
      name: 'support/user-rx',
      options: {
        title: '', // '支撑平台-用户处方管理',
      },
    },
    {
      name: 'support/risk',
      options: {
        title: '', // '支撑平台-风控管理',
      },
    },
    {
      name: 'support/help/collection',
      options: {
        title: '', // '帮助中心-分类管理',
      },
    },
    {
      name: 'support/help/tag',
      options: {
        title: '', // '帮助中心-标签管理',
      },
    },
    {
      name: 'support/help/hot-search',
      options: {
        title: '', // '帮助中心-帮助热搜',
      },
    },
    {
      name: 'support/help/article',
      options: {
        title: '', // '帮助中心-文章管理',
      },
    },
    {
      name: 'financial/ads-fee',
      options: {
        title: '', // '财务管理-营销费管理',
      },
    },
    {
      name: 'financial/reporting-config',
      options: {
        title: '', // '财务管理-报表配置',
      },
    },
    {
      name: 'financial/reporting-order-item',
      options: {
        title: '', // '财务管理-订单日报表',
      },
    },
    {
      name: 'financial/reporting-order-daily',
      options: {
        title: '', // '财务管理-运营月报表',
      },
    },
  ]),
}));
