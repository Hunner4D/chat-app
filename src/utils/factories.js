const { v4 } = require("uuid");

const createUser = (name = "") => ({
  id: v4(),
  name,
});

const createMessage = (message = "", sender = "") => ({
  id: v4(),
  time: new Date(Date.now()),
  message,
  sender,
});

const createChat = (messages = [], name = "Community", users = []) => ({
  id: v4(),
  name,
  messages,
  users,
  typingUsers: []
});

const getTime = (date) => {
  return `${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`;
};

module.exports = {
  createMessage,
  createChat,
  createUser
}