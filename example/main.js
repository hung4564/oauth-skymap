import Oauth from "/dist/oauth-skymap.es5.js";
const oauth = new Oauth({
  response_type: "code",
  client_id: "d8499dc0-8b63-11ea-86e9-b310e145d51d",
  redirect_url: "http://127.0.0.1:5501/example/callback.html",
  client_secret: "PXoN0H3SMQmJAchqDUz4lb2bYcAQ5CdUwPU05BEi"
});
let btnlogin = document.getElementById("login");
btnlogin.addEventListener("click", () => {
  oauth.login().then(res => {
    console.log("res", res);
  });
});

document.getElementById("profile").addEventListener("click", () => {
  oauth.auth.profile().then(res => {
    console.log("profile", res);
  });
});
