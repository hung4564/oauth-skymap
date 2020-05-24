import { IConfig, IOauthOption } from "./models";
import { AuthDebug, getResponseFromURL } from "./utils";

export class AuthStore {
  store: any = {};
  get authOption(): IOauthOption {
    if (this.store.authOption) {
      return this.store.authOption;
    }
    return JSON.parse(this.getItem("auth.config.oauthoption") || "{}");
  }
  set authOption(config: IOauthOption) {
    if (Object.keys(config).length > 0) {
      this.store.authOption = JSON.parse(JSON.stringify(config));
      this.saveItem("auth.config.oauthoption", JSON.stringify(config));
    }
  }
  get authConfig(): IConfig {
    if (this.store.authConfig) {
      return this.store.authConfig;
    }
    return JSON.parse(this.getItem("auth.config.authconfig") || "{}");
  }
  set authConfig(config: IConfig) {
    if (Object.keys(config).length > 0) {
      this.store.authConfig = JSON.parse(JSON.stringify(config));
      this.saveItem("auth.config.authconfig", JSON.stringify(config));
    }
  }
  get tokenType() {
    if (this.store.tokenType) {
      return this.store.tokenType;
    }
    return this.getItem("auth.token.token-type");
  }
  set tokenType(tokenType) {
    this.store.tokenType = tokenType;
    this.saveItem("auth.token.token-type", tokenType);
  }
  get expiration() {
    if (this.store.expiration) {
      return this.store.expiration;
    }
    const expiration = this.getItem("auth.token.expiration");
    return expiration ? Number(expiration) : null;
  }
  set expiration(expiration) {
    this.store.expiration = expiration;
    this.saveItem("auth.token.expiration", expiration + "");
  }

  get accessToken() {
    if (this.store.accessToken) {
      return this.store.accessToken;
    }
    return this.getItem("auth.token.access-token");
  }
  set accessToken(accessToken) {
    this.store.accessToken = accessToken;
    this.saveItem("auth.token.access-token", accessToken);
  }

  get refreshToken() {
    if (this.store.refreshToken) {
      return this.store.refreshToken;
    }
    return this.getItem("auth.token.refresh-token");
  }
  set refreshToken(refreshToken) {
    this.store.refreshToken = refreshToken;
    this.saveItem("auth.token.refresh-token", refreshToken);
  }

  get idToken() {
    if (this.store.idToken) {
      return this.store.idToken;
    }
    return this.getItem("auth.id-token");
  }
  set idToken(idToken) {
    this.store.idToken = idToken;
    this.saveItem("auth.id-token", idToken);
  }
  get verifier() {
    if (this.store.verifier) {
      return this.store.verifier;
    }
    return this.getItem("auth.token.verifier");
  }
  set verifier(verifier) {
    this.store.verifier = verifier;
    this.saveItem("auth.token.verifier", verifier);
  }

  get challenge() {
    if (this.store.challenge) {
      return this.store.challenge;
    }
    return this.getItem("auth.token.challenge");
  }
  set challenge(challenge) {
    this.store.challenge = challenge;
    this.saveItem("auth.token.challenge", challenge);
  }

  get code() {
    if (this.store.code) {
      return this.store.code;
    }
    return this.getItem("auth.code");
  }
  set code(code) {
    this.store.code = code;
    this.saveItem("auth.code", code);
  }

  get localState() {
    if (this.store.localState) {
      return this.store.localState;
    }
    return this.getItem("auth.local-state");
  }
  set localState(localState) {
    this.store.localState = localState;
    this.saveItem("auth.local-state", localState);
  }

  get error() {
    if (this.store.error) {
      return this.store.error;
    }
    return this.getItem("auth.error");
  }
  set error(error) {
    this.store.error = error;
    this.saveItem("auth.error", error);
  }
  get state() {
    if (this.store.state) {
      return this.store.state;
    }
    return this.getItem("auth.state");
  }
  set state(state) {
    this.store.state = state;
    this.saveItem("auth.state", state);
  }

  get redirectUrl() {
    if (this.store.redirectUrl) {
      return this.store.redirectUrl;
    }
    return this.getItem("auth.redirect-url");
  }
  set redirectUrl(redirectUrl) {
    this.store.redirectUrl = redirectUrl;
    this.saveItem("auth.redirect-url", redirectUrl);
  }
  constructor(private config: { storageType: StorageType }) {}
  get storageType() {
    if (this.store.storageType) {
      return this.store.storageType;
    }
    return this.config.storageType;
  }
  get storage() {
    return this.getStorage(this.config.storageType);
  }
  getItem(key: string, overrideStorageType?: StorageType) {
    let value: string;
    const storage = overrideStorageType ? this.getStorage(overrideStorageType) : this.storage;
    value = storage.getItem(key) || "";

    return value || null;
  }
  saveItem(key: string, value: string | null | undefined, overrideStorageType?: StorageType) {
    const storage = overrideStorageType ? this.getStorage(overrideStorageType) : this.storage;
    if (value == null || value == undefined) {
      storage.removeItem(key);
    } else {
      storage.setItem(key, value);
    }
  }
  getStorage(storageType: StorageType) {
    switch (storageType) {
      case "local":
        return localStorage;
      case "session":
        return sessionStorage;
      case "cookie":
        return {
          getItem(key: string) {
            return getCookie(key);
          },
          setItem(key: string, value: string) {
            return setCookie(key, value, 60 * 60);
          },
          removeItem(key: string) {
            return setCookie(key, "", 1);
          }
        };
      default:
        throw new ReferenceError(`Unknown Storage Type ({storageType})`);
    }
  }
  clear() {
    const regex = this.authOption.rememberme
      ? new RegExp(/^auth(?!.token)\./)
      : new RegExp(/^auth\./);

    for (const key in localStorage) {
      if (key.match(regex)) {
        localStorage.removeItem(key);
      }
    }

    for (const key in sessionStorage) {
      if (key.match(regex)) {
        sessionStorage.removeItem(key);
      }
    }
  }
  parseParams(callbackUrl: string) {
    if (callbackUrl) {
      const params = getResponseFromURL(callbackUrl);

      AuthDebug.log(`Hash detected, parsing...`, params);
      for (const property in params) {
        this.parse(property, params[property]);
      }
      AuthDebug.log(`Removing hash...`);
      history.pushState(
        "",
        document.title,
        location.href.replace(location.search, "").replace(location.hash, "")
      );
      return params;
    }
  }
  passObject(data: { [key: string]: string }) {
    Object.keys(data).forEach(key => {
      this.parse(key, data[key]);
    });
  }

  parse(key: string, value: string) {
    switch (key) {
      case "token_type":
        this.tokenType = value;
        break;
      case "expires_in":
        this.expiration = Date.now() + Number(value) * 1000;
        break;
      case "access_token":
        this.accessToken = value;
        break;
      case "refresh_token":
        this.refreshToken = value;
        break;
      case "id_token":
        this.idToken = value;
        break;
      case "code":
        this.code = value;
        break;
      case "state":
        this.state = value;
        break;
      case "error":
        this.error = value;
        break;
    }
  }
}
export type StorageType = "local" | "session" | "cookie";
export default AuthStore;

function setCookie(cname: string, cvalue: string, exsecond: number) {
  var d = new Date();
  d.setTime(d.getTime() + exsecond);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname: string) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
