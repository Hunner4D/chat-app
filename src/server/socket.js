const io = require("./index.js").io;

const { VERIFY_USER, USER_CONNECTED, LOGOUT, COMMUNITY_CHAT } = require("../utils/events");
const { createUser, createMessage, createChat } = require("../utils/factories");

let connectedUsers = {};
let communityChat = createChat()

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
    io.emit(USER_CONNECTED, connectedUsers);
    console.log("Connected Users: ", connectedUsers);
  });

  //User disconnects

  //User Logouts

  //Get Community Chat
  socket.on(COMMUNITY_CHAT, (callback) => {
    callback(communityChat);
  });
};

function addUser(userList, user) {
  let newList = Object.assign({}, userList);
  newList[user.name] = user;
  return newList;
}

function removeUser(userList, username) {
  let newList = Object.assign({}, userList);
  delete newList[username];
  return newList;
}

function isUser(userList, username) {
  return username in userList;
}
