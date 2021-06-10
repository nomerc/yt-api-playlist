const useAuthenticate = () => {
  return gapi.auth2
    .getAuthInstance()
    .signIn({ scope: "https://www.googleapis.com/auth/youtube.readonly" })
    .then(
      () => {
        console.log("Sign-in successful");
      },
      (err) => {
        console.error("Error signing in", err);
      }
    );
};

export default useAuthenticate;
