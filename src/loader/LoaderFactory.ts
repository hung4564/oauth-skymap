import { IConfig } from "../models";
import { ALoader } from "./ALoader";
import { HTTPRedirectLoader } from "./HTTPRedirectLoader";
import { NewWindownLoader } from "./NewWindownLoader";
import { PopupLoader } from "./PopupLoader";

export class LoaderFactory {
  static getLoader(type: TypeFLoaderEnum = "popup") {
    const loader = LoaderFactory.defautFactory[type];
    if (!loader) {
      throw ReferenceError(`Unknown ${type}`);
    }
    return loader;
  }
  private static defautFactory: {
    [key in TypeFLoaderEnum]?: (url: string, config: IConfig) => ALoader;
  } = {
    popup: (url, config) => new PopupLoader(url, config),
    newwindown: (url, config) => new NewWindownLoader(url, config),
    httpredirect: (url, config) => new HTTPRedirectLoader(url, config)
  };
}

export type TypeFLoaderEnum = "popup" | "newwindown" | "iframe" | "httpredirect";
