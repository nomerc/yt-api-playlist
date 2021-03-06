import React, { useState } from "react";
import { Button, Grid } from "@material-ui/core";
import StartingButtonsPanel from "./StartingButtonsPanel";
import NavButtonsPanel from "./NavButtonsPanel";
import SongCard from "./SongCard.js";
import PlaylistCards from "./PlaylistCards.js";

import "../css/index.css";
//https://www.npmjs.com/package/export-from-json
const App = () => {
  const [results, setResults] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [showPlaylists, setShowPlaylists] = useState(false);
  const [nextPageToken, setNextPageToken] = useState();
  const [currentPlaylistId, setCurrentPlaylistId] = useState();
  const [auth, setAuth] = useState(false);
  const [prevPageToken, setPrevPageToken] = useState();

  function executeQuery({ pageToken, playlistId, exportToExcel } = {}) {
    let settings = {
      part: ["snippet"],
      playlistId: playlistId || currentPlaylistId,
      maxResults: "50",
    };

    if (playlistId) setCurrentPlaylistId(playlistId);

    if (pageToken) settings = { ...settings, pageToken };

    return gapi.client.youtube.playlistItems.list(settings).then(
      (response) => {
        if (exportToExcel) {
          let data;
          data = response.result.items.map((item) => ({
            TITLE: item.snippet.title,
          }));

          JSONToCSVConvertor(JSON.stringify(data), "Tracks", true);
        } else {
          setNextPageToken(response.result.nextPageToken);
          setPrevPageToken(response.result.prevPageToken);
          setResults(response.result.items);
        }
      },
      (err) => {
        console.error("Execute error", err);
      }
    );
  }
  gapi.load("client:auth2", () => {
    gapi.auth2.init({
      client_id: "Client_ID",
    });
  });

  return (
    <div>
      {!playlists.length && (
        <StartingButtonsPanel
          setPlaylists={setPlaylists}
          auth={auth}
          setAuth={setAuth}
          setShowPlaylists={setShowPlaylists}
        />
      )}

      {results.length != 0 && (
        <NavButtonsPanel
          executeQuery={executeQuery}
          prev={prevPageToken}
          next={nextPageToken}
        />
      )}

      <Grid container direction="row" justify="center" alignItems="center">
        {showPlaylists && (
          <PlaylistCards
            playlists={playlists}
            executeQuery={executeQuery}
            setShowPlaylists={setShowPlaylists}
          />
        )}
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
    </div>
  );
};

export default App;
