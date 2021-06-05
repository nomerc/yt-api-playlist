import React from "react";
import "../css/index.css";

function authenticate() {
  return gapi.auth2
    .getAuthInstance()
    .signIn({ scope: "https://www.googleapis.com/auth/youtube.readonly" })
    .then(
      function () {
        console.log("Sign-in successful");
      },
      function (err) {
        console.error("Error signing in", err);
      }
    );
}
function loadClient() {
  gapi.client.setApiKey("AIzaSyAjqsvkOKS6QhtTNR23M3QBPYf3ww4SdBQ");
  return gapi.client
    .load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
    .then(
      function () {
        console.log("GAPI client loaded for API");
      },
      function (err) {
        console.error("Error loading GAPI client for API", err);
      }
    );
}
function authenticateAndLoadClient() {
    authenticate().then(loadClient());
}
// Make sure the client is loaded and sign-in is complete before calling this method.
function execute() {
  return gapi.client.youtube.playlistItems
    .list({
      part: ["snippet"],
      playlistId: "FLuQwGIEUhSmyO7LXQ-_ojwA",
    })
    .then(
      function (response) {
        // Handle the results here (response.result has the parsed body).
        console.log("Response", response);
      },
      function (err) {
        console.error("Execute error", err);
      }
    );
}
gapi.load("client:auth2", function () {
  gapi.auth2.init({
    client_id:
      "553688206979-k5bldbku3ll40rijvj44ldo1p4ggnh6l.apps.googleusercontent.com",
  });
});

const App = () => {
  return (
    <div>
      <h1>This is the app!</h1>;
      <button onClick={authenticateAndLoadClient}>
        authorize and load
      </button>
      <button onClick={execute}>execute</button>
    </div>
  );
};

export default App;
