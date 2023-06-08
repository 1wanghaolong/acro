import localeMessageBox from '@/components/message-box/locale/zh-CN';
import localeLogin from '@/views/login/locale/zh-CN';

import localeWorkplace from '@/views/dashboard/workplace/locale/zh-CN';

import systemUser from '@/views/system/user/locale/zh-CN'

import localeUserInfo from '@/views/user/info/locale/zh-CN';

import localeSettings from './zh-CN/settings';

export default {
  'menu.dashboard': '首页',
  'menu.meetSite': '证券现场见面',
  'menu.cashCheck': '证券入金审核',
  'menu.openCheck': '证券开户审核',
  'menu.accountOpen': '开户流程',
  'menu.openList': '开户列表',
  'menu.SecuritiesProcess':'证券流程',
  'menu.Management':'会员管理',
  'menu.systems':'系统配置',
  'menu.openPreparation':'开户准备',
  'menu.videoVerification':'视频验证',
  'menu.depositManagement':'入金管理',
  'menu.siteManagement':'现场管理',
  'menu.protocolManagement':'协议管理',
  'menu.platform':'平台配置',
  'menu.Assessment':'开户评估',
  'menu.sms':'短信通知',
  'menu.system':'权限管理',
  'menu.system.user':'组织架构',
  'menu.system.Menu':'菜单管理',
  'menu.system.Role':'角色管理',
  'menu.system.Dept':'账户管理',
  'menu.system.Post':'操作日志',
  'menu.server.dashboard': '仪表盘-服务端',
  'menu.server.workplace': '工作台-服务端',
  'menu.server.monitor': '实时监控-服务端',
  'menu.list': '列表页',
  'menu.result': '结果页',
  'menu.exception': '异常页',
  'menu.form': '表单页',
  'menu.profile': '详情页',
  'menu.visualization': '数据可视化',
  'menu.user': '个人中心',
  'menu.arcoWebsite': 'Arco Design',
  'menu.faq': '常见问题',
  'navbar.docs': '文档中心',
  'navbar.action.locale': '切换为中文',
  ...localeSettings,
  ...localeMessageBox,
  ...localeLogin,
  ...localeWorkplace,
  ...systemUser,
  ...localeUserInfo,
};
