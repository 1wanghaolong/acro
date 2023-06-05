import { defineStore } from 'pinia';
import {
  login as userLogin,
  logout as userLogout,
  getUserInfo,
  LoginData,
} from '@/api/user';
import { setToken, clearToken } from '@/utils/auth';
import { removeRouteListener } from '@/utils/route-listener';
import { UserState } from './types';
import useAppStore from '../app';
import { encrypt } from "@/utils/rsaEncrypt";

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    name: undefined,
    avatar: undefined,
    job: undefined,
    organization: undefined,
    location: undefined,
    email: undefined,
    introduction: undefined,
    personalWebsite: undefined,
    jobName: undefined,
    organizationName: undefined,
    locationName: undefined,
    phone: undefined,
    registrationDate: undefined,
    accountId: undefined,
    certification: undefined,
    roles: '',
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state };
    },
  },

  actions: {
    switchRoles() {
      return new Promise((resolve) => {
        this.roles = this.roles === 'user' ? 'root' : 'user';
        resolve(this.roles);
      });
    },
    // Set user's information
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },

    // Reset user's information
    resetInfo() {
      this.$reset();
    },

    // Get user's information
    async info() {
      const res = await getUserInfo();
      const DASHBOARD: any = {
        path: '/dashboard',
        name: 'dashboard',
        component: "",
        title:"首页",
        children: [
          {
            path: 'workplace',
            name: 'Workplace',
            component: () =>
              import('@/views/dashboard/workplace/index.vue'),
            meta: {
              title: '数据',
              requiresAuth: true,
              roles: ['*'],
            },
          },
        ],
      };
      res.data.permissions.unshift(DASHBOARD)
      localStorage.setItem('permissions',JSON.stringify(res.data.permissions))
      this.setInfo(res.data);
    },
    // Login
    async login(loginForm: LoginData) {
      let encryPassword = encrypt(loginForm.password)
      let password = loginForm.password
      try {
        loginForm.password = encryPassword
        const res = await userLogin(loginForm);
        setToken(res.data.token);
      } catch (err) {
        loginForm.password = password
        clearToken();
        throw err;
      }
    },
    logoutCallBack() {
      const appStore = useAppStore();
      this.resetInfo();
      clearToken();
      removeRouteListener();
      appStore.clearServerMenu();
    },
    // Logout
    async logout() {
      try {
        await userLogout();
      } finally {
        this.logoutCallBack();
      }
    },
  },
});

export default useUserStore;
