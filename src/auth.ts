import { AuthStore } from "./store";
import { AuthDebug } from "./utils";
export interface IAuthConfig {
  logOutUrl?: string;
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
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`
      }
    });
    return await res.json();
  }
  async logOut(access_token?: string) {
    access_token = access_token || this.getToken();
    AuthDebug.log("logout access_token", access_token);
    let url = this._option.logOutUrl || `${this._option.providerUrl}/api/logout`;
    const res = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`
      }
    });
    return await res.json();
  }
  async validateToken(scopes: any) {
    let access_token = this.getToken();
    AuthDebug.log("profile access_token", access_token);
    let url = this._option.vaildUrl || `${this._option.providerUrl}/api/validate-token`;
    let params: any = { scopes };
    let query = Object.keys(params)
      .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
      .join("&");
    const res = await fetch(url + "?" + query, {
      method: "get",
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });
    return await res.json();
  }
}
export default AuthProfile;
