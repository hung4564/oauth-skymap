import Oauth from "/dist/oauth-skymap.es5.js";
const oauth = new Oauth("http://localhost:8000", {
  response_type: "code",
  client_id: 6,
  redirect_url: "http://127.0.0.1:5501/example/callback.html",
  scope: "read"
});
oauth.login().then(res=>{
console.log("res", res)

})
