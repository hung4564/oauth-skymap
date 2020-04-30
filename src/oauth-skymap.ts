// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import { AuthorizationCodeGrant, IGrant } from "./grant";
import { LoaderFactory, TypeFLoaderEnum } from "./loader";
import { IConfig, IOauthOption } from "./models";
import { AuthProfile } from "./profile";
import { AuthDebug, createUrl, epoch } from "./utils";
export const defaultOauthOption: IOauthOption = {
  providerUrl: "http://localhost:8000",
  debug: true
};
export default class Oauth {
  config!: IConfig;
  profile: AuthProfile;
  promises: { login?: Promise<any> | null };
  listeners: any;
  private grants: IGrant[] = [];
  public providerUrl: string = "";
  private _grant!: IGrant;
  constructor(config: IConfig, option: IOauthOption = defaultOauthOption) {
    if (!config) {
      throw new ReferenceError("A config must be provided.");
    }
    this.profile = new AuthProfile({ storageType: "local" });
    this.promises = {};
    this.listeners = {};
    this.setOption(option);
    this.setDefaultGrant();
    this.setConfig(config);
  }
  setDefaultGrant() {
    this.grants.push(new AuthorizationCodeGrant(this.profile, this.providerUrl));
  }
  setGrant(grant: IGrant) {
    this.grants.push(grant);
  }
  setOption(option: IOauthOption) {
    option = Object.assign(defaultOauthOption, option);
    AuthDebug.log("Set Oauth Option", option);
    this.providerUrl = option.providerUrl;
    this.grants.forEach(grant => grant.setProviderUrl(this.providerUrl));
    AuthDebug.isDebug = option.debug;
  }
  setConfig(config: IConfig) {
    this.config = Object.assign({}, config);
    this._grant = this.getGrantHandle();
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
  getGrantHandle() {
    const grant = this.grants.find(x => x.canHandleRequest(this.config));
    if (!grant) {
      throw new ReferenceError("Invaild response_type");
    }
    grant.setConfig(this.config);
    return grant;
  }
  getLoaderHandle(type: TypeFLoaderEnum = "popup") {
    return LoaderFactory.getLoader(type);
  }
  login(type: TypeFLoaderEnum) {
    if (this.promises.login) {
      return this.promises.login;
    }
    const loader = this.getLoaderHandle(type);
    this.profile.clear();
    this.promises.login = loader(this._grant.getloginUrl(), this.config)
      .execute()
      .then(callbackUrl => {
        AuthDebug.log("callbackUrl", callbackUrl);
        return this.callback(callbackUrl);
      });
    return this.promises.login;
  }
  async callback(data: any) {
    let response: any = null;
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
    if (this.profile.state != this.profile.localState) {
      // this.profile.clear();
      throw new ReferenceError("Invaild request");
    }
    AuthDebug.log("Receving response in callback", response);
    const result = await this._grant.handleResponse(response);
    this.profile.clear();
    return result;
  }
}
