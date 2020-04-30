import { StorageType } from "../store";

export interface IConfig {
  response_type: string;
  client_id: string;
  redirect_url: string;
  scope: string;
  client_secret?: string;
}
export interface IOauthOption {
  providerUrl: string;
  debug: boolean;
  storageType: StorageType;
}
export interface IResponse {
  access_token: string;
  refresh_token?: string;
  token_type: "Bearer";
  expires_in: number;
}
