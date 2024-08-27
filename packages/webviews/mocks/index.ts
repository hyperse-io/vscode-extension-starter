export const getGlobalData = async (hostUrl: string) => {
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
    appName: 'semic-admin',
    elemAclLimits: [],
    defaultPage: `${hostUrl}/pages/semic/admin-ui/main/setting/users?env=me`,
    routeBaseName: '/pages/semic/admin-ui',
  };
};
