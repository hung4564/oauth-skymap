import Oauth from "/dist/oauth-skymap.es5.js";
const oauth = new Oauth(
  {
    response_type: "code",
    client_id: "238e7b70-92d5-11ea-9632-c9f257edcfba",
    redirect_url: "http://127.0.0.1:5501/example/callback.html",
    client_secret: "NGDkBxmZUZM0GGh89zGCXqwM99IJ0igymazVmmv3"
  },
  {
    providerUrl: "http://oauth2.howizbiz.com/"
  }
);
oauth.callback().then(res => {
  console.log("res", res);
});

document.getElementById("profile").addEventListener("click", () => {
  oauth.auth.profile().then(res => {
    console.log("profile", res);
  });
});
