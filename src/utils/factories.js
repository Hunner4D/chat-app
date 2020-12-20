const { v4 } = require("uuid");

const createUser = (name = "") => ({
  id: v4(),
  name,
});

const createMessage = (message = "", sender = "") => ({
  id: v4(),
  time: getTime(new Date(Date.now())),
  message,
  sender,
});

const createChat = (messages = [], name = "Community", users = []) => ({
  id: v4(),
  name,
  messages,
  users,
  typingUsers: [],
});

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

const getTime = (date) => {
  return `${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`;
};

module.exports = {
  createMessage,
  createChat,
  createUser,
  addUser,
  removeUser,
  isUser,
  getTime,
};
