const useLoadClient = () => {
  gapi.client.setApiKey("AIzaSyAjqsvkOKS6QhtTNR23M3QBPYf3ww4SdBQ");
  return gapi.client
    .load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
    .then(
      () => {
        console.log("GAPI client loaded for API");
      },
      (err) => {
        console.error("Error loading GAPI client for API", err);
      }
    );
};

export default useLoadClient;
