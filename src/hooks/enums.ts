import { enums } from '@/utils/enums'
const local = useLocal()
const currencyList = computed(()=>{
    return local.config?.system?.allow_currency_list?.map((item:any)=>item.value) || []
})
const marketTypeList = computed(()=>{
    return local.config?.market?.allow_market_type_list?.map((item:any)=>item.value) || []
})
const marketList = computed(()=>{
    let arr:any = []
    local.config?.market?.allow_market_type_list.forEach((item:any)=>{
        if(item.value == 'CN') return arr.push(...['SZSE','SSE'])
        if(item.value == 'HK') return arr.push('HKEX')
        arr.push(item.value)
    })
    return arr
})
const enumList = computed(()=>{//过滤后枚举
    let obj = cloneDeep(enums)
    obj.currency = enums.currency?.filter((item:any)=>currencyList.value?.includes(item.value))
    obj.market.market_type = enums.market.market_type?.filter((item:any)=>marketTypeList.value?.includes(item.value))
    obj.market.market = enums.market.market?.filter((item:any)=>marketList.value?.includes(item.value))
    return obj
})
export const useEnums = (str: string,filter=true) => {//filter是否使用过滤数据
    let result = filter ? cloneDeep(enumList.value) : cloneDeep(enums)
    const pathArr = str.split('.');
    for (const key of pathArr) {
        result = result?.[key];
    }
    return result;
}
export const useEnumsFormat = (str: string,val:any) => {
    return useEnums(str,false)?.find((item:any)=>item.value == val)?.trans[useLocal().lang];
}
// 市场格式化 type 1 简化 2 获取完整市场
export const useMarketFormat = (str: string,type=1) => {
    const obj:any = {
        HK:['HKEX'],
        CN:['SZSE','SSE'],
        US:['US']
    }
    if(type == 1){
        let marketType = ''
        for (let key in obj){
            if(obj[key].includes(str)){
                marketType = key
                break
            }
        }
        return marketType
    }
    if(type == 2){
        return obj?.[str] || []
    }
}