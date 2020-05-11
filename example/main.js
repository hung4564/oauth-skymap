import Oauth from "/dist/oauth-skymap.es5.js";
const oauth = new Oauth(
  {
    response_type: "code",
    client_id: "5d820dc0-9371-11ea-b719-89db442dea83",
    redirect_url: "http://127.0.0.1:5501/example/callback.html"
  },
  {
    providerUrl: "http://localhost:8000"
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
