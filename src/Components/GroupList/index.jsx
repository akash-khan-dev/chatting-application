import React, { useState } from "react";
import "./style.css";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { getDatabase, push, ref, set } from "firebase/database";
import { useSelector } from "react-redux";

export const GroupList = () => {
  const db = getDatabase();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [groupName, setGroupName] = useState("");
  const [groupTag, setGroupTag] = useState("");
  const user = useSelector((user) => user.logIn.login);

  const handleGroupCreate = () => {
    set(push(ref(db, "Groups")), {
      groupname: groupName,
      groupTag: groupTag,
      adminname: user.displayName,
      adminid: user.uid,
    }).then(() => {
      setOpen(false);
    });
  };
  return (
    <>
      <div className="group-list">
        <div className="group-header">
          <h3>Groups List</h3>
          <Button onClick={handleOpen}>Create Group</Button>
        </div>
        <div className="group-item-container">
          <div className="group-item-wrapper">
            <div className="group-img">
              <img src="./images/akash.jpg" alt="man" />
            </div>
            <div className="group-name">
              <h5>Friends Forever</h5>
            </div>
            <div className="group-btn">
              <Button variant="contained">join</Button>
            </div>
          </div>
        </div>
        <div className="div">
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
          >
            <Fade in={open}>
              <Box className="modal-box">
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Create a New Group
                  <TextField
                    onChange={(e) => setGroupName(e.target.value)}
                    fullWidth
                    margin="normal"
                    id="filled-basic"
                    label="Group Name"
                    variant="filled"
                  />
                  <TextField
                    onChange={(e) => setGroupTag(e.target.value)}
                    fullWidth
                    margin="normal"
                    id="filled-basic"
                    label="Group Tagline"
                    variant="filled"
                  />
                  <Button
                    onClick={handleGroupCreate}
                    className="modal-btn"
                    variant="contained"
                  >
                    Create your group
                  </Button>
                </Typography>
              </Box>
            </Fade>
          </Modal>
        </div>
      </div>
    </>
  );
};
