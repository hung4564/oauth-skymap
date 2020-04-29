import { ALoader } from "./ALoader";

export class NewWindownLoader extends ALoader {
  execute() {
    const tabWindow = window.open(this.url, "_blank");
    if (!tabWindow) {
      return Promise.reject(
        new ReferenceError(
          "We were unable to open the new tab, its likely that the request was blocked."
        )
      );
    }
    tabWindow.name = this.option.name;
    tabWindow.focus();
    return new Promise((resolve: (value: string) => void) => {
      const checker = setInterval(() => {
        try {
          if (!tabWindow.closed) {
            const redirectUrl = this.config.redirect_url;
            if (tabWindow.location.href.indexOf(redirectUrl) !== 0) return;
            const returnurl = tabWindow.location.href;
            tabWindow.close();
            resolve(returnurl);
          }
          clearInterval(checker);
          setTimeout(resolve);
        } catch (e) {}
      }, 100);
    });
  }
}
