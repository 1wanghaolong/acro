import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
import { UserState,requestData } from '@/store/modules/user/types';

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginRes {
  token: string;
}
export function login(data: LoginData) {
  return axios.post<LoginRes>('/login', data);
}

export function logout() {
  return axios.post<LoginRes>('/logout');
}

export function getUserInfo() {
  return axios.get<UserState>('/user/info');
}

export function getMenuList() {
  return axios.get<RouteRecordNormalized[]>('/getRouters');
}

// 获取验证码
export function getCodeImg() {
  return axios.get<requestData>('/captcha');
}


// 获取logo
export function logologin() {
  return axios.get<requestData>('/logo/login');
}