import { get, post } from '@/utils/request'
export const admin = {
    // 登录
    login: (params?: any) => post<any>('/admin.v2/admin/user/login', params),
    // 退出登录
    logout: (params?: any) => post<any>('/admin.v2/admin/user/logout', params, { headers: { message: false } }),
    // 验证码
    verifyCode: (params?: any) => get<any>('/admin.v2/admin/verify/code', params),
    // 个人信息
    userInfo: (params?: any) => get<any>('/admin.v2/admin/user/permission', params),
    // 个人信息修改
    userInfoUpdate: (params?: any) => post<any>('/admin.v2/admin/profile/update', params),
    // 权限列表
    authList: (params?: any) => get<any>('/admin.v2/admin/permission/all', params),
    // 新增权限
    authCreate: (params?: any) => post<any>('/admin.v2/admin/permission/create', params),
    // 编辑权限
    authUpdate: (params?: any) => post<any>('/admin.v2/admin/permission/update', params),
    // 删除权限
    authDelete: (params?: any) => post<any>('/admin.v2/admin/permission/delete', params),

    // 全部角色列表
    roleAllList: (params?: any) => get<any>('/admin.v2/admin/role/all', params),
    // 角色列表
    roleList: (params?: any) => get<any>('/admin.v2/admin/role/list', params),
    // 新增角色
    roleCreate: (params?: any) => post<any>('/admin.v2/admin/role/create', params),
    // 编辑角色
    roleUpdate: (params?: any) => post<any>('/admin.v2/admin/role/update', params),
    // 删除角色
    roleDelete: (params?: any) => post<any>('/admin.v2/admin/role/delete', params),

    // 用户列表
    userList: (params?: any) => get<any>('/admin.v2/admin/user/list', params),
    // 新增用户
    userCreate: (params?: any) => post<any>('/admin.v2/admin/user/create', params),
    // 编辑用户
    userUpdate: (params?: any) => post<any>('/admin.v2/admin/user/update', params),
    // 删除用户
    userDelete: (params?: any) => post<any>('/admin.v2/admin/user/delete', params),
    // 用户修改
    adminuserUpdate: (params?: any) => post<any>('/admin.v2/user/update', params),
    // 配置列表
    configList: (params?: any) => get<any>('/admin.v2/admin/config/list', params),
    // 配置编辑
    configUpdate: (params?: any) => post<any>('/admin.v2/admin/config/update', params)
}