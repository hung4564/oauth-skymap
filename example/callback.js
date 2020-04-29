import Oauth from "/dist/oauth-skymap.es5.js";
const oauth = new Oauth("http://localhost:8000", {
  response_type: "code",
  client_id: "1fb735c0-888a-11ea-bf1c-496f7d9c7028",
  redirect_url: "http://127.0.0.1:5501/example/callback.html"
});
oauth.callback();
