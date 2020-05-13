import Oauth from "./oauth-skymap.js";
const oauth = new Oauth();
oauth.callback().then(res => {
  console.log("res", res);
});

document.getElementById("profile").addEventListener("click", () => {
  oauth.auth.profile().then(res => {
    console.log("profile", res);
  });
});
