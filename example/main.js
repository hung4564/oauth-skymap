import Oauth from "/dist/oauth-skymap.es5.js";
const oauth = new Oauth("https://github.com/login", {
  response_type: "code",
  client_id: "236f20611786cfcb7883",
  redirect_url: "http://127.0.0.1:5501/callback"
});
let btnlogin = document.getElementById("login");
btnlogin.addEventListener("click", () => {
  oauth.login();
});
