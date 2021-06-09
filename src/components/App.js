import React, { useState, useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import SongCard from "./SongCard.js";
import "../css/index.css";

const App = () => {
  const [results, setResults] = useState([]);
  const [nextPageToken, setNextPageToken] = useState();
  const [prevPageToken, setPrevPageToken] = useState();

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
  function execute(pageToken) {
    let settings = {
      part: ["snippet"],
      playlistId: "FLuQwGIEUhSmyO7LXQ-_ojwA",
      maxResults: "50",
    };
    if (pageToken) settings = { ...settings, pageToken };

    return gapi.client.youtube.playlistItems.list(settings).then(
      function (response) {
        // Handle the results here (response.result has the parsed body).
        setNextPageToken(response.result.nextPageToken);
        setPrevPageToken(response.result.prevPageToken);
        setResults(response.result.items);

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

  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
        {results &&
          results.map((item) => (
            <SongCard
              key={item.id}
              imgUrl={item.snippet.thumbnails.high.url}
              title={item.snippet.title}
              description={item.snippet.title}
            />
          ))}
      </Grid>
      <Grid container direction="row" justify="center" alignItems="center">
        {prevPageToken && (
          <Button
            size="large"
            variant="contained"
            color="secondary"
            onClick={() => execute(prevPageToken)}
          >
            Prev
          </Button>
        )}
        {nextPageToken && (
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={() => execute(nextPageToken)}
          >
            Next
          </Button>
        )}
      </Grid>

      {results.length == 0 && (
        <Grid container direction="row" justify="center" alignItems="center">
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={authenticateAndLoadClient}
          >
            authorize and load
          </Button>
          <Button
            size="large"
            variant="contained"
            color="secondary"
            onClick={() => execute()}
          >
            execute
          </Button>
        </Grid>
      )}
    </div>
  );
};

export default App;
