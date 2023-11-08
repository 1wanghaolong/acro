import { get, post } from '@/utils/request'
export const system = {
    // 上传
    upload: (params?: any) => post<any>('/system.v1/common/upload', params),
    // 区号
    countryCodeList: (params?: any) => get<any>('/admin.v2/system/countryCode/list', params),
    // 银行列表
    bankList:(params?: any) =>get<any>('/system.v1/bank/list', params),
    // 问卷
    questionnaireAnswer:(params?: any) =>get<any>('/admin.v2/info/questionnaire/answer/item/list', params),
    // App页面列表
    infoPages:(params?: any) =>get<any>('/admin.v2/info/pages', params),
    // App页面详情
    infoPagesDetail:(params?: any) =>get<any>('/admin.v2/info/pages/detail', params),
    // 编辑App页面
    infoPagesUpdate:(params?: any) =>post<any>('/admin.v2/info/pages/update', params),
    // 提示设置
    systemTipList: (params?: any) => get<any>('/admin.v2/system/tip/list', params),
    // 系统初始化
    systemInit: (params?: any) => get<any>('/admin.v2/admin/system/config/list', params),
    // 系统配置
    systemConfig: (params?: any) => get<any>('/admin.v2/system/admin/init/config/list', params),
    // 后台初始化枚举列表
    systemEnum: (params?: any) => get<any>('/admin.v2/system/admin/enum/list', params),
    // 前置过滤列表
    systemSensitiveList: (params?: any) => get<any>('/admin.v2/system/sensitive', params),
    // 前置过滤列表是否存在
    systemSensitiveExist: (params?: any) => get<any>('/admin.v2/system/sensitive/exist', params),
    // 前置过滤详情
    systemSensitiveInfo: (params?: any) => get<any>('/admin.v2/system/sensitive/detail', params),
    // 新增前置过滤
    systemSensitiveCreate: (params?: any) => post<any>('/admin.v2/system/sensitive/create', params),
    // 批量新增前置过滤
    systemSensitiveCreateBatch: (params?: any) => post<any>('/admin.v2/system/sensitive/create/batch', params),
    // 编辑前置过滤
    systemSensitiveUpdate: (params?: any) => post<any>('/admin.v2/system/sensitive/update', params),
    // 批量编辑前置过滤
    systemSensitiveUpdateBatch: (params?: any) => post<any>('/admin.v2/system/sensitive/update/batch', params),
    // 删除前置过滤
    systemSensitiveDelete: (params?: any) => post<any>('/admin.v2/system/sensitive/delete', params),
    // 系统事件列表
    systemEventList: (params?: any) => get<any>('/admin.v2/system/event', params),
    // 系统日志列表
    systemLogList: (params?: any) => get<any>('/admin.v2/system/log/list', params),
    // 系统版本列表
    systemVersionList: (params?: any) => get<any>('/admin.v2/system/version', params),
    // 系统版本列表是否存在
    systemVersionExist: (params?: any) => get<any>('/admin.v2/system/version/exist', params),
    // 系统版本详情
    systemVersionInfo: (params?: any) => get<any>('/admin.v2/system/version/detail', params),
    // 新增系统版本
    systemVersionCreate: (params?: any) => post<any>('/admin.v2/system/version/save', params),
    // 编辑系统版本
    systemVersionUpdate: (params?: any) => post<any>('/admin.v2/system/version/update', params),
    // 删除系统版本
    systemVersionDeletel: (params?: any) => post<any>('/admin.v2/system/version/del', params),
     // 操作日志列表
     systemUserLogList: (params?: any) => get<any>('/admin.v2/admin/user/log/list', params),
      // 删除操作日志
      systemUserLogDeletel: (params?: any) => post<any>('/admin.v2/admin/user/log/delete', params),
    
}