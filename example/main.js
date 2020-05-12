import Oauth from "/dist/oauth-skymap.es5.js";
const oauth = new Oauth(
  {
    response_type: "code",
    client_id: "238e7b70-92d5-11ea-9632-c9f257edcfba",
    redirect_url: "http://127.0.0.1:5501/example/callback.html",
    code_challenge_method: "S256"
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
