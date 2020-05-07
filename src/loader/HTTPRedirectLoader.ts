import { ALoader } from "./ALoader";

export class HTTPRedirectLoader extends ALoader {
  execute(): Promise<string> {
    return new Promise((resolve, reject) => {
      window.location.href = this.url;
    });
  }
}
