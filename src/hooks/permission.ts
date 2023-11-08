export const usePermission = (auths: string[]) => {
    const local = useLocal();
    if (Array.isArray(auths)) {
        let isShow = false
        auths?.forEach((item: string) => {
            local.permissions.includes(item) && (isShow = true)
        })
        return isShow
    } else {
        return false
    }
}
export const useFirstMenu = () => {
    const local = useLocal();
    const findFirstMenuUrl = (menus:any[]):string => {  
        for (let menu of menus) {  
            if (!menu?.children?.length) return menu.url;  
            let result = findFirstMenuUrl(menu.children);  
            if (result) return result;
        }  
        return 'index'; 
    }
    return findFirstMenuUrl(local.menus)
}
export const useNumberFormat =(val:any,num?:any) => {
    let nums = num||2
    if(val||val==0){
        return Number(val).toFixed(nums)
    }else{
        return val
    }
};
export const dataFormat = (amount: any,num?:any,type?:any,zeroClear?:any) =>{
    // amount 金额 num 保留位数 type 舍入方式 zeroClear 是否清零
    let nums = num==0?0:num?num:2
    if (!amount) {
      return zeroClear?'0':"0.00";
    }
    let str =  (amount+'').split('').splice(0,1)[0]
    if(str=='-'||str=='+'){
      amount = (amount+'').split('').splice(1).join('')
    }
    //  /制保留两位小数
    let f = parseFloat(amount);
    if (isNaN(f)) return false;
    if(type==1){
      f = Math.round(amount * 10**nums) / 10**nums;
    }else if(type==2){
      f = Math.ceil(amount * 10**nums) / 10**nums;
    }else{
      f = Math.floor(amount * 10**nums) / 10**nums;
    }
    let s = f.toString();
    let rs = s.indexOf(".");
    if (rs < 0) {
      rs = s.length;
      s += ".";
    }
    while (s.length < rs + 1 + nums) {
      s += "0";
    }
  
    //每三位用一个逗号隔开
    let leftNum = s.split(".")[0];
    let rightNum = "." + s.split(".")[1];
    let result;
    //定义数组记录截取后的价格
    let resultArray = new Array();
    if (leftNum.length > 3) {
      let i = true;
      while (i) {
        resultArray.push(leftNum.slice(-3));
        leftNum = leftNum.slice(0, leftNum.length - 3);
        if (leftNum.length < 4) {
          i = false;
        }
      }
      //由于从后向前截取，所以从最后一个开始遍历并存到一个新的数组，顺序调换
      let sortArray = new Array();
      for (let i = resultArray.length - 1; i >= 0; i--) {
        sortArray.push(resultArray[i]);
      }
      result = leftNum + "," + sortArray.join(",") + rightNum;
    } else {
      result = s;
    }
    if(str=='-'||str=='+'){
      result = str + result
    }
    if(zeroClear){
      return result.replace(/\.?0+$/, '');
    }else{
      return result
    }
  
  }