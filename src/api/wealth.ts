import { get, post } from '@/utils/request'
export const wealth = {
    // 资金账户详情
    wealthAccountAccountInfo: (params?: any) => get<any>('/admin.v2/wealth/asset/account/info', params),
    //财富账户列表
    wealthAccountList: (params?: any) => get<any>('/admin.v2/wealth/account/list', params),
    //修改财富账户状态
    wealthAccountUpdateStatus: (params?: any) => post<any>('/admin.v2/wealth/account/update/status', params),
    //财富账户详情
    wealthAccountInfo: (params?: any) => get<any>('/admin.v2/wealth/account/info', params),
    //期权产品列表
    wealthOptionsProductList: (params?: any) => get<any>('/admin.v2/wealth/options/product/list', params),
    //期权产品修改状态
    wealthOptionsProductUpdateStatus: (params?: any) => post<any>('/admin.v2/wealth/options/product/update/status', params),
    //期权产品类型详情
    wealthOptionsProductInfo: (params?: any) => get<any>('/admin.v2/wealth/options/product/info', params),
    //期权产品类型修改
    wealthOptionsProductUpdate: (params?: any) => post<any>('/admin.v2/wealth/options/product/update', params),   
    //创建期权产品类型
    wealthOptionsProductCreate: (params?: any) => post<any>('/admin.v2/wealth/options/product/create', params),   
    //删除期权产品类型
    wealthOptionsProductDelete: (params?: any) => post<any>('/admin.v2/wealth/options/product/delete', params), 
    //复制期权产品类型
    wealthOptionsProductCopy: (params?: any) => post<any>('/admin.v2/wealth/options/product/copy', params),     
    // 询价记录列表
    apiWealthInquiryList: (params?: any) => get<any>('/admin.v2/wealth/inquiry/list', params),
    // 全部期权产品类型
    apiWealthOptionsProductAll: (params?: any) => get<any>('/admin.v2/wealth/options/product/all', params),
    // 询价详情
    apiWealthInquiryInfo: (params?: any) => get<any>('/admin.v2/wealth/inquiry/info', params),
    // 给出报价
    apiWealthInquiryQuote: (params?: any) => post<any>('/admin.v2/wealth/inquiry/quote', params),
    //  删除交易对手报价
    apiWealthInquiryCounterpartiesQuoteDelete:(params?: any) => post<any>('/admin.v2/wealth/inquiry/counterparties/quote/delete', params),
    //  修改交易对手报价
    apiWealthInquiryCounterpartiesQuoteUpdate:(params?: any) => post<any>('/admin.v2/wealth/inquiry/counterparties/quote/update', params),
    // 创建对手报价
    apiWealthInquiryCounterpartiesQuoteCreate:(params?: any) => post<any>('/admin.v2/wealth/inquiry/counterparties/quote/create', params) ,
    // 交易对手列表
    apiWealthCounterpartiesList: (params?: any) => get<any>('/admin.v2/wealth/counterparties/list', params),
    // 设为失效
    apiWealthInquirySetInvalid:(params?: any) => post<any>('/admin.v2/wealth/inquiry/set/invalid', params),
    // 撤回报价
    apiWealthInquiryCancelQuote :(params?: any) => post<any>('/admin.v2/wealth/inquiry/cancel/quote', params),
    // 交易对手报价列表
    apiWealthOptionsCounterpartiesQuoteList:(params?: any) => get<any>('/admin.v2/wealth/inquiry/counterparties/quote/list', params),
    // 期权产品类型详情
    apiWealthOptionsProductInfo:(params?: any) => get<any>('/admin.v2/wealth/options/product/info', params),
    // 期权产品文件列表
    apiWealthOptionsProductFileList:(params?: any) => get<any>('/admin.v2/wealth/options/product/file/list', params),
    // 创建期权产品文件
    apiWealthOptionsProductFileCreate:(params?: any) => post<any>('/admin.v2/wealth/options/product/file/create', params),
    // 创建期权产品文件
    apiWealthOptionsProductFileUpdate:(params?: any) => post<any>('/admin.v2/wealth/options/product/file/update', params),
    // 期权产品类型参数排序
    apiWealthOptionsProductParamsSort :(params?: any) => post<any>('/admin.v2/wealth/options/product/params/sort', params),
    // 期权报价列表
    apiWealthOptionsProductQuoteList:(params?: any) => get<any>('/admin.v2/wealth/options/product/quote/list', params),
    // 删除期权产品文件
    apiWealthOptionsProductFileDelete :(params?: any) => post<any>('/admin.v2/wealth/options/product/file/delete', params),
    // 期权报价修改状态
    apiWealthOptionsProductQuoteUpdateStatus :(params?: any) => post<any>('/admin.v2/wealth/options/product/quote/update/status', params),
    // 创建期权报价
    apiWealthOptionsProductQuoteCreate :(params?: any) => post<any>('/admin.v2/wealth/options/product/quote/create', params),
    // 期权报价详情
    apiWealthOptionsProductQuoteInfo :(params?: any) => get<any>('/admin.v2/wealth/options/product/quote/info', params),
    // 编辑期权报价详情
    apiWealthOptionsProductQuoteUpdate :(params?: any) => post<any>('/admin.v2/wealth/options/product/quote/update', params),
    // 交易记录列表
    apiWealthOrderList: (params?: any) => get<any>('/admin.v2/wealth/order/list', params),
    // 交易记录详情
    apiWealthOrderInfo:(params?: any) => get<any>('/admin.v2/wealth/order/info', params),
    // 修改交易订单挂单信息
    apiWealthOrderEdit:(params?: any) => post<any>('/admin.v2/wealth/order/edit', params),
    // 修改交易记录结构参数
    apiWealthOrderUpdateParamsContent:(params?: any) => post<any>('/admin.v2/wealth/order/update/params/content', params),
    // 修改交易订单
    apiWealthOrderUpdate:(params?: any) => post<any>('/admin.v2/wealth/order/update', params),
    // 添加交易对手成交记录
    apiWealthOrderCounterpartiesQuoteCreate:(params?: any) => post<any>('/admin.v2/wealth/order/counterparties/quote/create', params),
    // 交易对手成交记录列表
    apiWealthOrderCounterpartiesQuoteList:(params?: any) => get<any>('/admin.v2/wealth/order/counterparties/quote/list', params),
    // 删除交易对手成交记录
    apiWealthOrderCounterpartiesQuoteDelete:(params?: any) => post<any>('/admin.v2/wealth/order/counterparties/quote/delete', params),
    // 修改交易对手成交记录
    apiWealthOrderCounterpartiesQuoteUpdate:(params?: any) => post<any>('/admin.v2/wealth/order/counterparties/quote/update', params),
    // 创建交易对手报价
    apiWealthCounterpartiesCreate:(params?: any) => post<any>('/admin.v2/wealth/counterparties/create', params),
    // 交易对手详情
    apiWealthCounterpartiesInfo:(params?: any) => get<any>('/admin.v2/wealth/counterparties/info', params),
    // 编辑交易对手报价
    apiWealthCounterpartiesUpdate:(params?: any) => post<any>('/admin.v2/wealth/counterparties/update', params),
    // 持仓记录列表
    apiWealthPositionList:(params?: any) => get<any>('/admin.v2/wealth/position/list', params),
    // 持仓记录详情
    apiWealthPositionInfo:(params?: any) => get<any>('/admin.v2/wealth/position/info', params),
    // 删除持仓
    apiWealthPositionDelete:(params?: any) => post<any>('/admin.v2/wealth/position/delete', params),
    // 持仓编辑
    apiWealthPositionUpdatePosition:(params?: any) => post<any>('/admin.v2/wealth/position/updatePosition', params),
    // 合约结算
    apiWealthPositionContractSettlement:(params?: any) => post<any>('/admin.v2/wealth/position/contract/settlement', params),
    // 提前行权记录
    apiWealthPositionExerciseRecordsList:(params?: any) => get<any>('/admin.v2/wealth/position/exercise/records/list', params),
    // 提前行权申请详情
    apiWealthPositionExerciseRecordsInfo:(params?: any) => get<any>('/admin.v2/wealth/position/exercise/records/info', params),
    // 提前行权通过
    apiWealthPositionExerciseRecordsPass:(params?: any) => post<any>('/admin.v2/wealth/position/exercise/records/pass', params),
    // 提前行权驳回
    apiWealthPositionExerciseRecordsReject:(params?: any) => post<any>('/admin.v2/wealth/position/exercise/records/reject', params),
    // 通用文件列表
    apiWealthPageSettingList:(params?: any) => get<any>('/admin.v2/wealth/page/setting/list', params),
    // 创建通用文件
    apiWealthPageSettingCreate:(params?: any) => post<any>('/admin.v2/wealth/page/setting/create', params),
    // 删除通用文件
    apiWealthPageSettingDelete:(params?: any) => post<any>('/admin.v2/wealth/page/setting/delete', params),
    // 修改通用文件
    apiWealthPageSettingUpdate:(params?: any) => post<any>('/admin.v2/wealth/page/setting/update', params),
    // 通用文件详情
    apiWealthPageSettingInfo:(params?: any) => get<any>('/admin.v2/wealth/page/setting/info', params),
     // 创建询价
     apiWealthInquiryCreate:(params?: any) => post<any>('/admin.v2/wealth/inquiry/create', params),
     // 创建持仓记录
     apiWealthPositionCreate:(params?: any) => post<any>('/admin.v2/wealth/position/create', params),
     // 创建交易订单
     apiWealthOrderCreate:(params?: any) => post<any>('/admin.v2/wealth/order/create', params),
     // 导出询价列表
    apiWealthInquiryExport:(params?: any) => get<any>('/admin.v2/wealth/inquiry/export', params),
     // 账户结单列表
     apiWealthAccountStatementList:(params?: any) => get<any>('/admin.v2/wealth/account/statement/list', params),
     
}