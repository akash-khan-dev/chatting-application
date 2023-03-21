import React from "react";
import Grid from "@mui/material/Grid";

import { Outlet } from "react-router-dom";
import { Sidebar } from "../Components/Sidebar/Sidebar";

export const Layout = () => {
  return (
    <div>
      <Grid container>
        <Grid item xs={1}>
          <Sidebar />
        </Grid>
        <Grid item xs={11}>
          <Outlet />
        </Grid>
      </Grid>
    </div>
  );
};
