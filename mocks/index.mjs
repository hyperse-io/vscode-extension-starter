export const getGlobalData = async (hostUrl) => {
  return {
    user: {
      id: '1',
      firstName: 'Tian',
      lastName: 'Yingchun',
      emailAddress: 'test@domain.com',
      user: {
        id: '1',
        identifier: 'admin',
        permissions: [],
      },
    },
    menus: [],
    appName: 'vscode-extension',
    elemAclLimits: [],
    defaultPage: `${hostUrl}/pages?env=me`,
    routeBaseName: '/pages/vscode/extensions',
  };
};
