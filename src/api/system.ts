import axios from 'axios';

export interface MessageRecord {
  id: number;
  type: string;
  title: string;
  subTitle: string;
  avatar?: string;
  content: string;
  time: string;
  status: 0 | 1;
  messageType?: number;
}
export type MessageListType = MessageRecord[];

export function queryMessageList(params:any) {
  return axios.get<MessageListType>('/departments',{params});
}

//菜单管理
export interface Management {
  id: number;
  type: string;
  title: string;
  subTitle: string;
  avatar?: string;
  content: string;
  time: string;
  status: 0 | 1;
  messageType?: number;
}
export type menuManagement = Management[];

export function permissionsMessageList(params:any) {
  return axios.get<menuManagement>('/permissions',{params});
}



//角色管理
export interface roleagement {
  id: number;
  type: string;
  title: string;
  subTitle: string;
  avatar?: string;
  content: string;
  time: string;
  status: 0 | 1;
  messageType?: number;
}
export type rloeManagement = roleagement[];

export function rloeManagementList(params:any) {
  return axios.get<roleagement>('/roles',{params});
}


//账户管理
export interface deptagement {
  id: number;
  type: string;
  title: string;
  subTitle: string;
  avatar?: string;
  content: string;
  time: string;
  status: 0 | 1;
  messageType?: number;
}
export type deptManagement = deptagement[];

export function deptManagementList(params:any) {
  return axios.get<deptagement>('/users',{ params });
}



//操作日志
export interface postagement {
  id: number;
  type: string;
  title: string;
  subTitle: string;
  avatar?: string;
  count: string;
  time: string;
  status: 0 | 1;
  messageType?: number;
}
export type postManagement = postagement[];

export function postManagementList(params:any) {
  return axios.get<postagement>(`/log/operate`,{ params });
}