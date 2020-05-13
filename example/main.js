import Oauth from "./oauth-skymap.js";
const oauth = new Oauth(
  {
    response_type: "code",
    client_id: "71efe6f0-9407-11ea-872a-3b2a3bbfb478",
    redirect_url: "http://127.0.0.1:5501/example/callback.html",
    code_challenge_method: "plain"
  },
  {
    providerUrl: "http://oauth2.howizbiz.com"
  }
);
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
