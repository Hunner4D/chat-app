import React from "react";
import { FaVideo, FaUserPlus, FaEllipsisH } from "react-icons/fa";

const ChatHeading = ({ name, numberOfUsers }) => {
  return (
    <div className="chat-header">
      <div className="user-name">{name}</div>
      <div className="status">
        <div className="indicator"></div>
        <span>{numberOfUsers ? numberOfUsers : null}</span>
      </div>
      <div className="options">
        <FaVideo />
        <FaUserPlus />
        <FaEllipsisH />
      </div>
    </div>
  );
};

export default ChatHeading;
