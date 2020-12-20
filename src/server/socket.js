const io = require("./index.js").io;
const {
  createUser,
  createMessage,
  createChat,
  addUser,
  removeUser,
  isUser,
} = require("../utils/factories");
const {
  VERIFY_USER,
  USER_CONNECTED,
  LOGOUT,
  COMMUNITY_CHAT,
  MESSAGE_RECIEVED,
  MESSAGE_SENT,
} = require("../utils/events");

let connectedUsers = {};
let communityChat = createChat();
let sendMessageToChatFromUser;

module.exports = function (socket) {
  console.log("socket id: " + socket.id);

  //Verify Username
  socket.on(VERIFY_USER, (namePassed, callback) => {
    console.log("recieved on verifiyuser:", namePassed);
    if (isUser(connectedUsers, namePassed)) {
      callback({ isUser: true, user: null });
    } else {
      callback({ isUser: false, user: createUser(namePassed) });
    }
  });

  //User Connects with username
  socket.on(USER_CONNECTED, (user) => {
    connectedUsers = addUser(connectedUsers, user);
    socket.user = user;

    sendMessageToChatFromUser = sendMessageToChat(user.name);

    io.emit(USER_CONNECTED, connectedUsers);
    console.log("Connected Users: ", connectedUsers);
  });

  //User Logouts
  socket.on(LOGOUT, () => {
    connectedUsers = removeUser(connectedUsers, socket.user.name);
    console.log("User logged out... Remaining users: ", connectedUsers);
  });

  //User disconnects
  socket.on("disconnect", () => {
    if ("user" in socket) {
      connectedUsers = removeUser(connectedUsers, socket.user.name);
      console.log("Users after disconnection", connectedUsers);
    }
  });

  //Get Community Chat
  socket.on(COMMUNITY_CHAT, (callback) => {
    callback(communityChat);
  });

  //On Chat Message Sent
  socket.on(MESSAGE_SENT, ({ chatId, message }) => {
    sendMessageToChatFromUser(chatId, message);
  });
};

//Send Message to Chat
function sendMessageToChat(sender) {
  return (chatId, message) => {
    io.emit(
      `${MESSAGE_RECIEVED}-${chatId}`,
      createMessage( message, sender )
    );
  };
}
