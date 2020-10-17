import React, { Component } from "react";
import { VERIFY_USER } from "../utils/events";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nickname: "",
      error: "",
    };
  }

  handleChange = (e) => {
    this.setState({ nickname: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { socket } = this.props;
    const { nickname } = this.state;
    socket.emit(VERIFY_USER, nickname, this.verifyName);
  };

  verifyName = ({ user, isUser }) => {
    if (isUser) {
      this.setState("Username is already taken");
    } else {
      this.props.setUser(user);
    }
  };

  render() {
    const { nickname, error } = this.state;
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit} className="login-form">
          <label htmlFor="nickname">
            <h2>Got a nickname?</h2>
          </label>
          <input
            ref={(input) => {
              this.textInput = input;
            }}
            type="text"
            id="nickname"
            value={nickname}
            onChange={this.handleChange}
            placeholder={"my cool username"}
          />
          <div className="error">{error ? error : null}</div>
        </form>
      </div>
    );
  }
}
