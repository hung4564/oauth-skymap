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
