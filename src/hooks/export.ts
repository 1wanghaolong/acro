export const downloadExcel = (str:any,Name?:any) => {
    let fileName = Name || "表单"
    // encodeURIComponent解决中文乱码
    let uri = 'data:text/xlsx;charset=utf-8,\ufeff' + encodeURIComponent(str);
    let link = document.createElement("a");
    link.href = uri;
    link.download = `${fileName}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
export const useDownloadExcel = (fields:any,list:any,name='数据') => {
    const findFields = (item:any,field:any) => {
        const pathArr = field.split('.');
        let result:any = cloneDeep(item);
        for (const key of pathArr) {
            result = result?.[key];
        }
        if(typeof result == 'string'){
            result = result?.replace(',','，');
        }
        return result;
    }
    let str = `${fields.map((item:any)=>item.title).join()}\n`
    list.forEach((item:any) => {
        fields.forEach((subItem:any)=>{
            str += `${findFields(item,subItem.field)}\t,`
        })
        str += '\n'
    });
    let uri = 'data:text/xlsx;charset=utf-8,\ufeff' + encodeURIComponent(str);
    let link = document.createElement("a");
    link.href = uri;
    link.download = `${name}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}