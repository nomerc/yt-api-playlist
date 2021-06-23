import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  ListSubheader,
  IconButton,
} from "@material-ui/core";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import JSONToTxtConvertor from "../utils/JsonToTxtConverter";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "500px",
    height: "50%",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

/*const exportTracks = (playlistId, pageToken, data = []) => {
  //same as asyncExportTracks but using Promises 
  let settings = {
    part: ["snippet"],
    playlistId: playlistId,
    maxResults: "50",
  };

  if (pageToken) settings = { ...settings, pageToken };

  gapi.client.youtube.playlistItems.list(settings).then(
    (response) => {
      let next = response.result.nextPageToken;
      data.push(
        ...response.result.items.map((item) => ({
          TITLE: item.snippet.title,
        }))
      );

      if (next) {
        exportTracks(playlistId, next, data);
      } else {
        JSONToCSVConvertor(JSON.stringify(data), "Tracks", true);
      }
    },
    (err) => {
      console.error("Execute error", err);
    }
  );
};
 */

const asyncExportTracks = async (playlistId) => {
  let next;
  let data = [];
  let settings = {
    part: ["snippet"],
    playlistId: playlistId,
    maxResults: "50",
  };

  do {
    const res = await gapi.client.youtube.playlistItems.list(settings);
    next = res.result.nextPageToken;
    data.push(
      ...res.result.items.map((item) => ({
        TITLE: item.snippet.title,
      }))
    );
    settings = { ...settings, pageToken: next };
  } while (next);
  JSONToTxtConvertor(JSON.stringify(data), "Tracks", true);
};

const PlaylistCards = ({ playlists, executeQuery, setShowPlaylists }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
          <ListSubheader component="div">Playlists</ListSubheader>
        </GridListTile>
        {playlists.map((playlist) => (
          <GridListTile key={playlist.id}>
            <img
              src={playlist.snippet.thumbnails.high.url}
              alt={playlist.snippet.title}
              onClick={() => {
                executeQuery({
                  playlistId: playlist.id,
                });
                setShowPlaylists(false);
              }}
            />
            <GridListTileBar
              title={playlist.snippet.title}
              subtitle={<span>{playlist.snippet.title}</span>}
              actionIcon={
                <IconButton
                  aria-label={`info about ${playlist.snippet.title}`}
                  className={classes.icon}
                  onClick={() => {
                    // exportTracks(playlist.id);
                    asyncExportTracks(playlist.id);
                  }}
                >
                  <SaveAltIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default PlaylistCards;
