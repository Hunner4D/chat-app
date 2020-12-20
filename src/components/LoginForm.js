import React, { Component } from "react";
import { VERIFY_USER } from "../utils/events";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nameInput: "",
      error: "",
    };
  }

  handleChange = (e) => {
    this.setState({ nameInput: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { socket } = this.props;
    const { nameInput } = this.state;
    socket.emit(VERIFY_USER, nameInput, this.verifyName);
  };

  verifyName = ({ user, isUser }) => {
    if (isUser) {
      this.setError("Username is already taken");
    } else {
      this.setError("")
      this.props.setUser(user);
    }
  };

  setError = (error) => {
    this.setState({error})
  }

  render() {
    const { nameInput, error } = this.state;
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit} className="login-form">
          <label htmlFor="nameInput">
            <h2>Got a nickname?</h2>
          </label>
          <input
            ref={(input) => {
              this.textInput = input;
            }}
            type="text"
            id="nameInput"
            value={nameInput}
            onChange={this.handleChange}
            placeholder={"my cool username"}
          />
          <div className="error">{error ? error : null}</div>
        </form>
      </div>
    );
  }
}
