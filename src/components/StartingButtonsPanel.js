//AUTHORIZE AND LOAD PLAYLISTS BUTTONS
import React from "react";
import { Button, Grid } from "@material-ui/core";
import useAuthenticate from "../hooks/useAuthenticate";
import useLoadClient from "../hooks/useLoadClient";
import useLoadPlaylists from "../hooks/useLoadPlaylists";

const StartingButtonsPanel = ({
  setPlaylists,
  auth,
  setAuth,
  setShowPlaylists,
}) => {
  function authenticateAndLoadClient() {
    useAuthenticate().then(useLoadClient()).then(setAuth(true));
    setShowPlaylists(true);
  }
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Button
        size="large"
        variant="contained"
        color="primary"
        onClick={authenticateAndLoadClient}
      >
        authorize
      </Button>
      <Button
        size="large"
        variant="contained"
        color="secondary"
        disabled={!auth}
        onClick={() => useLoadPlaylists(setPlaylists)}
      >
        Load Playlists
      </Button>
      {/* <Button
        size="large"
        variant="contained"
        color="secondary"
        onClick={executeQuery}
      >
        Load Items
      </Button> */}
    </Grid>
  );
};
export default StartingButtonsPanel;
