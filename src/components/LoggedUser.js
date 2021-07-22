import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";

class LoggedUser extends Component {
  handleLogout = () => {
    this.props.dispatch(setAuthedUser(null)); // Logs out  by setting authed  user to null

    this.props.history.push("/"); //redirects to login screen
  };

  render() {
    const { authedUser, users } = this.props;
    return (
      <div className="loggedUser">
        <span> User: {users[authedUser].name}</span>
        <img
          src={users[authedUser].avatarURL}
          alt="logged in User avatar"
          className="userAvatar"
        />
        <button className="logout" onClick={this.handleLogout}>
          Logout
        </button>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users,
  };
}
export default withRouter(connect(mapStateToProps)(LoggedUser));
