import { IConfig } from "../models";
export interface ILoader extends ALoader {}
export abstract class ALoader {
  protected _url: string = "";
  protected _option: IOption = defaultOption;
  protected _config: IConfig;

  constructor(url: string, config: IConfig, option: IOption = defaultOption) {
    this._url = url;
    this._config = config;
    this._option = option;
  }
  setConfig(config: IConfig) {
    this._config = config;
  }
  get config() {
    return this._config;
  }
  setUrl(url: string) {
    this._url = url;
  }
  get url() {
    return this._url;
  }
  public abstract execute(): Promise<string>;
  public setOption(option: IOption) {
    this._option = option;
  }
  get option() {
    return this._option;
  }
}

export interface IOption {
  name: string;
  [key: string]: any;
}

const defaultOption: IOption = {
  name: "oauth"
};
