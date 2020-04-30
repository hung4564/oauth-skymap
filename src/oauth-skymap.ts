// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import { LoaderFactory, TypeFLoaderEnum } from "./loader";
import { IConfig, IOauthOption } from "./models";
import { AuthProfile } from "./profile";
import { AuthDebug, createUrl, epoch } from "./utils";
export const defaultOauthOption: IOauthOption = {
  providerUrl: "http://localhost:8000",
  debug: true
};
export default class Oauth {
  config: IConfig;
  profile: AuthProfile;
  promises: { login?: Promise<any> | null };
  listeners: any;
  public providerUrl: string = "";
  constructor(config: IConfig, option: IOauthOption = defaultOauthOption) {
    if (!config) {
      throw new ReferenceError("A config must be provided.");
    }
    this.config = config;
    this.profile = new AuthProfile({ storageType: "local" });
    this.promises = {};
    this.listeners = {};
    this.setOption(option);
  }
  setOption(option: IOauthOption) {
    AuthDebug.log("Set Oauth Option", option);
    this.providerUrl = option.providerUrl;
    AuthDebug.isDebug = option.debug;
  }
  configure(config: IConfig) {
    this.config = Object.assign(this.config, config);
  }
  getloginUrl() {
    this.profile.localState = epoch();
    let authorizeEndpoint = `${this.providerUrl}/oauth/authorize`;
    return createUrl(authorizeEndpoint, {
      state: this.profile.localState,
      response_type: this.config.response_type,
      redirect_uri: this.config.redirect_url,
      client_id: this.config.client_id,
      scope: this.config.scope
    });
  }
  login(type: TypeFLoaderEnum) {
    const loader = LoaderFactory.getLoader(type);
    if (this.promises.login) {
      return this.promises.login;
    }
    this.profile.clear();
    this.promises.login = loader(this.getloginUrl(), this.config)
      .execute()
      .then(callbackUrl => {
        AuthDebug.log("callbackUrl", callbackUrl);
        this.promises.login = null;
        this.profile.parseParams(callbackUrl);
        const response = this.profile.code;
        return response;
      });
    return this.promises.login;
  }
  callback(data: any) {
    let response = null;
    if (typeof data === "object") {
      response = data;
    } else if (typeof data === "string") {
      response = this.profile.parseParams(data);
    } else if (typeof data === "undefined") {
      response = this.profile.parseParams(window.location.href);
    } else {
      // no response provided.
      return;
    }
    AuthDebug.log("Receving response in callback", response);
  }
}
