import { IConfig, IResponse } from "../models";
import AuthProfile from "../profile";

export interface IGrant {
  canHandleResponse(data: IResponse): boolean;
  handleResponse(data: IResponse): Promise<IResponse>;
  canHandleRequest(config: IConfig): boolean;
  getloginUrl(): string;
  vaildConfig(config: IConfig): void;
  setConfig(config: IConfig): void;
  setProviderUrl(url: string): void;
}
export abstract class AGrant implements IGrant {
  protected config!: IConfig;
  constructor(protected _profile: AuthProfile, protected providerUrl: string) {}
  abstract canHandleResponse(data: IResponse): boolean;
  abstract handleResponse(data: IResponse): Promise<IResponse>;
  abstract canHandleRequest(config: IConfig): boolean;
  abstract getloginUrl(): string;
  setConfig(config: IConfig) {
    this.vaildConfig(config);
    this.config = config;
  }
  vaildConfig(config: IConfig) {
    if (!config.client_id) {
      throw new Error("Configuration missing [client_id]");
    }
    if (!config.response_type) {
      throw new Error("Configuration missing [response_type]");
    }
    if (!config.redirect_url) {
      throw new Error("Configuration missing [redirect_url]");
    }
  }
  setProviderUrl(url: string) {
    this.providerUrl = url;
  }
}
