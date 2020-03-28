// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import { IConfig } from "./models";
import Store from "./store";
import { openPopup } from "./utils";
export default class Oauth {
  config: IConfig;
  store: Store;
  constructor(public providerUrl: string, config: IConfig) {
    this.config = config;
    this.store = new Store();
  }
  configure(config: IConfig) {
    this.config = Object.assign(this.config, config);
  }
  login() {
    let params = Object.entries(this.config)
      .map(([key, val]) => `${key}=${val}`)
      .join("&");
    return openPopup(this.providerUrl + "/oauth/authorize?" + params);
  }
}
