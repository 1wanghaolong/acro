import { get, post } from '@/utils/request'
export const cms = {
// 用户注册
cmsUserSummary: (params?: any) => get<any>('/admin.v2/user/summary', params),
// 用户注册折线图
cmsUserTrend: (params?: any) => get<any>('/admin.v2/user/trend', params),
// 全部消息设为已读
cmsSystemaffAirReadAll: (params?: any) => get<any>('/admin.v2/system/affair/read/all', params),
// 今天昨天的统计数据
cmsStatisticsUserTodayYesterday: (params?: any) => get<any>('/admin.v2/statistics/user/today/yesterday', params),
// 新增用户数
cmsStatisticsUserRegister: (params?: any) => get<any>('/admin.v2/statistics/user/register', params),
// 活跃用户数
cmsStatisticsUserTodayActive: (params?: any) => get<any>('/admin.v2/statistics/user/active', params),
// 启动次数
cmsStatisticsUserTodaylaunches: (params?: any) => get<any>('/admin.v2/statistics/user/launches', params),
// 用户的留存率
cmsStatisticsUserTodayRetentions: (params?: any) => get<any>('/admin.v2/statistics/user/retentions', params),
// 使用时长
cmsStatisticsUserTodayDurations: (params?: any) => get<any>('/admin.v2/statistics/user/durations', params),
// 问题列表
cmsHelpQuestionList: (params?: any) => get<any>('/admin.v2/question', params),
// 问题详情
cmsHelpQuestionInfo: (params?: any) => get<any>('/admin.v2/question/info', params),
// 新增问题
cmsHelpQuestionCreate: (params?: any) => post<any>('/admin.v2/question/create', params),
// 编辑问题
cmsHelpQuestionUpdate: (params?: any) => post<any>('/admin.v2/question/update', params),
// 删除问题
cmsHelpQuestionDelete: (params?: any) => post<any>('/admin.v2/question/delete', params),
// 问题类型列表
cmsHelpQuestionTypeList: (params?: any) => get<any>('/admin.v2/question/type', params),
// 新增问题类型
cmsHelpQuestionTypeCreate: (params?: any) => post<any>('/admin.v2/question/type/create', params),
// 删除问题类型
cmsHelpQuestionTypeDelete: (params?: any) => post<any>('/admin.v2/question/type/delete', params),
// 问题类型详情
cmsHelpQuestionTypeInfo: (params?: any) => get<any>('/admin.v2/question/type/info', params),
// 编辑问题类型
cmsHelpQuestionTypeUpdate: (params?: any) => post<any>('/admin.v2/question/type/update', params),
// 问题反馈列表
cmsHelpQuestionFeedbackList: (params?: any) => get<any>('/admin.v2/question/feedback', params),
// 删除问题反馈
cmsHelpQuestionFeedbackDelete: (params?: any) => post<any>('/admin.v2/question/feedback/delete', params),
// 问题反馈详情
cmsHelpQuestionFeedbackInfo: (params?: any) => get<any>('/admin.v2/question/feedback/info', params),
// 编辑问题反馈
cmsHelpQuestionFeedbackUpdate: (params?: any) => post<any>('/admin.v2/question/feedback/update', params),
// 广告管理列表
cmsInfoAdvList: (params?: any) => get<any>('/admin.v2/info/adv', params),
// 广告管理详情
cmsInfoAdvDetail: (params?: any) => get<any>('/admin.v2/info/adv/detail', params),
// 创建广告管理
cmsInfoAdvSave: (params?: any) => post<any>('/admin.v2/info/adv/save', params),
// 编辑广告管理
cmsInfoAdvUpdate: (params?: any) => post<any>('/admin.v2/info/adv/update', params),
// 删除广告管理
cmsInfoAdvDelete: (params?: any) => post<any>('/admin.v2/info/adv/del', params),
// 开屏广告列表
cmsScreenAdvList: (params?: any) => get<any>('/admin.v2/screen/adv', params),
// 开屏广告详情
cmsScreenAdvDetail: (params?: any) => get<any>('/admin.v2/screen/adv/detail', params),
// 创建开屏广告
cmsScreenAdvSave: (params?: any) => post<any>('/admin.v2/screen/adv/save', params),
// 编辑开屏广告
cmsScreenAdvUpdate: (params?: any) => post<any>('/admin.v2/screen/adv/update', params),
// 删除开屏广告
cmsScreenAdvDelete: (params?: any) => post<any>('/admin.v2/screen/adv/del', params),
// 广告资讯列表
cmsAdvPageList: (params?: any) => get<any>('/admin.v2/adv/pages', params),
// 广告资讯详情
cmsAdvPageDetail: (params?: any) => get<any>('/admin.v2/adv/pages/detail', params),
// 新增广告资讯
cmsAdvPageSave: (params?: any) => post<any>('/admin.v2/adv/pages/save', params),
// 编辑广告资讯
cmsAdvPageUpdate: (params?: any) => post<any>('/admin.v2/adv/pages/update', params),
// 删除广告资讯
cmsAdvPageDelete: (params?: any) => post<any>('/admin.v2/adv/pages/del', params),
// 用户评论列表
cmsUserCommentList: (params?: any) => get<any>('/admin.v2/user/comment', params),
// 用户评论详情
cmsUserCommentDetail: (params?: any) => get<any>('/admin.v2/user/comment/info', params),
// 编辑用户评论
cmsUserCommentUpdate: (params?: any) => post<any>('/admin.v2/user/comment/update', params),
// 删除用户评论
cmsUserCommentDelete: (params?: any) => post<any>('/admin.v2/user/comment/delete', params),
// 用户反馈列表
cmsUserFeedbackList: (params?: any) => get<any>('/admin.v2/user/feedback', params),
// 用户反馈详情
cmsUserFeedbackDetail: (params?: any) => get<any>('/admin.v2/user/feedback/info', params),
// 编辑用户反馈
cmsUserFeedbackUpdate: (params?: any) => post<any>('/admin.v2/user/feedback/update', params),
// 删除用户反馈
cmsUserFeedbackDelete: (params?: any) => post<any>('/admin.v2/user/feedback/delete', params),
// 消息提醒列表
cmsSystemAffairList: (params?: any) => get<any>('/admin.v2/system/affair/list', params),
// 编辑消息提醒
cmsSystemAffairUpdate: (params?: any) => post<any>('/admin.v2/system/affair/read', params),
// 系统消息列表
cmsSystemMessageList: (params?: any) => get<any>('/admin.v2/system/message', params),
// 系统消息详情
cmsSystemMessageInfo: (params?: any) => get<any>('/admin.v2/system/message/detail', params),
// 新增系统消息
cmsSystemMessageCreate: (params?: any) => post<any>('/admin.v2/system/message/save', params),
// 删除系统消息
cmsSystemMessageDelete: (params?: any) => post<any>('/admin.v2/system/message/del', params),
// 模拟账户列表
cmsSimulateAccountList: (params?: any) => get<any>('/admin.v2/simulate/account', params),
// 委托列表
cmsSimulateEntrustedList: (params?: any) => get<any>('/admin.v2/simulate/entrusted', params),
// 交易管理列表
cmsSimulateTradeList: (params?: any) => get<any>('/admin.v2/simulate/trade', params),
// 持仓管理列表
cmsSimulatePositionsList: (params?: any) => get<any>('/admin.v2/simulate/positions', params),
// 转仓申请列表
cmsOrderMovementList: (params?: any) => get<any>('/admin.v2/order/movement/list', params),
// 转仓申请详情
cmsOrderMovementDetail: (params?: any) => get<any>('/admin.v2/order/movement/info', params),
// 编辑转仓申请
cmsOrderMovementUpdate: (params?: any) => post<any>('/admin.v2/order/movement/audit', params),
// 客户管理列表
cmsUserList: (params?: any) => get<any>('/admin.v2/user/list', params),
// 客户管理详情
cmsUserDetail: (params?: any) => get<any>('/admin.v2/user/info', params),
// 客户管理搜索
cmsUserSearch: (params?: any) => get<any>('/admin.v2/user/search', params),
// 编辑客户管理
cmsUserUpdate: (params?: any) => post<any>('/admin.v2/user/update', params),
// 客户资料列表
cmsUserCounterRecordList: (params?: any) => get<any>('/admin.v2/user/counter/record/list', params),
// 客户资料详情
cmsUserCounterRecordDetail: (params?: any) => get<any>('/admin.v2/user/counter/record/info', params),
// 审核成功
cmsUserCounterRecordPass: (params?: any) => post<any>('/admin.v2/user/counter/record/pass', params),
// 审核成功
cmsUserCounterRecordReject: (params?: any) => post<any>('/admin.v2/user/counter/record/reject', params),
// 常用设备列表
cmsUserDeviceList: (params?: any) => get<any>('/admin.v2/user/device/list', params),
// 应用登录列表
cmsUserLoginRecordList: (params?: any) => get<any>('/admin.v2/user/login/record', params),
// 证券登录列表
cmsUserCounterLoginRecordList: (params?: any) => get<any>('/admin.v2/user/counter/login/record/list', params),
// 注销记录列表
cmsUserDestroyList: (params?: any) => get<any>('/admin.v2/user/destroy/list', params),
// 注销记录搜索
cmsUserDestroySearch: (params?: any) => get<any>('/admin.v2/user/destroy/search', params),
// 注销记录详情
cmsUserDestroyInfo: (params?: any) => get<any>('/admin.v2/user/destroy/info', params),
// 提交销户
cmsUserDestroySubmit: (params?: any) => post<any>('/admin.v2/user/destroy/submit', params),
// 执行销户
cmsUserDestroyExecute: (params?: any) => post<any>('/admin.v2/user/destroy/execute', params),
// 撤销销户
cmsUserDestroyCancel: (params?: any) => post<any>('/admin.v2/user/destroy/cancel', params),
// 行情商城列表
cmsQuoteGoodsList: (params?: any) => get<any>('/admin.v2/quote/goods', params),
// 行情商城详情
cmsQuoteGoodsInfo: (params?: any) => get<any>('/admin.v2/quote/goods/detail', params),
// 新增行情商城
cmsQuoteGoodsCreate: (params?: any) => post<any>('/admin.v2/quote/goods/save', params),
// 编辑行情商城
cmsQuoteGoodsUpdate: (params?: any) => post<any>('/admin.v2/quote/goods/update', params),
// 删除行情商城
cmsQuoteGoodsDelete: (params?: any) => post<any>('/admin.v2/quote/goods/delete', params),
// 行情会员列表
cmsQuoteMemberList: (params?: any) => get<any>('/admin.v2/quote/member', params),
// 新增行情会员
cmsQuoteMemberCreate: (params?: any) => post<any>('/admin.v2/quote/grant', params),
// 行情购买记录列表
cmsQuoteRecordList: (params?: any) => get<any>('/admin.v2/quote/record', params),
// 激活码列表
cmsQuoteCdkeyRecordList: (params?: any) => get<any>('/admin.v2/quote/cdkey/record', params),
// 未发送激活码记录
cmsQuoteWaitSendCdkeyRecord: (params?: any) => get<any>('/admin.v2/quote/wait/send/cdkey/record', params),
// 激活码详情
cmsQuoteCdkeyDetail: (params?: any) => get<any>('/admin.v2/quote/cdkey/detail', params),
// 发放激活码
cmsQuoteCdkeySend: (params?: any) => post<any>('/admin.v2/quote/cdkey/send', params),
// 批量发放激活码
cmsQuoteCdkeyBatchSend: (params?: any) => post<any>('/admin.v2/quote/cdkey/batch/send', params),
// 激活码活动列表
cmsQuoteCdkeyActiveList: (params?: any) => get<any>('/admin.v2/quote/cdkey/active', params),
// 激活码活动详情
cmsQuoteCdkeyActiveInfo: (params?: any) => get<any>('/admin.v2/quote/cdkey/active/info', params),
// 新增激活码活动
cmsQuoteCdkeyActiveCreate: (params?: any) => post<any>('/admin.v2/quote/cdkey/active/save', params),
// 编辑激活码活动
cmsQuoteCdkeyActiveUpdate: (params?: any) => post<any>('/admin.v2/quote/cdkey/active/update', params),
// 删除激活码活动
cmsQuoteCdkeyActiveDelete: (params?: any) => post<any>('/admin.v2/quote/cdkey/active/delete', params),
// 积分商城列表
cmsIntegralGoodsList: (params?: any) => get<any>('/admin.v2/integral/goods/list', params),
// 积分商城详情
cmsIntegralGoodsInfo: (params?: any) => get<any>('/admin.v2/integral/goods/info', params),
// 新增积分商城
cmsIntegralGoodsCreate: (params?: any) => post<any>('/admin.v2/integral/goods/create', params),
// 编辑积分商城
cmsIntegralGoodsUpdate: (params?: any) => post<any>('/admin.v2/integral/goods/update', params),
// 删除积分商城
cmsIntegralGoodsDelete: (params?: any) => post<any>('/admin.v2/integral/goods/delete', params),
// 积分任务列表
cmsIntegralTaskList: (params?: any) => get<any>('/admin.v2/integral/task/list', params),
// 积分任务详情
cmsIntegralTaskInfo: (params?: any) => get<any>('/admin.v2/integral/task/info', params),
// 新增积分任务
cmsIntegralTaskCreate: (params?: any) => post<any>('/admin.v2/integral/task/create', params),
// 编辑积分任务
cmsIntegralTaskUpdate: (params?: any) => post<any>('/admin.v2/integral/task/update', params),
// 删除积分任务
cmsIntegralTaskDelete: (params?: any) => post<any>('/admin.v2/integral/task/delete', params),
// 指标选股列表
cmsScreenerList: (params?: any) => get<any>('/admin.v2/screener', params),
// 指标选股详情
cmsScreenerInfo: (params?: any) => get<any>('/admin.v2/screener/detail', params),
// 编辑指标选股
cmsScreenerUpdate: (params?: any) => post<any>('/admin.v2/screener/update', params),
// 删除指标选股
cmsScreenerDelete: (params?: any) => post<any>('/admin.v2/screener/del', params),
// 热门股票列表
cmsSymbolHotList: (params?: any) => get<any>('/admin.v2/symbol/hot/list', params),
// 热门股票详情
cmsSymbolHotInfo: (params?: any) => get<any>('/admin.v2/symbol/hot/detail', params),
// 新增热门股票
cmsSymbolHotCreate: (params?: any) => post<any>('/admin.v2/symbol/hot/create', params),
// 编辑热门股票
cmsSymbolHotUpdate: (params?: any) => post<any>('/admin.v2/symbol/hot/update', params),
// 删除热门股票
cmsSymbolHotDelete: (params?: any) => post<any>('/admin.v2/symbol/hot/delete', params),
// 模拟比赛列表
cmsMatchList: (params?: any) => get<any>('/admin.v2/match', params),
// 模拟比赛详情
cmsMatchInfo: (params?: any) => get<any>('/admin.v2/match/detail', params),
// 新增模拟比赛
cmsMatchCreate: (params?: any) => post<any>('/admin.v2/match/save', params),
// 编辑模拟比赛
cmsMatchUpdate: (params?: any) => post<any>('/admin.v2/match/update', params),
// 删除模拟比赛
cmsMatchDelete: (params?: any) => get<any>('/admin.v2/match/del', params),
// 参赛用户列表
cmsMatchAccountList: (params?: any) => get<any>('/admin.v2/match/account', params),
// 比赛排名列表
cmsMatchRankingList: (params?: any) => get<any>('/admin.v2/match/ranking', params),
// 清结算详情列表
cmsAgentClearLogList: (params?: any) => get<any>('/admin.v2/agent/clear/log/list', params),
// 佣金概况
cmsAgentClearCommissionSummary: (params?: any) => get<any>('/admin.v2/agent/clear/commission/summary', params),
// 利息概况
cmsAgentInterestClearCommissionSummary: (params?: any) => get<any>('/admin.v2/agent/interest/clear/commission/summary', params),
// 发放积分
cmsUserWalletBalanceChange: (params?: any) => post<any>('/admin.v2/user/wallet/balance/change', params),
//财务概括
cmsAgentAccountSummary: (params?: any) => get<any>('/admin.v2/agent/account/summary', params),
//代理概括
cmsAgentUserSummary: (params?: any) => get<any>('/admin.v2/agent/user/summary', params),
//新增客户趋势
cmsAgentPopularizeInviteUserTrend: (params?: any) => get<any>('/admin.v2/agent/popularize/inviteUserTrend', params),
//新增开户趋势
cmsAgentPopularizeInviteUserOpenTrend: (params?: any) => get<any>('/admin.v2/agent/popularize/inviteUserOpenTrend', params),
//新增入金趋势
cmsAgentPopularizeInviteUserPaymentTrend: (params?: any) => get<any>('/admin.v2/agent/popularize/inviteUserPaymentTrend', params),
//新增交易客户趋势
cmsAgentPopularizeInviteUserTradeTrend: (params?: any) => get<any>('/admin.v2/agent/popularize/inviteUserTradeTrend', params),
//排名
cmsAgentUserRank: (params?: any) => get<any>('/admin.v2/agent/user/rank', params),
// 参赛用户持仓列表
cmsMatchPositions: (params?: any) => get<any>('/admin.v2/match/position', params),
// 参赛用户交易列表
cmsMatchTrade: (params?: any) => get<any>('/admin.v2/match/trade', params),
// 代理清算列表
cmsAgentClearClearList: (params?: any) => get<any>('/admin.v2/agent/clear/list', params),
// 提现管理列表
cmsAgentWithdrawList: (params?: any) => get<any>('/admin.v2/agent/withdraw/list', params),
// 提现完成
cmsAgentWithdrawComplete: (params?: any) => post<any>('/admin.v2/agent/withdraw/complete', params),
// 邀请列表
cmsAgentPopularizeList: (params?: any) => get<any>('/admin.v2/agent/popularize/list', params),
// 创建邀请
cmsAgentPopularizeCreate: (params?: any) => post<any>('/admin.v2/agent/popularize/inviteUser', params),
// 渠道更换
cmsAgentPopularizeChangeAgent: (params?: any) => post<any>('/admin.v2/agent/popularize/changeAgent', params),
// 搜索代理列表
cmsAgentUserList: (params?: any) => get<any>('/admin.v2/agent/user/list', params),
// 下级代理列表
cmsAgentUserlowerList: (params?: any) => get<any>('/admin.v2/agent/user/lowerList', params),
// 下级代理详情
cmsAgentUserInfo: (params?: any) => get<any>('/admin.v2/agent/user/lowerInfo', params),
// 新增下级代理
cmsAgentUserCreate: (params?: any) => post<any>('/admin.v2/agent/user/createLower', params),
// 编辑下级代理
cmsAgentUserUpdate: (params?: any) => post<any>('/admin.v2/agent/user/updateLower', params),
// 修改状态
cmsAgentUserUpdateStatus: (params?: any) => post<any>('/admin.v2/agent/user/updateStatus', params),
// 重置密码
cmsAgentUserResetPassword: (params?: any) => post<any>('/admin.v2/agent/user/resetPassword', params),
// 一级代理列表
cmsAgentUserTopList: (params?: any) => get<any>('/admin.v2/agent/user/topList', params),
// 一级代理详情
cmsAgentUserTopInfo: (params?: any) => get<any>('/admin.v2/agent/user/topInfo', params),
// 新增一级代理
cmsAgentUserTopCreate: (params?: any) => post<any>('/admin.v2/agent/user/createTop', params),
// 编辑一级代理
cmsAgentUserTopUpdate: (params?: any) => post<any>('/admin.v2/agent/user/updateTop', params),
// 新股管理列表
cmsIpoList: (params?: any) => get<any>('/admin.v2/ipo/list', params),
// 删除新股管理
cmsIpoDel: (params?: any) => post<any>('/admin.v2/ipo/del', params),
// 新股管理更新
cmsIpoUpdate: (params?: any) => post<any>('/admin.v2/ipo/update', params),
// 详情新股管理
cmsIpoDetail: (params?: any) => get<any>('/admin.v2/ipo/detail', params),
// 用户银行卡列表
cmsOrderUserBankCardList: (params?: any) => get<any>('/admin.v2/order/user/bank/card/list', params),
// 用户银行卡详情
cmsOrderUserBankCardInfo: (params?: any) => get<any>('/admin.v2/order/user/bank/card/info', params),
// 用户银行卡解绑
cmsOrderUserBankCardUnBind: (params?: any) => post<any>('/admin.v2/order/user/bank/card/unBind', params),
// 银行卡管理列表
cmsOrderSystemBankCardList: (params?: any) => get<any>('/admin.v2/order/system/bank/card/list', params),
// 银行卡管理详情
cmsOrderSystemBankCardInfo: (params?: any) => get<any>('/admin.v2/order/system/bank/card/info', params),
// 新增银行卡管理
cmsOrderSystemBankCardCreate: (params?: any) => post<any>('/admin.v2/order/system/bank/card/create', params),
// 编辑银行卡管理
cmsOrderSystemBankCardUpdate: (params?: any) => post<any>('/admin.v2/order/system/bank/card/update', params),
// 删除银行卡管理
cmsOrderSystemBankCardDelete: (params?: any) => post<any>('/admin.v2/order/system/bank/card/delete', params),
// 入金管理列表
cmsChargePaymentList: (params?: any) => get<any>('/admin.v2/charge/payment/list', params),
// 入金管理概况
cmsChargePaymentSummary: (params?: any) => get<any>('/admin.v2/charge/payment/summary', params),
// 入金管理详情
cmsChargePaymentInfo: (params?: any) => get<any>('/admin.v2/charge/payment/info', params),
// 入金管理审核
cmsChargePaymentAudit: (params?: any) => post<any>('/admin.v2/payment/audit', params),
// 提现管理列表
cmsChargeWithdrawList: (params?: any) => get<any>('/admin.v2/charge/withdraw/list', params),
// 提现管理概况
cmsChargeWithdrawSummary: (params?: any) => get<any>('/admin.v2/charge/withdraw/summary', params),
// 提现管理详情
cmsChargeWithdrawInfo: (params?: any) => get<any>('/admin.v2/charge/withdraw/info', params),
// 提现管理审核
cmsChargeWithdrawAudit: (params?: any) => post<any>('/admin.v2/withdraw/audit', params),
// 货币兑换列表
cmsChargeExchangeList: (params?: any) => get<any>('/admin.v2/charge/exchange/list', params),
// 货币兑换详情
cmsChargeExchangeInfo: (params?: any) => get<any>('/admin.v2/charge/exchange/info', params),
// 货币兑换审核
cmsChargeExchangeAudit: (params?: any) => post<any>('/admin.v2/charge/exchange/update', params),
}