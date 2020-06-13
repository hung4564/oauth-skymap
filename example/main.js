import Oauth from "./oauth-skymap.js";
const oauth = new Oauth(
  {
    response_type: "code",
    client_id: "897ea160-9dc0-11ea-915b-c7a3cabfc460",
    redirect_url: "http://127.0.0.1:5645/example/callback.html",
    code_challenge_method: "plain"
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
