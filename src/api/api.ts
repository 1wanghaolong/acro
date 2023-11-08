import { get, post } from '@/utils/request'

export const queryPopularList = (params?: any) => get<any>('/api/popular/list', params)

export const queryMessageList = (params?: any) => post<any>('/api/message/list', params)

export const setMessageStatus = (params?: any) => post<any>('/api/message/read', params)

export const queryChatList = (params?: any) => post<any>('/api/chat/list', params)

export const getsmsList = (params?: any) => get<any>('/sms', params)

export const systemQueryMessageList = (params?: any) => get<any>('/departments', params)

export const systempPermissionsMessageList = (params?: any) => get<any>('/permissions', params)

export const systemRloeManagementList = (params?: any) => get<any>('/roles', params)

export const systemDeptManagementList = (params?: any) => get<any>('/users', params)

export const systemPostManagementList = (params?: any) => get<any>('/log/operate', params)

export const queryMyProjectList = (params?: any) => post<any>('/api/user/my-project/list', params)

export const queryMyTeamList = (params?: any) => post<any>('/api/user/my-team/list', params)

export const queryLatestActivity = (params?: any) => post<any>('/api/user/latest-activity', params)

export const saveUserInfo = (params?: any) => post<any>('/api/user/save-info', params)

export const queryCertification = (params?: any) => post<any>('/api/user/certification', params)

export const userUploadApi = (params?: any) => post<any>('/api/user/upload', params)

export const login = (params?: any) => post<any>('/login', params)

export const logout = (params?: any) => post<any>('/logout', params)

export const getUserInfo = (params?: any) => get<any>('/user/info', params)

export const getMenuList = (params?: any) => get<any>('/getRouters', params)

export const getCodeImg = (params?: any) => get<any>('/captcha', params)

export const logologin = (params?: any) => get<any>('/logo/login', params)
  