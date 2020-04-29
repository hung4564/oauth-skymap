export class AuthDebug {
  static isDebug = true;
  static log(message: string, args?: any) {
    if (AuthDebug.isDebug) {
      console.log(message, args);
    }
  }
}
export function createUrl(baseUrl: string, queryParams: { [key: string]: string } = {}) {
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
export function getResponseFromURL(url: string) {
  if (url.indexOf("#") !== -1) {
    return parseQueryString(url.substring(url.indexOf("#") + 1));
  } else if (url.indexOf("?") !== -1) {
    return parseQueryString(url.substring(url.indexOf("?") + 1));
  }
  return {};
}
export function parseQueryString(qs: string) {
  var e,
    a = /\+/g, // Regex for replacing addition symbol with a space
    r = /([^&;=]+)=?([^&;]*)/g,
    d = function(s: string) {
      return decodeURIComponent(s.replace(a, " "));
    },
    q = qs,
    urlParams: { [key: string]: string } = {};

  /* jshint ignore:start */
  while ((e = r.exec(q))) {
    urlParams[d(e[1])] = d(e[2]);
  }
  /* jshint ignore:end */

  return urlParams;
}
