import Oauth from "../dist/oauth-skymap.es5.js";
const oauth = new Oauth(
  {
    response_type: "code",
    client_id: "c61052b0-4b3e-11eb-949d-03e661b7ce51",
    client_secret: "7NM9nOiAuqXI4B1EUs7b3eqt2GowSyKr8WVcni4D",
    redirect_url: "http://127.0.0.1:5500/example/callback.html"
  },
  {
    providerUrl: "http://localhost:8002"
  }
);
console.log("🚀 ~ oauth", oauth);
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
