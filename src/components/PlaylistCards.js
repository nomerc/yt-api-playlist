import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  ListSubheader,
  IconButton,
} from "@material-ui/core";
import SlideshowIcon from "@material-ui/icons/Slideshow";

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
            />
            <GridListTileBar
              title={playlist.snippet.title}
              subtitle={<span>{playlist.snippet.title}</span>}
              actionIcon={
                <IconButton
                  aria-label={`info about ${playlist.snippet.title}`}
                  className={classes.icon}
                  onClick={() => {
                    executeQuery({
                      playlistId: playlist.id,
                    });
                    setShowPlaylists(false);
                  }}
                >
                  <SlideshowIcon />
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
