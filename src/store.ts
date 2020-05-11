import { IConfig, IOauthOption } from "./models";
import { AuthDebug, getResponseFromURL } from "./utils";

export class AuthStore {
  get authOption(): IOauthOption {
    return JSON.parse(this.getItem("auth.config.oauthoption") || "{}");
  }
  set authOption(config: IOauthOption) {
    if (Object.keys(config).length > 0)
      this.saveItem("auth.config.oauthoption", JSON.stringify(config));
  }
  get authConfig(): IConfig {
    return JSON.parse(this.getItem("auth.config.authconfig") || "{}");
  }
  set authConfig(config: IConfig) {
    if (Object.keys(config).length > 0)
      this.saveItem("auth.config.authconfig", JSON.stringify(config));
  }
  get tokenType() {
    return this.getItem("auth.token.token-type");
  }
  set tokenType(tokenType) {
    this.saveItem("auth.token.token-type", tokenType);
  }
  get expiration() {
    const expiration = this.getItem("auth.token.expiration");
    return expiration ? Number(expiration) : null;
  }
  set expiration(expiration) {
    this.saveItem("auth.token.expiration", expiration + "");
  }

  get accessToken() {
    return this.getItem("auth.token.access-token");
  }
  set accessToken(accessToken) {
    this.saveItem("auth.token.access-token", accessToken);
  }

  get refreshToken() {
    return this.getItem("auth.token.refresh-token");
  }
  set refreshToken(refreshToken) {
    this.saveItem("auth.token.refresh-token", refreshToken);
  }

  get idToken() {
    return this.getItem("auth.id-token");
  }
  set idToken(idToken) {
    this.saveItem("auth.id-token", idToken);
  }
  get verifier() {
    return this.getItem("auth.token.verifier");
  }
  set verifier(verifier) {
    this.saveItem("auth.token.verifier", verifier);
  }

  get challenge() {
    return this.getItem("auth.token.challenge");
  }
  set challenge(challenge) {
    this.saveItem("auth.token.challenge", challenge);
  }

  get code() {
    return this.getItem("auth.code");
  }
  set code(code) {
    this.saveItem("auth.code", code);
  }

  get localState() {
    return this.getItem("auth.local-state");
  }
  set localState(localState) {
    this.saveItem("auth.local-state", localState);
  }

  get error() {
    return this.getItem("auth.error");
  }
  set error(error) {
    this.saveItem("auth.error", error);
  }
  get state() {
    return this.getItem("auth.state");
  }
  set state(state) {
    this.saveItem("auth.state", state);
  }

  get redirectUrl() {
    return this.getItem("auth.redirect-url");
  }
  set redirectUrl(redirectUrl) {
    this.saveItem("auth.redirect-url", redirectUrl);
  }
  constructor(private config: { storageType: StorageType }) {}
  get storageType() {
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
