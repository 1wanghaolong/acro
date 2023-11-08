export interface Menu {
    path: string;
    name: string;
    meta: {
        login: Boolean;
        title: string;
        icon?: string;
        auth: string;
        action: string;
        show:Boolean;
    },
    children?:Menu[]
    component?:any;
}
