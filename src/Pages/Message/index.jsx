import React from "react";
import "./style.css";
import Grid from "@mui/material/Grid";
import { Search } from "../../Components/Search";
import MessageGroups from "../../Components/MessageGroups";
import { Friends } from "../../Components/Friends";
import { Chatting } from "../../Components/Chatting";

export const Message = () => {
  return (
    <>
      <div>
        <Grid container>
          <Grid item xs={4} className="message-item">
            <Search />
            <MessageGroups />
            <Friends />
          </Grid>
          <Grid item xs={7} className="message-item">
            <Chatting />
          </Grid>
        </Grid>
      </div>
    </>
  );
};
