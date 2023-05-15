import React from "react";
import Grid from "@mui/material/Grid";
import "./Home.css";
import { Search } from "../../Components/Search";
import { GroupList } from "../../Components/GroupList";
import { FriendRequest } from "../../Components/FriendRequest";
import { Friends } from "../../Components/Friends";
import MyGroup from "../../Components/MyGroup";
import UserList from "../../Components/UserList";
import BlockUser from "../../Components/BlockUser";

export const Home = () => {
  return (
    <div>
      <Grid container className="home-pages">
        <Grid item xs={4} className="home-item">
          <GroupList />
          <FriendRequest />
        </Grid>
        <Grid item xs={4} className="home-item">
          <Friends />
          <MyGroup />
        </Grid>
        <Grid item xs={4} className="home-item">
          <UserList />
          <BlockUser />
        </Grid>
      </Grid>
    </div>
  );
};
