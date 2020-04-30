import Oauth from "/dist/oauth-skymap.es5.js";
const oauth = new Oauth({
  response_type: "code",
  client_id: "1fb735c0-888a-11ea-bf1c-496f7d9c7028",
  redirect_url: "http://127.0.0.1:5501/example/callback.html",
  client_secret: "08zCcws8NlduvmB31GlNys2sEE7UX5Ga9H0enTXE"
});
oauth.callback().then(res => {
  console.log("res", res);
});
