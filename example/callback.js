import Oauth from "./oauth-skymap.js";
const oauth = new Oauth(
  {
    response_type: "code",
    client_id: "85485010-bc6e-11ea-b2bf-b346384034e6",
    redirect_url: "http://127.0.0.1:5500/example/callback.html",
    code_challenge_method: "plain"
  },
  {
    providerUrl: "http://localhost:8000"
  }
);
let textDiv = document.getElementById("text-show");
textDiv.innerText = "Lay token...";
oauth.callback().then(res => {
  textDiv.innerText = "Lay token xong.";
  console.log("res", res);

  let x = document.getElementById("profile");
  x.style.display = "block";
  x = document.getElementById("logout");
  x.style.display = "block";
});

document.getElementById("profile").addEventListener("click", () => {
  oauth.auth.profile().then(person => {
    document.getElementById("profile-show").innerHTML = JSON.stringify(person, null, 4);
  });
});

document.getElementById("logout").addEventListener("click", () => {
  oauth.auth.logOut().then(res => {
    console.log("logOut", res);
    textDiv.innerText = "Dang xuat thanh cong.";
  });
});
