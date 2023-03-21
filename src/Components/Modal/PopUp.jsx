import * as React from "react";
import "./PopUp.css";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { UploadProfile } from "../UploadProfile/UploadProfile";

export const PopUp = ({ open, setOpen }) => {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
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
          <Box className="box-modal">
            <UploadProfile setOpen={setOpen} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
