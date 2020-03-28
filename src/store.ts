
export class Store {
  saveState(state: string, obj: any) {
    localStorage.setItem('state-' + state, JSON.stringify(obj));
  }
  getState(state: string) {
    // log("getState (" + state+ ")");
    var obj = JSON.parse(localStorage.getItem('state-' + state) || '{}');
    localStorage.removeItem('state-' + state);
    return obj;
  }
  saveToken(provider: string, token: string) {
    // log("Save Tokens (" + provider+ ")");
    localStorage.setItem('tokens-' + provider, JSON.stringify(token));
  }

  getToken(provider: string) {
    var token = JSON.parse(localStorage.getItem('tokens-' + provider) || '{}');
    if (!token) token= "";
    return token;
  }
}
export default Store;
