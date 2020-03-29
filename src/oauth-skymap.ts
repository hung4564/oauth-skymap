// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import { IConfig } from "./models";
import { AuthProfile } from "./profile";
import { AuthUtils } from "./utils";
export default class Oauth {
  config: IConfig;
  util: AuthUtils;
  profile: AuthProfile;
  promises: { login?: Promise<any> | null };
  listeners: any;
  constructor(public providerUrl: string, config: IConfig) {
    this.config = config;
    this.util = new AuthUtils(this.config);
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
    return this.util.createUrl(authorizeEndpoint, {
      state: this.profile.localState,
      response_type: this.config.response_type,
      redirect_uri: this.config.redirect_url,
      client_id: this.config.client_id,
      scope: this.config.scope
    });
  }
  loginWithPopup() {
    if (this.promises.login) {
      return this.promises.login;
    }
    this.profile.clear();
    this.promises.login = this.util.openPopup(this.getloginUrl()).then(callbackUrl => {
      this.promises.login = null;
      this.profile.parseParams(callbackUrl);
      const response = this.profile.code;
      return response;
    });
    return this.promises.login;
  }
}
export const epoch = function() {
  return Math.round(new Date().getTime() / 1000.0).toString();
};
