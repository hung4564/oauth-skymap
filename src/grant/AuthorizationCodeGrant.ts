import jsSHA from "jssha";
import { IConfig, IResponse } from "../models";
import { AuthDebug, createUrl, epoch } from "../utils";
import { AGrant } from "./IGrant";
export interface IAuthorizationCodeResponse extends IResponse {
  state?: string;
  code?: string;
}
export class AuthorizationCodeGrant extends AGrant {
  handleResponse(response: IAuthorizationCodeResponse) {
    let tokenRequest: any = {
      grant_type: "authorization_code",
      code: response.code,
      redirect_uri: this.config.redirect_url,
      client_id: this.config.client_id
    };
    if (!this.config.client_secret) {
      let verifier = this._store.verifier;
      tokenRequest = {
        ...tokenRequest,
        code_verifier: Base64EncodeUrl(verifier || "")
      };
    } else {
      tokenRequest = {
        ...tokenRequest,
        client_secret: this.config.client_secret
      };
    }
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
    let tokenRequest: any = {
      state: this._store.localState,
      response_type: this.config.response_type,
      redirect_uri: this.config.redirect_url,
      client_id: this.config.client_id,
      scope: this.config.scope
    };
    if (!this.config.client_secret) {
      let verifier = generateCodeVerifier();
      if (!["S256", "plain"].includes(this.config.code_challenge_method)) {
        throw new ReferenceError(
          `Not support code challenge method ${this.config.code_challenge_method}`
        );
      }
      if (this.config.code_challenge_method == "S256") {
        const shaObj = new jsSHA("SHA-256", "TEXT", { encoding: "UTF8" });
        shaObj.update(verifier);
        let challenge = shaObj.getHash("B64", { b64Pad: "=" });
        this._store.verifier = verifier;
        this._store.challenge = challenge;
      } else {
        this._store.verifier = verifier;
        this._store.challenge = verifier;
      }
      tokenRequest = {
        ...tokenRequest,
        code_challenge: Base64EncodeUrl(this._store.challenge),
        code_challenge_method: this.config.code_challenge_method
      };
    }
    let authorizeEndpoint = `${this.providerUrl}/oauth/authorize`;
    return createUrl(authorizeEndpoint, tokenRequest);
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
function generateCodeVerifier() {
  return generateRandomString(128);
}
function generateRandomString(length: number) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
function Base64EncodeUrl(str: string) {
  return str
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/\=+$/, "");
}
