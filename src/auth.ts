import { AuthStore } from "./store";
import { AuthDebug } from "./utils";
export interface IAuthConfig {
  providerUrl: string;
  profileUrl?: string;
  vaildUrl?: string;
}
export class AuthProfile {
  constructor(private _option: IAuthConfig, private _store: AuthStore) {
    AuthDebug.log("Set auth Option", _option);
  }
  setConfig(_option: IAuthConfig) {
    AuthDebug.log("Set auth Option", _option);
    this._option = _option;
  }
  setStore(_store: AuthStore) {
    this._store = _store;
  }
  getToken() {
    let access_token = this._store.accessToken;
    if (!access_token) {
      throw new Error("missing [access_token]");
    }
    return access_token;
  }
  async profile() {
    let access_token = this.getToken();
    AuthDebug.log("profile access_token", access_token);
    let url = this._option.profileUrl || `${this._option.providerUrl}/api/me`;
    const res = await fetch(url, {
      method: "get",
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });
    return await res.json();
  }
  async vaildToken() {
    let access_token = this.getToken();
    AuthDebug.log("profile access_token", access_token);
    let url = this._option.vaildUrl || `${this._option.providerUrl}/api/validate-token`;
    const res = await fetch(url, {
      method: "get",
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });
    return await res.json();
  }
}
export default AuthProfile;
