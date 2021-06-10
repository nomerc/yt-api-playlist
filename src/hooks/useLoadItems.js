import React, { useState } from "react";

const useLoadItems = ({ pageToken, playlistId } = {}) => {

const [currentPlaylistId, setCurrentPlaylistId] = useState();

  let settings = {
    part: ["snippet"],
    playlistId: playlistId || currentPlaylistId, // "FLuQwGIEUhSmyO7LXQ-_ojwA",
    maxResults: "50",
  };

  if (playlistId) setCurrentPlaylistId(playlistId);

  if (pageToken) settings = { ...settings, pageToken };
  // if (playlistId) settings = { ...settings, playlistId };

  return gapi.client.youtube.playlistItems.list(settings).then(
    (response) => {
      setNextPageToken(response.result.nextPageToken);
      setPrevPageToken(response.result.prevPageToken);
      setResults(response.result.items);
    },
    (err) => {
      console.error("Execute error", err);
    }
  );
};

export default useLoadItems