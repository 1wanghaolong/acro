import { get, post } from '@/utils/request'
export const otc = {
    // 资金账户列表
    accountList: (params?: any) => get<any>('/admin.v2/otc/asset/account/list', params),
    // 资金账户详情
    accountInfo: (params?: any) => get<any>('/admin.v2/otc/asset/account/info', params),
    // 全部资金账户收费套餐
    chargePackageAll: (params?: any) => get<any>('/admin.v2/otc/asset/account/charge/package/all', params),
    // 新增资金账户
    accountCreate: (params?: any) => post<any>('/admin.v2/otc/asset/account/create', params),
    // 华夏资金账户详情
    huaxiaAccountInfo: (params?: any) => get<any>('/huaxia.admin.v2/otc/asset/account/info', params),
    // 编辑资金账户
    accountUpdate: (params?: any) => post<any>('/admin.v2/otc/asset/account/update', params),
    // 重置密码
    accountResetPassword: (params?: any) => post<any>('/admin.v2/otc/asset/account/reset/password', params),
    // 全部收费项
    accountChargeAll: (params?: any) => get<any>('/admin.v2/otc/asset/account/charge/all', params),
    // 入金记录
    accountChargePaymentList: (params?: any) => get<any>('/admin.v2/otc/asset/account/charge/payment/list', params),
    // 入金申请详情
    accountChargePaymentInfo: (params?: any) => get<any>('/admin.v2/otc/asset/account/charge/payment/info', params),
    // 入金申请审核
    accountChargePaymentAudit: (params?: any) => post<any>('/admin.v2/otc/asset/account/payment/audit', params),
    // 入金申请
    accountChargePaymentApply: (params?: any) => post<any>('/admin.v2/otc/asset/account/payment/apply', params),
    

    // 出金记录
    accountChargeWithdrawList: (params?: any) => get<any>('/admin.v2/otc/asset/account/charge/withdraw/list', params),
    // 出金申请详情
    accountChargeWithdrawInfo: (params?: any) => get<any>('/admin.v2/otc/asset/account/charge/withdraw/info', params),
    // 资金明细
    accountAssetRecord: (params?: any) => get<any>('/admin.v2/otc/asset/account/asset/record/list', params),

    // 出金申请审核
    accountChargeWithdrawAudit: (params?: any) => post<any>('/admin.v2/otc/asset/account/withdraw/audit', params),

    // 货币划转
    accountChargeExchangeList: (params?: any) => get<any>('/admin.v2/otc/asset/account/charge/exchange/list', params),
    // 货币划转详情
    accountChargeExchangeInfo: (params?: any) => get<any>('/admin.v2/otc/asset/account/charge/exchange/info', params),
    // 货币划转审核
    accountChargeExchangeAudit: (params?: any) => post<any>('/admin.v2/otc/asset/account/charge/exchange/update', params),

    // PI认证列表
    piAuthenticationList: (params?: any) => get<any>('/admin.v2/otc/pi/authentication/list', params),
    // 创建PI认证记录
    piAuthenticationCreate: (params?: any) => post<any>('/admin.v2/otc/pi/authentication/create', params),
    // PI认证详情
    piAuthenticationInfo: (params?: any) => get<any>('/admin.v2/otc/pi/authentication/info', params),
    // 编辑PI认证
    piAuthenticationUpdate: (params?: any) => post<any>('/admin.v2/otc/pi/authentication/update', params),

    // 风险测评列表
    riskAssessmenList: (params?: any) => get<any>('/admin.v2/otc/risk/assessment/list', params),
    // 创建风险测评记录
    riskAssessmenCreate: (params?: any) => post<any>('/admin.v2/otc/risk/assessment/create', params),
    // 风险测评详情
    riskAssessmenInfo: (params?: any) => get<any>('/admin.v2/otc/risk/assessment/info', params),
    // 编辑风险测评
    riskAssessmenUpdate: (params?: any) => post<any>('/admin.v2/otc/risk/assessment/update', params),
    // 系统银行卡列表
    systemBankCardList: (params?: any) => get<any>('/admin.v2/otc/system/bank/card/list', params),
    // 新增系统银行卡
    systemBankCardCreate: (params?: any) => post<any>('/admin.v2/otc/system/bank/card/create', params),
    // 删除系统银行卡
    systemBankCardDelete: (params?: any) => post<any>('/admin.v2/otc/system/bank/card/delete', params),
    // 修改系统银行卡
    systemBankCardUpdate: (params?: any) => post<any>('/admin.v2/otc/system/bank/card/update', params),
    // 系统银行卡详情
    systemBankCardInfo: (params?: any) => get<any>('/admin.v2/otc/system/bank/card/info', params),
    // 客户银行卡
    clientBankCardList: (params?: any) => get<any>('/admin.v2/otc/asset/account/bank/card/list', params),
    // 客户全部银行卡
    clientBankCardAllList: (params?: any) => get<any>('/admin.v2/otc/asset/account/bank/card/all', params),
    // 客户列表
    getcustomerList: (params?: any) => get<any>('/admin.v2/otc/customer/list', params),
    // 全部客户经理
    getcustomerManagerAll: (params?: any) => get<any>('/admin.v2/otc/customer/manager/all', params),
    // 绑定客户经理
    getcustomerBindManager:(params?: any) => post<any>('/admin.v2/otc/customer/bind/manager', params),
    // 客户详情
    getcustomerInfo:(params?: any) => get<any>('/admin.v2/otc/customer/info', params),
    // 客户经理列表
    getcustomerManagerList:(params?: any) => get<any>('/admin.v2/otc/customer/manager/list', params),
    // 修改客户经理状态
    getcustomerBindManagerUpdateStatus:(params?: any) => post<any>('/admin.v2/otc/customer/manager/update/status', params),
    // 创建客户经理
    getcustomerBindManagerCreate:(params?: any) => post<any>('/admin.v2/otc/customer/manager/create', params),
    // 编辑客户经理
    getcustomerBindManagerUpdate:(params?: any) => post<any>('/admin.v2/otc/customer/manager/update', params),
    // 解绑银行卡
    clientBankCardUnBind: (params?: any) => post<any>('/admin.v2/otc/asset/account/bank/card/unBind', params),
    // 平台汇率
    exchangeRateList: (params?: any) => get<any>('/admin.v2/otc/exchange/rate/list', params),
    // 套餐列表
    getAssetChargePackageList:(params?: any) => get<any>('/admin.v2/otc/asset/account/charge/package/list', params),
    // 修改套餐
    getAssetChargePackageUpdate:(params?: any) => post<any>('/admin.v2/otc/asset/account/charge/package/update', params),
    // 平台汇率详情
    exchangeRateInfo: (params?: any) => get<any>('/admin.v2/otc/exchange/rate/info', params),
    // 平台汇率新增
    exchangeRateCreate: (params?: any) => post<any>('/admin.v2/otc/exchange/rate/create', params),
    // 平台汇率编辑
    exchangeRateUpdate: (params?: any) => post<any>('/admin.v2/otc/exchange/rate/update', params),
    // 平台汇率新增
    exchangeRateDelete: (params?: any) => post<any>('/admin.v2/otc/exchange/rate/delete', params),
    // 创建套餐
    accountChargePackageCreate: (params?: any) => post<any>('/admin.v2/otc/asset/account/charge/package/create', params),
    // 套餐详情
    accountChargePackageInfo: (params?: any) => get<any>('/admin.v2/otc/asset/account/charge/package/info', params),
    // 全部收费项
    // accountChargeAll: (params?: any) => get<any>('/admin.v2/otc/asset/account/charge/all', params),
     // 删除收费项
     accountChargeDelete: (params?: any) => post<any>('/admin.v2/otc/asset/account/charge/delete', params),
      // 修改收费项
    accountChargeUpdate: (params?: any) => post<any>('/admin.v2/otc/asset/account/charge/update', params),
    // 创建收费项
    accountChargeCreate: (params?: any) => post<any>('/admin.v2/otc/asset/account/charge/create', params),
    // 收费项计算
    chargeCalculate: (params?: any) => post<any>('/admin.v2/otc/asset/account/charge/calculate', params),
    // 资金账户日结单
    assetStatementList: (params?: any) => get<any>('/admin.v2/otc/asset/account/statement/list', params),
}