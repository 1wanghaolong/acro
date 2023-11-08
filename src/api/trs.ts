import { get, post } from '@/utils/request'
export const trs = {
   // TRS账户列表
   accountList: (params?: any) => get<any>('/admin.v2/trs/account/list', params),
   // TRS账户详情
   accountInfo: (params?: any) => get<any>('/admin.v2/trs/account/info', params),
   // TRS账户编辑
   accountUpdate: (params?: any) => post<any>('/admin.v2/trs/account/update', params),
   // TRS账户新增
   accountCreate: (params?: any) => post<any>('/admin.v2/trs/account/create', params),
   // 工作台-统计账户情况
   statisticsAccountInfo: (params?: any) => get<any>('/admin.v2/statistics/account/info', params),
   // 工作台-统计融资情况
   statisticsFinanceInfo: (params?: any) => get<any>('/admin.v2/statistics/finance/info', params),
   // 工作台-统计客户交易情况
   statisticsOrderInfo: (params?: any) => get<any>('/admin.v2/statistics/order/info', params),
   // 工作台-统计通道交易情况
   statisticsChannelInfo: (params?: any) => get<any>('/admin.v2/statistics/channel/info', params),
   // 工作台-系统资源
   systemDownloadInfo: (params?: any) => get<any>('/admin.v2/system/download/info', params),
   // 工作台-消息全部已读
   adminMessageReadAll: (params?: any) => get<any>('/admin.v2/trs/admin/message/read/all', params),
   //消息列表
   adminMessageList: (params?: any) => get<any>('/admin.v2/trs/admin/message/list', params),
   // 重置密码
   accountResetPassword: (params?: any) => post<any>('/admin.v2/trs/account/reset/password', params),
   // 担保状态
   accountAssureList: (params?: any) => get<any>('/admin.v2/trs/account/assure/list', params),
   //  担保详情
   accountAssureInfo: (params?: any) => get<any>('/admin.v2/trs/account/assure/info', params),
   // 担保记录
   accountAssureRecord: (params?: any) => get<any>('/admin.v2/trs/account/assure/record/list', params),
   // 担保概况
   accountAssureSummary: (params?: any) => get<any>('/admin.v2/trs/account/assure/summary', params),
   // 新增担保
   accountAssureCreate: (params?: any) => post<any>('/admin.v2/trs/account/assure/create', params),
   // 撤销担保
   accountAssureCancel: (params?: any) => post<any>('/admin.v2/trs/account/assure/cancel', params),
   // 货币划转
   accountChargeTransferList: (params?: any) => get<any>('/admin.v2/trs/account/charge/payment/list', params),
   // 货币划转详情
   accountChargeTransferInfo: (params?: any) => get<any>('/admin.v2/trs/account/charge/payment/info', params),
   // 货币划转审核
   accountChargeTransferAudit: (params?: any) => post<any>('/admin.v2/trs/account/payment/audit', params),
   // 货币划转新增
   accountChargeTransferCreate: (params?: any) => post<any>('/admin.v2/trs/account/payment/create', params),
   // 账户提现申请
   accountWithdraw: (params?: any) => get<any>('/admin.v2/trs/account/charge/withdraw/list', params),
   // 账户提现详情
   accountWithdrawDetail: (params?: any) => get<any>('/admin.v2/trs/account/charge/withdraw/info', params),
   // 账户提现审核
   accountWithdrawAudit: (params?: any) => post<any>('/admin.v2/trs/account/withdraw/audit', params),
   // 账户提现新增
   accountWithdrawCreate: (params?: any) => post<any>('/admin.v2/trs/account/withdraw/create', params),
   // 全部投资范围模板
   investmentScopeTemplateAll: (params?: any) => get<any>('/admin.v2/trs/investment/scope/template/all', params),
   // 全部报单排序模板
   counterChannelAccountSceneTemplateAll: (params?: any) => get<any>('/admin.v2/trs/counter/channel/account/scene/temp/all', params),
   // 全部收费套餐
   accountChargePackageAll: (params?: any) => get<any>('/admin.v2/trs/account/charge/package/all', params),
   // 订单列表
   orderList: (params?: any) => get<any>('/admin.v2/trs/order/list', params),
   // 订单详情
   orderInfo: (params?: any) => get<any>('/admin.v2/trs/order/info', params),
   // 补单平仓持仓列表
   orderClosePositionItemList: (params?: any) => get<any>('/admin.v2/trs/order/close/position/item/list', params),
   // 补单费用计算
   orderCalculateCharge: (params?: any) => post<any>('/admin.v2/trs/order/calculate/charge/amount', params),
   // 补单前
   orderCreateBefore: (params?: any) => post<any>('/admin.v2/trs/order/supplement/before', params),
   // 补单
   orderCreate: (params?: any) => post<any>('/admin.v2/trs/order/supplement', params),
   // 全部上手账户
   counterChannelAccountAll: (params?: any) => get<any>('/admin.v2/trs/counter/channel/account/all', params),
   // 可交易上手账户
   counterChannelAccountList: (params?: any) => get<any>('/admin.v2/trs/counter/channel/account/list/for/trs/account', params),
   // 订单收费项
   orderChargeList: (params?: any) => get<any>('/admin.v2/trs/order/charge/list', params),
   // 上手订单列表
   orderItemList: (params?: any) => get<any>('/admin.v2/trs/order/item/list', params),
   // 上手订单详情
   orderItemInfo: (params?: any) => get<any>('/admin.v2/trs/order/item/info', params),
   // 持仓列表
   positionList: (params?: any) => get<any>('/admin.v2/trs/position/list', params),
   // 平仓
   orderClosePosition: (params?: any) => post<any>('/admin.v2/trs/order/close/position', params),
   // 全部平仓
   orderCloseAllPosition: (params?: any) => post<any>('/admin.v2/trs/order/close/all/position', params),
   // 风控记录
   riskControlRecordList: (params?: any) => get<any>('/admin.v2/trs/risk/control/record/list', params),
   // 上手汇率
   counterChannelExchangeRateList: (params?: any) => get<any>('/admin.v2/trs/counter/channel/exchange/rate/list', params),
   // 通道管理
   counterChannelList: (params?: any) => get<any>('/admin.v2/trs/counter/channel/list', params),
   // 全部通道管理
   counterChannelAll: (params?: any) => get<any>('/admin.v2/trs/counter/channel/all', params),
   // 通道详情
   counterChannelInfo: (params?: any) => get<any>('/admin.v2/trs/counter/channel/info', params),
   // 创建通道
   counterChannelCreate: (params?: any) => post<any>('/admin.v2/trs/counter/channel/create', params),
   // 编辑通道
   counterChannelUpdate: (params?: any) => post<any>('/admin.v2/trs/counter/channel/update', params),
   // 上手账户列表
   channelAccountList: (params?: any) => get<any>('/admin.v2/trs/counter/channel/account/list', params),
   // 上手账户详情
   channelAccountInfo: (params?: any) => get<any>('/admin.v2/trs/counter/channel/account/info', params),
   // 新增上手账户
   channelAccountCreate: (params?: any) => post<any>('/admin.v2/trs/counter/channel/account/create', params),
   // 编辑上手账户
   channelAccountUpdate: (params?: any) => post<any>('/admin.v2/trs/counter/channel/account/update', params),
   // 上手账户退出登录
   channelAccountLogout: (params?: any) => post<any>('/admin.v2/trs/counter/channel/account/logout', params),
   // 上手账户登录
   channelAccountLogin: (params?: any) => post<any>('/admin.v2/trs/counter/channel/account/login', params),
   // 上手账户2FA登录
   channelAccountLogin2Fa: (params?: any) => post<any>('/admin.v2/trs/counter/channel/login/2fa', params),
   // 上手账户发送2FA验证
   channelAccountLoginSend2Fa: (params?: any) => post<any>('/admin.v2/trs/counter/channel/send/2fa', params),

   // 上手汇率新增
   counterChannelExchangeRateCreate: (params?: any) => post<any>('/admin.v2/trs/counter/channel/exchange/rate/create', params),
   // 上手汇率详情
   counterChannelExchangeRateInfo: (params?: any) => get<any>('/admin.v2/trs/counter/channel/exchange/rate/info', params),
   // 上手汇率编辑
   counterChannelExchangeRateUpdate: (params?: any) => post<any>('/admin.v2/trs/counter/channel/exchange/rate/update', params),
   // 合约结算列表
   settlementList: (params?: any) => get<any>('/admin.v2/trs/account/settlement/list', params),
   // 合约结算详情
   settlementInfo: (params?: any) => get<any>('/admin.v2/trs/account/settlement/info', params),
   // 合约结算
   settlement: (params?: any) => post<any>('/admin.v2/trs/account/settlement', params),
   // 消息列表
   messageList: (params?: any) => get<any>('/admin.v2/trs/admin/message/list', params),
   // 消息订阅列表
   messageSubscribeList: (params?: any) => get<any>('/admin.v2/trs/admin/message/subscribe/list', params),
   // 消息订阅详情
   messageSubscribeInfo: (params?: any) => get<any>('/admin.v2/trs/admin/message/subscribe/info', params),
   // 新增消息订阅
   messageSubscribeCreate: (params?: any) => post<any>('/admin.v2/trs/admin/message/subscribe/create', params),
   // 编辑消息订阅
   messageSubscribeUpdate: (params?: any) => post<any>('/admin.v2/trs/admin/message/subscribe/update', params),
   // 删除消息订阅
   messageSubscribeDelete: (params?: any) => post<any>('/admin.v2/trs/admin/message/subscribe/delete', params),
   // 收费套餐列表
   chargePackageList: (params?: any) => get<any>('/admin.v2/trs/account/charge/package/list', params),
   // 收费套餐详情
   chargePackageInfo: (params?: any) => get<any>('/admin.v2/trs/account/charge/package/info', params),
   // 新增收费套餐
   chargePackageCreate: (params?: any) => post<any>('/admin.v2/trs/account/charge/package/create', params),
   // 编辑套餐列表
   chargePackageUpdate: (params?: any) => post<any>('/admin.v2/trs/account/charge/package/update', params),
   // 报单排序列表
   counterChannelAccountSceneTempList: (params?: any) => get<any>('/admin.v2/trs/counter/channel/account/scene/temp/list', params),
   // 报单排序详情
   counterChannelAccountSceneTempInfo: (params?: any) => get<any>('/admin.v2/trs/counter/channel/account/scene/temp/info', params),
   // 报单排序模板详情
   counterChannelAccountSceneTempItemList: (params?: any) => get<any>('/admin.v2/trs/counter/channel/account/scene/temp/item/list', params),
   // 删除报单排序模板详情
   counterChannelAccountSceneTempItemDelete: (params?: any) => post<any>('/admin.v2/trs/counter/channel/account/scene/temp/item/delete', params),
   // 创建报单排序模板详情
   counterChannelAccountSceneTempItemCreate: (params?: any) => post<any>('/admin.v2/trs/counter/channel/account/scene/temp/item/create', params),
   // 修改报单排序模板详情
   counterChannelAccountSceneTempItemUpdate: (params?: any) => post<any>('/admin.v2/trs/counter/channel/account/scene/temp/item/update', params),
   // 新增报单排序
   counterChannelAccountSceneTempCreate: (params?: any) => post<any>('/admin.v2/trs/counter/channel/account/scene/temp/create', params),
   // 编辑排序列表
   counterChannelAccountSceneTempUpdate: (params?: any) => post<any>('/admin.v2/trs/counter/channel/account/scene/temp/update', params),
   // 删除报表排序列表
   counterChannelAccountSceneTempDelete: (params?: any) => post<any>('/admin.v2/trs/counter/channel/account/scene/temp/delete', params),
   // 收费方列表
   accountChannelPersonList: (params?: any) => get<any>('/admin.v2/trs/account/charge/person/list', params),
   // 收费方详情
   accountChannelPersonInfo: (params?: any) => get<any>('/admin.v2/trs/account/charge/person/info', params),
   // 修改收费方
   accountChannelPersonUpdate: (params?: any) => post<any>('/admin.v2/trs/account/charge/person/update', params),
   // 账户申请列表
   accountApplyList: (params?: any) => get<any>('/admin.v2/trs/account/apply/list', params),
   // 账户申请详情
   accountApplyInfo: (params?: any) => get<any>('/admin.v2/trs/account/apply/info', params),
   // 账户申请审核
   accountApplyCheck: (params?: any) => post<any>('/admin.v2/trs/account/apply/check', params),
   // 融资额度申请
   financeApplyList: (params?: any) => get<any>('/admin.v2/trs/account/finance/apply/list', params),
   // 融资额度申请详情
   financeApplyInfo: (params?: any) => get<any>('/admin.v2/trs/account/finance/apply/info', params),
   // 融资额度申请审核
   financeApplyCheck: (params?: any) => post<any>('/admin.v2/trs/account/finance/apply/check', params),
   // 新增融资额度申请
   financeApplyCreate: (params?: any) => post<any>('/admin.v2/trs/account/finance/apply/create', params),
   // 单票额度申请列表
   investmentScopeApplyList: (params?: any) => get<any>('/admin.v2/trs/account/investment/scope/apply/list', params),
   // 单票额度申请详情
   investmentScopeApplyInfo: (params?: any) => get<any>('/admin.v2/trs/account/investment/scope/apply/info', params),
   // 单票额度申请审核
   investmentScopeApplyCheck: (params?: any) => post<any>('/admin.v2/trs/account/investment/scope/apply/check', params),
   // 账户解约申请
   accountCancelApplyList: (params?: any) => get<any>('/admin.v2/trs/account/cancel/apply/list', params),
   // 账户解约申请详情
   accountCancelApplyInfo: (params?: any) => get<any>('/admin.v2/trs/account/cancel/apply/info', params),
   // 账户解约申请审核
   accountCancelApplyCheck: (params?: any) => post<any>('/admin.v2/trs/account/cancel/apply/check', params),
   // 账户解约申请新增
   accountCancelApplyCreate: (params?: any) => post<any>('/admin.v2/trs/account/cancel/apply/create', params),
   // 账户续期申请列表
   accountTimeApplyList: (params?: any) => get<any>('/admin.v2/trs/account/time/apply/list', params),
   // 账户续期申请详情
   accountTimeApplyInfo: (params?: any) => get<any>('/admin.v2/trs/account/time/apply/info', params),
   // 账户续期申请审核
   accountTimeApplyCheck: (params?: any) => post<any>('/admin.v2/trs/account/time/apply/check', params),
   // 单票设置列表
   investmentAcopeList: (params?: any) => get<any>('/admin.v2/trs/account/investment/scope/list', params),
   // 单票设置新增
   investmentAcopeCreate: (params?: any) => post<any>('/admin.v2/trs/account/investment/scope/create', params),
   // 单票设置编辑
   investmentAcopeUpdate: (params?: any) => post<any>('/admin.v2/trs/account/investment/scope/update', params),
   // 单票设置删除
   investmentAcopeDelete: (params?: any) => post<any>('/admin.v2/trs/account/investment/scope/delete', params),
   // 账户计息
   interestList: (params?: any) => get<any>('/admin.v2/trs/account/interest/list', params),
   // 协议列表
   agreementList: (params?: any) => get<any>('/admin.v2/trs/account/agreement/list', params),
   // 新增协议
   agreementCreate: (params?: any) => post<any>('/admin.v2/trs/account/agreement/create', params),
   // 账户续期
   accountTimeApplyCreate: (params?: any) => post<any>('/admin.v2/trs/account/time/apply/create', params),
   // 收费套餐列表
   accountChargePackageList: (params?: any) => get<any>('/admin.v2/trs/account/charge/package/list', params),
   // 收费套餐详情
   accountChargePackageInfo: (params?: any) => get<any>('/admin.v2/trs/account/charge/package/info', params),
   // 收费项详情
   accountChargeInfo: (params?: any) => get<any>('/admin.v2/trs/account/charge/info', params),
   // 全部收费项
   accountChargeAll: (params?: any) => get<any>('/admin.v2/trs/account/charge/all', params),
   // 收费方列表
   accountChargePersonAll: (params?: any) => get<any>('/admin.v2/trs/account/charge/person/all', params),
   // 修改收费套餐
   accountChargePackageUpdate: (params?: any) => post<any>('/admin.v2/trs/account/charge/package/update', params),
   // 删除收费项
   accountChargeDelete: (params?: any) => post<any>('/admin.v2/trs/account/charge/delete', params),
   // 创建收费项
   accountChargeCreate: (params?: any) => post<any>('/admin.v2/trs/account/charge/create', params),
   // 创建收费项
   accountChargeUpdate: (params?: any) => post<any>('/admin.v2/trs/account/charge/update', params),
   // 创建收费方
   accountChannelPersonCreate: (params?: any) => post<any>('/admin.v2/trs/account/charge/person/create', params),
   // 融资杠杆列表
   financeMultipleList: (params?: any) => get<any>('/admin.v2/trs/finance/multiple/list', params),
   // 融资杠杆全部
   financeMultipleAll: (params?: any) => get<any>('/admin.v2/trs/finance/multiple/all', params),
   // 创建融资杠杆列表
   financeMultipleCreate: (params?: any) => post<any>('/admin.v2/trs/finance/multiple/create', params),
   // 删除融资杠杆列表
   financeMultipleDelete: (params?: any) => post<any>('/admin.v2/trs/finance/multiple/delete', params),
   // 修改融资杠杆列表
   financeMultipleUpdate: (params?: any) => post<any>('/admin.v2/trs/finance/multiple/update', params),
   // 融资期限列表
   financeTimeLimitList: (params?: any) => get<any>('/admin.v2/trs/finance/time/limit/list', params),
   // 创建融资期限列表
   financeTimeLimitCreate: (params?: any) => post<any>('/admin.v2/trs/finance/time/limit/create', params),
   // 删除融资期限列表
   financeTimeLimitDelete: (params?: any) => post<any>('/admin.v2/trs/finance/time/limit/delete', params),
   // 修改融资期限列表
   financeTimeLimitUpdate: (params?: any) => post<any>('/admin.v2/trs/finance/time/limit/update', params),
   // 风控模板列表
   riskControlTemplateList: (params?: any) => get<any>('/admin.v2/trs/risk/control/template/list', params),
   // 修改风控模板
   riskControlTemplateUpdate: (params?: any) => post<any>('/admin.v2/trs/risk/control/template/update', params),
   // 创建风控模板
   riskControlTemplateCreate: (params?: any) => post<any>('/admin.v2/trs/risk/control/template/create', params),
   // 删除风控模板
   riskControlTemplateDelete: (params?: any) => post<any>('/admin.v2/trs/risk/control/template/delete', params),
   // 风控模板详情
   riskControlTemplateInfo: (params?: any) => get<any>('/admin.v2/trs/risk/control/template/info', params),
   // 风控模板未创建倍数列表
   riskControlTemplateUncreateMultipleList: (params?: any) => get<any>('/admin.v2/trs/risk/control/template/uncreate/multiple/list', params),
   // 投资范围模板列表
   investmentScopeTemplateList: (params?: any) => get<any>('/admin.v2/trs/investment/scope/template/list', params),
   // 投资范围模板详情
   investmentScopeTemplateInfo: (params?: any) => get<any>('/admin.v2/trs/investment/scope/template/info', params),
   // 投资范围模板详情
   investmentScopeTemplateUpdate: (params?: any) => post<any>('/admin.v2/trs/investment/scope/template/update', params),
   // 项目列表
   investmentScopeTemplateitemList: (params?: any) => get<any>('/admin.v2/trs/investment/scope/template/item/list', params),
   // 创建项目
   investmentScopeTemplateitemCreate: (params?: any) => post<any>('/admin.v2/trs/investment/scope/template/item/create', params),
   // 修改项目
   investmentScopeTemplateitemUpdate: (params?: any) => post<any>('/admin.v2/trs/investment/scope/template/item/update', params),
   // 删除项目
   investmentScopeTemplateitemDelete: (params?: any) => post<any>('/admin.v2/trs/investment/scope/template/item/delete', params),
   // 创建投资范围模板
   investmentScopeTemplateCreate: (params?: any) => post<any>('/admin.v2/trs/investment/scope/template/create', params),
   // 提示设置
   systemTipList: (params?: any) => get<any>('/admin.v2/system/tip/list', params),
   // 提示设置保存
   systemTipListSave: (params?: any) => post<any>('/admin.v2/system/tip/list/save', params),
   // 全部黑名单规则
   investmentScopeTemplateRuleAll: (params?: any) => get<any>('/manford.admin.v2/trs/investment/scope/template/rule/all', params),
   // 修改黑名单规则
   investmentScopeTemplateRuleUpdate: (params?: any) => post<any>('/manford.admin.v2/trs/investment/scope/template/rule/update', params),
   // 创建黑名单规则模板
   investmentScopeTemplateRuleCreate: (params?: any) => post<any>('/manford.admin.v2/trs/investment/scope/template/create', params),
   // 风控相关列表
   trsRiskControlList: (params?: any) => get<any>('/admin.v2/trs/risk/control/list', params),
   // 风控相关列表创建
   trsRiskControlCreate: (params?: any) => post<any>('/admin.v2/trs/risk/control/create', params),
   // 风控相关列表修改
   trsRiskControlUpdate: (params?: any) => post<any>('/admin.v2/trs/risk/control/update', params),
   // 风控相关列表删除
   trsRiskControlDelete: (params?: any) => post<any>('/admin.v2/trs/risk/control/delete', params),
   // 劵池管理
   trsSymbolPoolList: (params?: any) => get<any>('/admin.v2/trs/symbol/pool/list', params),
   // 删除劵池
   trsSymbolPoolDelete: (params?: any) => post<any>('/admin.v2/trs/symbol/pool/delete', params),
   // 获取证券订单信息
   trsSymbolPoolOrderInfo: (params?: any) => get<any>('/admin.v2/trs/symbol/pool/order/info', params),
   // 创建劵池
   trsSymbolPoolCreate: (params?: any) => post<any>('/admin.v2/trs/symbol/pool/create', params),
   // 修改劵池
   trsSymbolPoolUpdate: (params?: any) => post<any>('/admin.v2/trs/symbol/pool/update', params),
   // 分红派息任务列表
   trsSymbolDividendList: (params?: any) => get<any>('/admin.v2/trs/symbol/dividend/list', params),
   // 任务详情
   trsSymbolDividendDetail: (params?: any) => get<any>('/admin.v2/trs/symbol/dividend/info', params),
   // 分红明细
   trsSymbolDividendRecordList: (params?: any) => get<any>('/admin.v2/trs/position/dividend/record/list', params),
   // 任务明细列表
   trsSymbolItemDividendRecordList: (params?: any) => get<any>('/admin.v2/trs/position/item/dividend/record/list', params),
   // 创建分红派息任务
   trsSymbolDividendCreate: (params?: any) => post<any>('/admin.v2/trs/symbol/dividend/create', params),
   // 创建任务明细
   trsSymbolDividendRecordCreate: (params?: any) => post<any>('/admin.v2/trs/position/item/dividend/record/create', params),
   // 立即登记
   trsSymbolDividendRecord: (params?: any) => post<any>('/admin.v2/trs/symbol/dividend/record', params),
   // 执行任务
   trsSymbolDividendExecute: (params?: any) => post<any>('/admin.v2/trs/symbol/dividend/execute', params),
   // 取消任务
   trsSymbolDividendDelete: (params?: any) => post<any>('/admin.v2/trs/symbol/dividend/delete', params),
   // 拆并股任务列表
   trsSymbolSplitList: (params?: any) => get<any>('/admin.v2/trs/symbol/split/list', params),
   // 任务详情
   trsSymbolSplitDetail: (params?: any) => get<any>('/admin.v2/trs/symbol/split/info', params),
   // 分红明细
   trsSymbolSplitRecordList: (params?: any) => get<any>('/admin.v2/trs/position/split/record/list', params),
   // 任务明细列表
   trsSymbolItemSplitRecordList: (params?: any) => get<any>('/admin.v2/trs/position/item/split/record/list', params),
   // 创建拆并股任务
   trsSymbolSplitCreate: (params?: any) => post<any>('/admin.v2/trs/symbol/split/create', params),
   // 创建任务明细
   trsSymbolSplitRecordCreate: (params?: any) => post<any>('/admin.v2/trs/position/item/split/record/create', params),
   // 立即登记
   trsSymbolSplitRecord: (params?: any) => post<any>('/admin.v2/trs/symbol/split/record', params),
   // 执行任务
   trsSymbolSplitExecute: (params?: any) => post<any>('/admin.v2/trs/symbol/split/execute', params),
   // 取消任务
   trsSymbolSplitDelete: (params?: any) => post<any>('/admin.v2/trs/symbol/split/delete', params),
   // 碎股单交易
   trsOrderItemNotify: (params?: any) => post<any>('/admin.v2/trs/order/item/notify', params),
   // trs日结单
   trsAccountStatementList: (params?: any) => get<any>('/admin.v2/trs/account/statement/list', params),
}