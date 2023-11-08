export namespace types {
    export interface Template {
      code: number;
      msg: string;
      data: {}
    }
    export interface IResponseData<T = {}> {
      status: number;
      msg: string;
      data: T;
      code: number;
    }
    export interface ApiClient extends Template {
      data: {
        list:Menu[];
        count:number;
      }
    }
    export interface Menu {
      id?:number;
      name:string;
      type?:number;
      status?:number;
      router:string;
      icon:string;
    }
  }
 