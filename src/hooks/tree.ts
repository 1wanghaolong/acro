
// 找出树状数组内选中和半选的节点id
export const useCheckedFormat = (tree: any, selectedIds: any) => {
    const halfChecked: any = [];
    // 递归调用检查子节点的选中状态
    const checkAllChildrenSelected = (node: any, selectedIds: any) => {
        for (const child of node?.children) {
            if (!checkAllChildrenSelected(child, selectedIds)) {
                return false; // 如果子节点有未被选中的，则返回 false
            }
        }
        return selectedIds.includes(node.id);
    };
    const traverse = (node:any) => {
        node?.forEach((item:any)=>{
            if(selectedIds.includes(item.id) && !checkAllChildrenSelected(item,selectedIds)){
                halfChecked.push(item.id)
            }
            traverse(item.children)
        })
    }
    traverse(tree)
    return {
        halfChecked,
        checked: selectedIds?.filter((item: any) => !halfChecked.includes(item))
    };
}
// export const useCheckedFormat = (tree: any, selectedIds: any) => {
//     const halfChecked: any = [];
//     const traverse = (node: any) => {
//         if (node.children && node.children.length > 0) {
//             let allSelected = true;
//             let allUnselected = true;
//             for (const child of node.children) {
//                 traverse(child);
//                 if (selectedIds.includes(child.id)) {
//                     allUnselected = false;
//                 } else {
//                     allSelected = false;
//                 }
//             }
//             if (!allSelected && !allUnselected) {
//                 halfChecked.push(node.id);
//             }
//         }
//     }
//     for (const node of tree) {
//         traverse(node);
//     }
//     return {
//         halfChecked,
//         checked: selectedIds?.filter((item: any) => !halfChecked.includes(item))
//     };
// }
// 根据路由名称查询当前菜单和父级菜单
export const useMenuTreeFind = (tree: any, url: any) => {
    let result:any = [];
    const traverse = (node:any, ancestors:any = []) => {
        if (node.url === url) {
            result = [...ancestors, node];
            return;
        }
        if (node.children && node.children.length > 0) {
            for (const child of node.children) {
                traverse(child, [...ancestors, node]);
            }
        }
    }
    for (const node of tree) {
        traverse(node);
        if (result.length > 0) {
            break;
        }
    }
    return result;
}
// 风险测评题目分组
export const useQuestionnaireAnswerGroup = (originalArr:any) => {
    let obj:any = {}
    let arr:any = []
    originalArr.forEach((item:any) => {
        if(!(item.config.title['zh-CN'] in obj)){
            obj[item.config.title['zh-CN']] = {
                config:item.config,
                problem_list:item.problem_list
            }
        }else{
            obj[item.config.title['zh-CN']].problem_list.push(...item.problem_list)
        }
    });
    for (let key in obj){
        arr.push(
            obj[key]
        )
    }
    return arr
}
// 获取树状数组所有id
export const useTreeAllId = (tree: any):any => {
    let ids = [];
    for (let node of tree) {
      ids.push(node.id); // 将当前节点的ID添加到数组中
      ids = ids.concat(useTreeAllId(node.children)); // 递归获取子节点的ID
    }
    return ids;
}
export const useTreeToList = (arr:any[]):any => {
    let result = []
    for (let item of arr) {
      var res = JSON.parse(JSON.stringify(item))
      delete res['children']
      result.push(res)
      if (item.children instanceof Array && item.children.length > 0) {
        result = result.concat(useTreeToList(item.children))
      }
    }
    return result
  }