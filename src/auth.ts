import { IResponse } from "./models";
import { AuthDebug } from "./utils";
export interface IAuthConfig {
  providerUrl: string;
  profileUrl?: string;
  vaildUrl?: string;
}
export class AuthProfile {
  constructor(private _option: IAuthConfig) {
    AuthDebug.log("Set  auth Option", _option);
  }
  setConfig(_option: IAuthConfig) {
    AuthDebug.log("Set  auth Option", _option);
    this._option = _option;
  }
  setToken(response: IResponse) {
    AuthDebug.log("Set token response", response);
    setCookie("access_token", response.access_token, response.expires_in);
    if (response.refresh_token) {
      setCookie("refresh_token", response.refresh_token, response.expires_in);
    }
  }
  getToken() {
    let access_token = getCookie("access_token");
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
function setCookie(cname: string, cvalue: string, exdays: number) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
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
