import { IConfig, IResponse } from "../models";
import { AuthDebug, createUrl, epoch } from "../utils";
import { AGrant } from "./IGrant";
export interface IAuthorizationCodeResponse extends IResponse {
  state?: string;
  code?: string;
}
export class AuthorizationCodeGrant extends AGrant {
  handleResponse(response: IAuthorizationCodeResponse) {
    if (!this.config.client_secret) {
      throw new Error("Configuration missing [client_secret]");
    }
    let tokenRequest = {
      grant_type: "authorization_code",
      code: response.code,
      redirect_uri: this.config.redirect_url,
      client_id: this.config.client_id,
      client_secret: this.config.client_secret
    };
    AuthDebug.log("Receving tokenRequest in callback", tokenRequest);
    return fetch(`${this.providerUrl}/oauth/token`, {
      method: "post",
      headers: { "content-type": "application/x-www-form-urlencoded", Accept: "application/json" },
      body: encodeQS(tokenRequest)
    }).then(res => {
      return res.json();
    });
  }
  canHandleResponse(response: IAuthorizationCodeResponse) {
    return response.hasOwnProperty("code");
  }
  getloginUrl() {
    this._store.localState = epoch();
    let authorizeEndpoint = `${this.providerUrl}/oauth/authorize`;
    return createUrl(authorizeEndpoint, {
      state: this._store.localState,
      response_type: this.config.response_type,
      redirect_uri: this.config.redirect_url,
      client_id: this.config.client_id,
      scope: this.config.scope
    });
  }
  canHandleRequest(config: IConfig) {
    return config.response_type == "code";
  }
}
const encodeQS = function(params: any) {
  let res = "";
  var k,
    i = 0;
  for (k in params) {
    res += (i++ === 0 ? "" : "&") + encodeURIComponent(k) + "=" + encodeURIComponent(params[k]);
  }
  return res;
};
