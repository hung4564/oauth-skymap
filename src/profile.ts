import { AuthDebug, getResponseFromURL } from "./utils";

export class AuthProfile {
  get tokenType() {
    return this.getItem("auth.token-type");
  }
  set tokenType(tokenType) {
    this.saveItem("auth.token-type", tokenType);
  }

  get expiration() {
    const expiration = this.getItem("auth.expiration");
    return expiration ? Number(expiration) : null;
  }
  set expiration(expiration) {
    this.saveItem("auth.expiration", expiration?.toString());
  }

  get accessToken() {
    return this.getItem("auth.access-token");
  }
  set accessToken(accessToken) {
    this.saveItem("auth.access-token", accessToken);
  }

  get idToken() {
    return this.getItem("auth.id-token");
  }
  set idToken(idToken) {
    this.saveItem("auth.id-token", idToken);
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

  getItem(key: string, overrideStorageType?: StorageType) {
    let value: string;
    const storage = overrideStorageType ? this.getStorage(overrideStorageType) : this.storage;
    value = storage.getItem(key) || "";

    return value || null;
  }
  get storage() {
    return this.getStorage(this.config.storageType);
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
    if (storageType === "local") {
      return localStorage;
    } else if (storageType === "session") {
      return sessionStorage;
    } else {
      throw new ReferenceError(`Unknown Storage Type ({storageType})`);
    }
  }
  clear() {
    const regex = new RegExp(/^auth\./);

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
    }
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
type StorageType = "local" | "session";
export default AuthProfile;
