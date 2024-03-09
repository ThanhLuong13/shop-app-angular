import { Role } from "./role";

export interface User {
  id: number;
  fullname: string;
  phone_number: string;
  address: string;
  date_of_birth: string;
  facebook_account_id: number;
  google_account_id: number;
  role: Role;
  active: boolean;
}
