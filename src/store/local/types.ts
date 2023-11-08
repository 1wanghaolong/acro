export interface Local {
    theme:'light'|'dark';
    lang:'zh-CN'|'en'|'tc';
    isContract:Boolean;
    loginConfig:{
      remember:Boolean;
      username:string;
    },
    userInfo:any;
    permissions:any[];
    menus:any[];
    init:any;
    isLogin:boolean;
    menuActive:string;
    config:any;
  }