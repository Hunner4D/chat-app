import React, { Component } from "react";
import io from "socket.io-client";
import { USER_CONNECTED, LOGOUT } from "../utils/events";
import LoginForm from "./LoginForm";

const socketUrl = "http://localhost:3231";
export default class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      socket: null,
    };
  }

  componentWillMount() {
    this.initSocket();
  }

  initSocket = () => {
    const socket = io(socketUrl);
    socket.on("connect", () => {
      console.log("connected");
    });
    this.setState({ socket });
  };

  setUser = (user) => {
    const { socket } = this.state;
    socket.emit(USER_CONNECTED);
    this.setState({ user });
  };

  logout = () => {
    const { socket } = this.state;
    socket.emit(LOGOUT);
    this.setState({ user: null });
  };

  render() {
    const { title } = this.props;
    const { socket } = this.state;
    return (
      <div className="container">
        <LoginForm socket={socket} setUser={this.setUser} />
      </div>
    );
  }
}
