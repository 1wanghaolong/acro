export type RoleType = '' | '*' | 'root' | 'user' | '1';
export interface UserState {
  name?: string;
  avatar?: string;
  job?: string;
  organization?: string;
  location?: string;
  email?: string;
  introduction?: string;
  personalWebsite?: string;
  jobName?: string;
  organizationName?: string;
  locationName?: string;
  phone?: string;
  registrationDate?: string;
  accountId?: string;
  certification?: number;
  roles?:RoleType;
  permissions?:any;
  permissions_menu_button?:any;
  logo_big?:any
}


export interface requestData {
  key?:string,
  base64?:string,
  captchaEnabled?:Boolean,
  img?:string,
  uuid?:string
}