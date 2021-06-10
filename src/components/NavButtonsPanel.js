//PREV AND NEXT BUTTONS
import React from "react";
import { Button, Grid } from "@material-ui/core";

const NavButtonsPanel = ({ executeQuery, prev, next }) => {
  return (
    <div style={{ padding: "10px" }}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Button
          size="large"
          variant="contained"
          color="secondary"
          disabled={!prev}
          onClick={() => executeQuery({pageToken : prev})}
        >
          Prev
        </Button>
        <Button
          size="large"
          variant="contained"
          color="primary"
          disabled={!next}
          onClick={() => executeQuery({pageToken : next})}
        >
          Next
        </Button>
      </Grid>
    </div>
  );
};
export default NavButtonsPanel;
