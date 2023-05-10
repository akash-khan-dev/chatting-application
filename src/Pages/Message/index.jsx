import React from "react";
import "./style.css";
import Grid from "@mui/material/Grid";
import { Search } from "../../Components/Search";
import MessageGroups from "../../Components/MessageGroups";

export const Message = () => {
  return (
    <>
      <div>
        <Grid container>
          <Grid item xs={4} className="message-item">
            <Search />
            <MessageGroups />
          </Grid>
          <Grid item xs={8} className="message-item">
            <h1>hello</h1>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
