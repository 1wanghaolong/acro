import Cookies from 'js-cookie'
const cookiesStorage = {
  setItem(key:string, state:any): any {
    return Cookies.set(key, state, { expires: 4/24 })
  },
  getItem: Cookies.get
}
export const useTemp = defineStore({
  id: 'temp',
  persist: {
    storage: cookiesStorage,//使用cookiesStorage本地储存
    paths: ['token'],//需要储存到本地的参数
  },
  state: () => ({
    riskLevelColor:['','#00b42a','#7bc616','#ffb400','#ff7d00','#f53f3f'],
    menuActive:'',
    token:'',
    setIntervalName:""
  })
})