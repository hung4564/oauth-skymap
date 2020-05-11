import Oauth from "/dist/oauth-skymap.es5.js";
const oauth = new Oauth();
oauth.callback().then(res => {
  console.log("res", res);
});

document.getElementById("profile").addEventListener("click", () => {
  oauth.auth.profile().then(res => {
    console.log("profile", res);
  });
});
