export interface IConfig {
  response_type: string;
  client_id: string;
  redirect_url: string;
  scope: string;
}
export interface IOauthOption {
  providerUrl: string;
  debug: boolean;
}
