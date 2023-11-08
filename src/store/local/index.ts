import { Local } from "./types";

export const useLocal = defineStore({
  id: 'local',
  persist: true,
  state: () => <Local>({
    theme:'light',
    lang:'zh-CN',
    isContract:false,
    loginConfig:{
      remember:false,
      username:''
    },
    userInfo:{},
    permissions:[],
    menus:[],
    init:{},
    config:{},
    isLogin:false,
    menuActive:''
  }),
  actions:{
    setTheme(theme: any) {
        this.theme = theme;
        if(theme == 'dark'){
          document.body.setAttribute('arco-theme', 'dark');
        }else{
          document.body.removeAttribute('arco-theme');
        }
    }
  }
})