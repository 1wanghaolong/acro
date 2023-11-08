export const useRules = {
    // 需小于当前时间
    lessThanNow:(tips:string)=>{
        return {
            validator: (value:any, cb:any) => {
                return new Promise(resolve => {
                    if(Number(value)>Date.now()/1000){
                        cb(tips)
                    }
                    resolve('')
                })
            }
        }
    },
    // 需大于当前时间
    moreThanNow:(tips:string)=>{
        return {
            validator: (value:any, cb:any) => {
                return new Promise(resolve => {
                    console.log(value)
                    if(Number(value)<Date.now()/1000){
                        cb(tips)
                    }
                    resolve('')
                })
            }
        }
    },
    // 需大于0
    moreThanZero:(tips:string)=>{
        return {
            validator: (value:any, cb:any) => {
                return new Promise(resolve => {
                    if(Number(value)<=0){
                        cb(tips)
                    }
                    resolve('')
                })
            }
        }
    }
}