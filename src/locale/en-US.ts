import localeMessageBox from '@/components/message-box/locale/en-US';
import localeLogin from '@/views/login/locale/en-US';

import localeWorkplace from '@/views/dashboard/workplace/locale/en-US';

import systemUser from '@/views/system/user/locale/en-US'

import localeUserInfo from '@/views/user/info/locale/en-US';

import localeSettings from './en-US/settings';

export default {
  'menu.dashboard': 'Home',
  'menu.meetSite': 'Securities meet on site',
  'menu.cashCheck': 'Securities Deposit Review',
  'menu.openCheck': 'Securities account opening review',
  'menu.accountOpen': 'Account Opening Process',
  'menu.openList': 'Account Opening List',
  'menu.SecuritiesProcess': 'Securities Process',
  'menu.Management': 'Membership Management',
  'menu.systems': 'System Configuration',
  'menu.openPreparation': 'Account opening preparation',
  'menu.videoVerification': 'Video Verification',
  'menu.depositManagement': 'Deposit Management',
  'menu.siteManagement': 'Site Management',
  'menu.protocolManagement': 'Protocol Management',
  'menu.platform': 'Platform Configuration',
  'menu.Assessment': 'Account Opening Assessment',
  'menu.sms': 'SMS notification',
  'menu.system': 'Privilege Management',
  'menu.system.user': 'Organizational structure',
  'menu.system.Role': 'Menu Management',
  'menu.system.Menu': 'Role Management',
  'menu.system.Dept': 'Account Management',
  'menu.system.Post': 'Operation Log',
  'menu.server.dashboard': 'Dashboard-Server',
  'menu.server.workplace': 'Workplace-Server',
  'menu.server.monitor': 'Monitor-Server',
  'menu.list': 'List',
  'menu.result': 'Result',
  'menu.exception': 'Exception',
  'menu.form': 'Form',
  'menu.profile': 'Profile',
  'menu.visualization': 'Data Visualization',
  'menu.user': 'User Center',
  'menu.arcoWebsite': 'Arco Design',
  'menu.faq': 'FAQ',
  'navbar.docs': 'Docs',
  'navbar.action.locale': 'Switch to English',
  ...localeSettings,
  ...localeMessageBox,
  ...localeLogin,
  ...localeWorkplace,
  ...systemUser,
  ...localeUserInfo,
};
