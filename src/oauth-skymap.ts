// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import AuthProfile from "./auth";
import { AuthorizationCodeGrant, IGrant } from "./grant";
import { LoaderFactory, TypeFLoaderEnum } from "./loader";
import { IConfig, IOauthOption, IResponse } from "./models";
import { AuthStore, StorageType } from "./store";
import { AuthDebug, createUrl, epoch } from "./utils";
export const defaultOauthOption: IOauthOption = {
  providerUrl: "http://localhost:8000",
  debug: true,
  storageType: "local",
  rememberme: true
};
export default class Oauth {
  store!: AuthStore;
  private promises: {
    login?: Promise<IResponse | undefined> | null;
  };
  auth!: AuthProfile;
  private grants: IGrant[] = [];
  public providerUrl: string = "";
  private _grant!: IGrant;
  constructor(config: IConfig, option: IOauthOption) {
    this.promises = {};
    this.setStore(option && option.storageType);
    this.setOption(option || this.store.authOption);
    this.setDefaultGrant();
    this.setConfig(config || this.store.authConfig);
    if (!this.store.authConfig) {
      throw new ReferenceError("A config must be provided.");
    }
  }
  setDefaultGrant() {
    this.grants.push(new AuthorizationCodeGrant(this.store, this.providerUrl));
  }
  setGrant(grant: IGrant) {
    grant.setProviderUrl(this.providerUrl);
    this.grants.push(grant);
  }
  setOption(option: IOauthOption) {
    option = Object.assign(defaultOauthOption, option);
    AuthDebug.log("Set Oauth Option", option);
    this.providerUrl = option.providerUrl;
    this.grants.forEach(grant => grant.setProviderUrl(this.providerUrl));
    AuthDebug.isDebug = !!option.debug;
    this.setStore(option.storageType);
    this.store.authOption = option;
    this.setAuth(option);
  }
  setStore(storageType: StorageType = "local") {
    if (!this.store || this.store.storageType != storageType) {
      this.store = new AuthStore({ storageType });
      this.grants.forEach(grant => grant.setStore(this.store));
      if (this.auth) this.auth.setStore(this.store);
    }
  }
  setAuth(option: IOauthOption) {
    if (this.auth) {
      this.auth.setConfig({ providerUrl: option.providerUrl });
    } else {
      this.auth = new AuthProfile({ providerUrl: option.providerUrl }, this.store);
    }
  }
  setConfig(config: IConfig) {
    AuthDebug.log("Set Oauth config", config);
    this.store.authConfig = Object.assign({}, config);
    this._grant = this.getGrantHandle();
  }
  getloginUrl() {
    this.store.localState = epoch();
    let authorizeEndpoint = `${this.providerUrl}/oauth/authorize`;
    return createUrl(authorizeEndpoint, {
      state: this.store.localState,
      response_type: this.store.authConfig.response_type,
      redirect_uri: this.store.authConfig.redirect_url,
      client_id: this.store.authConfig.client_id,
      scope: this.store.authConfig.scope
    });
  }
  getGrantHandle() {
    AuthDebug.log("Config when get grant", this.store.authConfig);
    const grant = this.grants.find(x => x.canHandleRequest(this.store.authConfig));
    if (!grant) {
      throw new ReferenceError("Invaild response_type");
    }
    grant.setConfig(this.store.authConfig);
    return grant;
  }
  getLoaderHandle(type: TypeFLoaderEnum = "httpredirect") {
    return LoaderFactory.getLoader(type);
  }
  login(type: TypeFLoaderEnum) {
    if (this.promises.login) {
      return this.promises.login;
    }
    const loader = this.getLoaderHandle(type);
    this.promises.login = loader(this._grant.getloginUrl(), this.store.authConfig)
      .execute()
      .then(callbackUrl => {
        this.promises.login = null;
        AuthDebug.log("callbackUrl", callbackUrl);
        return this.callback(callbackUrl);
      })
      .catch(e => {
        this.promises.login = null;
        throw e;
      });
    return this.promises.login;
  }
  async callback(data: any) {
    let response: any = null;
    if (!this.store.authConfig) {
      this.setConfig(this.store.authConfig);
    }
    let handle = handleCallback[typeof data];
    if (!handle) {
      throw new ReferenceError("Invaild data callback");
    }
    response = handle.handle(data, this.store);
    if (this.store.state != this.store.localState) {
      this.store.clear();
      throw new ReferenceError("Invaild request");
    }
    AuthDebug.log("Receving response in callback", response);
    const result = await this._grant.handleResponse(response);
    this.setToken(result);
    this.store.clear();
    return result;
  }
  setToken(result: any) {
    this.store.passObject(result);
  }
}
export * from "./grant";
const handleCallback: { [key: string]: { handle: any } } = {
  string: { handle: (data: any, store: AuthStore) => store.parseParams(data) },
  undefined: { handle: (data: any, store: AuthStore) => store.parseParams(window.location.href) },
  object: { handle: (data: any, store: AuthStore) => data }
};
