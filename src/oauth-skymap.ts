// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import { LoaderFactory, TypeFLoaderEnum } from "./loader";
import { IConfig } from "./models";
import { AuthProfile } from "./profile";
import { AuthDebug, createUrl } from "./utils";
export default class Oauth {
  config: IConfig;
  profile: AuthProfile;
  promises: { login?: Promise<any> | null };
  listeners: any;
  constructor(public providerUrl: string, config: IConfig) {
    this.config = config;
    this.profile = new AuthProfile({ storageType: "local" });
    this.promises = {};
    this.listeners = {};
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
      this.profile.parseParams(data);
    } else if (typeof data === "undefined") {
      this.profile.parseParams(window.location.href);
    } else {
      // no response provided.
      return;
    }
    AuthDebug.log("Receving response in callback", response);
  }
}
export const epoch = function() {
  return Math.round(new Date().getTime() / 1000.0).toString();
};
