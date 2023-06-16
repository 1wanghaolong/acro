import axios from 'axios';

//短信通知
export interface getsms {
    id: number;
    type: string;
    title: string;
    subTitle: string;
    avatar?: string;
    count: string;
    time: string;
    status: 0 | 1;
    messageType?: number;
  }
  export type getsmsment = getsms[];
  
  export function getsmsList(params:any) {
    return axios.get<getsmsment>(`/sms`,{ params });
  }