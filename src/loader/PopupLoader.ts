import { AuthDebug } from "../utils";
import { ALoader, IOption } from "./ALoader";

export class PopupLoader extends ALoader {
  public setOption(option: IPopupOption) {
    this._option = Object.assign(defaultOption, option);
  }
  private _getSetting() {
    const { height, width } = this.option;
    const top = window.innerHeight / 2 - height / 2 + window.screenTop;
    const left = window.innerWidth / 2 - width / 2 + window.screenLeft;
    return `height=${height}, width=${width}, status=yes, toolbar=no, menubar=no, location=no, top=${top}, left=${left}`;
  }
  execute() {
    const popupWindow = window.open(this.url, name, this._getSetting());
    if (!popupWindow) {
      return Promise.reject(
        new ReferenceError(
          "We were unable to open the popup window, its likely that the request was blocked."
        )
      );
    }

    popupWindow.focus();
    return new Promise((resolve: (value: string) => void) => {
      const checker = setInterval(() => {
        try {
          if (!popupWindow.closed) {
            const redirectUrl = this.config.redirect_url;
            AuthDebug.log("redirectUrl popup", popupWindow.location);
            if (popupWindow.location.href.indexOf(redirectUrl) !== 0) return;
            const returnurl = popupWindow.location.href;
            AuthDebug.log("returnurl popup", returnurl);
            popupWindow.close();
            resolve(returnurl);
          }
          clearInterval(checker);
          setTimeout(resolve);
        } catch (e) {}
      }, 100);
    });
  }
}
export interface IPopupOption extends IOption {
  name: string;
  height: number;
  width: number;
}

const defaultOption: IPopupOption = {
  name: "oauth",
  height: 600,
  width: 400
};
