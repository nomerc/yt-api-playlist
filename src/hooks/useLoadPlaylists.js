const useLoadPlaylists = (setPlaylists) => {
  let settings = {
    part: ["snippet"],
    maxResults: 25,
    mine: true,
  };

  return gapi.client.youtube.playlists.list(settings).then(
    (response) => {
      // Handle the results here (response.result has the parsed body).
      setPlaylists(response.result.items);
      console.log("Playlists", response.result.items);
    },
    (err) => {
      console.error("Execute error", err);
    }
  );
};

export default useLoadPlaylists;
