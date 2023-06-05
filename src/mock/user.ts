import Mock from 'mockjs';
import setupMock, {
  successResponseWrap,
  failResponseWrap,
} from '@/utils/setup-mock';

import { MockParams } from '@/types/mock';
import { isLogin } from '@/utils/auth';

setupMock({
  setup() {
    // Mock.XHR.prototype.withCredentials = true;

    // 用户信息
    Mock.mock(new RegExp('/api/user/info'), () => {
      if (isLogin()) {
        const role = window.localStorage.getItem('userRole') || 'root';
        return successResponseWrap({
          name: '王立群',
          avatar:
            '//lf1-xgcdn-tos.pstatp.com/obj/vcloud/vadmin/start.8e0e4855ee346a46ccff8ff3e24db27b.png',
          email: 'wangliqun@email.com',
          job: 'frontend',
          jobName: '前端艺术家',
          organization: 'Frontend',
          organizationName: '前端',
          location: 'beijing',
          locationName: '北京',
          introduction: '人潇洒，性温存',
          personalWebsite: 'https://www.arco.design',
          phone: '150****0000',
          registrationDate: '2013-05-10 12:10:00',
          accountId: '15012312300',
          certification: 1,
          role,
        });
      }
      return failResponseWrap(null, '未登录', 50008);
    });

    // 登录
    Mock.mock(new RegExp('/api/user/login'), (params: MockParams) => {
      const { username, password } = JSON.parse(params.body);
      if (!username) {
        return failResponseWrap(null, '用户名不能为空', 50000);
      }
      if (!password) {
        return failResponseWrap(null, '密码不能为空', 50000);
      }
      if (username === 'root' && password === 'root') {
        window.localStorage.setItem('userRole', 'root');
        return successResponseWrap({
          token: '12345',
        });
      }
      if (username === 'user' && password === 'user') {
        window.localStorage.setItem('userRole', 'user');
        return successResponseWrap({
          token: '54321',
        });
      }
      return failResponseWrap(null, '账号或者密码错误', 50000);
    });

    // 登出
    Mock.mock(new RegExp('/api/user/logout'), () => {
      return successResponseWrap(null);
    });

    // 用户的服务端菜单
    Mock.mock(new RegExp('/api/user/menu'), () => {
      // const menuList = [
      //   {
      //     path: '/dashboard',
      //     name: 'dashboard',
      //     meta: {
      //       locale: 'menu.server.dashboard',
      //       requiresAuth: true,
      //       icon: 'icon-dashboard',
      //       order: 1,
      //     },
      //     children: [
      //       {
      //         path: 'workplace',
      //         name: 'Workplace',
      //         meta: {
      //           locale: 'menu.server.workplace',
      //           requiresAuth: true,
      //         },
      //       },
      //       {
      //         path: 'https://arco.design',
      //         name: 'arcoWebsite',
      //         meta: {
      //           locale: 'menu.arcoWebsite',
      //           requiresAuth: true,
      //         },
      //       },
      //     ],
      //   },
      // ];
      // const menuList = [
      //   {
      //     path: '/',
      //     hidden: false,
      //     component: 'Layout',
      //     children: [
      //       {
      //         name: 'Tenant',
      //         path: 'tenant',
      //         hidden: false,
      //         component: 'tenant/list/index',
      //         meta: {
      //           title: '客户管理',
      //           icon: 'chart',
      //           noCache: true,
      //           link: null,
      //         },
      //       },
      //     ],
      //   },
      //   {
      //     name: 'System',
      //     path: '/system',
      //     hidden: false,
      //     redirect: 'noRedirect',
      //     component: 'Layout',
      //     alwaysShow: true,
      //     meta: {
      //       title: '系统管理',
      //       icon: 'system',
      //       noCache: false,
      //       link: null,
      //     },
      //     children: [
      //       {
      //         name: 'User',
      //         path: 'user',
      //         hidden: false,
      //         component: 'system/user/index',
      //         meta: {
      //           title: '用户管理',
      //           icon: 'user',
      //           noCache: false,
      //           link: null,
      //         },
      //       },
      //       {
      //         name: 'Role',
      //         path: 'role',
      //         hidden: false,
      //         component: 'system/role/index',
      //         meta: {
      //           title: '角色管理',
      //           icon: 'peoples',
      //           noCache: false,
      //           link: null,
      //         },
      //       },
      //       {
      //         name: 'Menu',
      //         path: 'menu',
      //         hidden: false,
      //         component: 'system/menu/index',
      //         meta: {
      //           title: '菜单管理',
      //           icon: 'tree-table',
      //           noCache: false,
      //           link: null,
      //         },
      //       },
      //       {
      //         name: 'Dept',
      //         path: 'dept',
      //         hidden: false,
      //         component: 'system/dept/index',
      //         meta: {
      //           title: '部门管理',
      //           icon: 'tree',
      //           noCache: false,
      //           link: null,
      //         },
      //       },
      //       {
      //         name: 'Post',
      //         path: 'post',
      //         hidden: false,
      //         component: 'system/post/index',
      //         meta: {
      //           title: '岗位管理',
      //           icon: 'post',
      //           noCache: false,
      //           link: null,
      //         },
      //       },
      //     ],
      //   },
      // ];
      const menuList = [
        {}
      ]
      return successResponseWrap(menuList);
    });
  },
});
