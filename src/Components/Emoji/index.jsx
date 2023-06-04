import React from "react";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import EmojiPicker from "emoji-picker-react";
import "./style.css";

const Emoji = ({ openEmoji, setOpenEmoji, handleEmojiSelect }) => {
  return (
    <>
      <div className="emoji">
        <SentimentSatisfiedAltIcon onClick={() => setOpenEmoji(!openEmoji)} />
        <div className="emoji-pickers">
          {openEmoji && <EmojiPicker onEmojiClick={handleEmojiSelect} />}
        </div>
      </div>
    </>
  );
};

export default Emoji;
