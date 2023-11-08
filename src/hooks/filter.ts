export const useFilter = (data:any) => {
    let obj:any = {}
    for (let key in data){
        if(['audit_time','create_time','check_time','bind_time','quote','finish','settlement','trade_time','trigger_time','report_time','settlement_time','push','interest_time','expire_time','open_time','push_time','time','payment_date','record_date','createTime','lastLoginTime','completeTime','cashEndTime','listingTime','publishTime','logTime','bindTime','checkTime'].includes(key)){
            obj[`filter[${key}][start]`] = data[key]?.[0]
            obj[`filter[${key}][end]`] = data[key]?.[1]
            continue
        }
        obj[`filter[${key}]`] = data[key]
    }
    return obj
}