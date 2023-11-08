import { get,post } from '@/utils/request'
export const market = {
    // 股票列表
    symbolList: (params?: any) => get<any>('/admin.v2/symbol/list', params),
    // 股票搜索
    symbolSearch: (params?: any) => get<any>('/admin.v2/symbol/search', params) ,
    // 概念板块列表
    symbolPreferredPlateList: (params?: any) => get<any>('/admin.v2/symbol/preferred/plate', params),
    // 下拉框全部
    symbolConceptPlateList: (params?: any) => get<any>('/admin.v2/symbol/concept/plates', params),
    // 概念板块详情
    symbolPreferredPlateInfo: (params?: any) => get<any>('/admin.v2/symbol/preferred/plate/info', params),
    // 新增概念板块
    symbolPreferredPlateCreate: (params?: any) => post<any>('/admin.v2/symbol/preferred/plate/create', params),
    // 编辑概念板块
    symbolPreferredPlateUpdate: (params?: any) => post<any>('/admin.v2/symbol/preferred/plate/update', params),
    // 删除概念板块
    symbolPreferredPlateDelete: (params?: any) => get<any>('/admin.v2/symbol/preferred/plate/delete', params),
    // 自选股列表
    symbolUserOptionsList: (params?: any) => get<any>('/admin.v2/user/options', params),
    // 自选股详情
    symbolUserOptionsInfo: (params?: any) => get<any>('/admin.v2/user/options/info', params),
    // 新增自选股
    symbolUserOptionsCreate: (params?: any) => post<any>('/admin.v2/user/options/create', params),
    // 编辑自选股
    symbolUserOptionsUpdate: (params?: any) => post<any>('/admin.v2/user/options/update', params),
    // 删除自选股
    symbolUserOptionsDelete: (params?: any) => post<any>('/admin.v2/user/options/delete', params), 
}