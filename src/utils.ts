import { IConfig } from "./models";

export class AuthUtils {
  constructor(private config: IConfig) {}
  openPopup(url: string, name = "oauth", height = 600, width = 400): Promise<string> {
    AuthDebug.log("utilt -> openpopup ->url");
    const top = window.innerHeight / 2 - height / 2 + window.screenTop;
    const left = window.innerWidth / 2 - width / 2 + window.screenLeft;
    const popupWindow = window.open(
      url,
      name,
      `height=${height}, width=${width}, status=yes, toolbar=no, menubar=no, location=no, top=${top}, left=${left}`
    );
    if (!popupWindow) {
      return Promise.reject(
        new ReferenceError(
          "We were unable to open the popup window, its likely that the request was blocked."
        )
      );
    }

    popupWindow.focus();
    return new Promise(resolve => {
      const checker = setInterval(() => {
        try {
          if (!popupWindow.closed) {
            const redirectUrl = this.config.redirect_url;
            AuthDebug.log("utilt -> openpopup -> redirectUrl", redirectUrl);
            AuthDebug.log("utilt -> openpopup -> popup.href", popupWindow.location.href);
            if (popupWindow.location.href.indexOf(redirectUrl) !== 0) return;
            const returnurl = popupWindow.location.href;
            popupWindow.close();
            resolve(returnurl);
          }
          clearInterval(checker);
          setTimeout(resolve);
        } catch (e) {}
      }, 100);
    });
  }
  createUrl(baseUrl: string, queryParams: { [key: string]: string } = {}) {
    let url = baseUrl;
    Object.keys(queryParams).forEach(key => {
      const value = queryParams[key];
      if ([undefined, null, ""].indexOf(value) === -1) {
        url += `${url.indexOf("?") === -1 ? "?" : "&"}${key}=${encodeURIComponent(value)}`;
      }
    });

    AuthDebug.log("utilt -> createUrl", url);
    return url;
  }
}
export class AuthDebug {
  static isDebug = true;
  static log(message: string, args?: any) {
    if (AuthDebug.isDebug) {
      console.log(message, args);
    }
  }
}
export default AuthUtils;
