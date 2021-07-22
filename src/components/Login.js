import { Component } from "react";
import { connect } from "react-redux";

import { setAuthedUser } from "../actions/authedUser";

class Login extends Component {
  handleLogin = (id) => {
    this.props.dispatch(setAuthedUser(id)); // sets authedUser to  chosen user
    this.props.history.push("/questions"); //redirects to /questions after authed user is set
  };
  render() {
    const { users, usersIdList } = this.props;
    return (
      <div>
        <h3>Would you rather...</h3>
        <h4>Please Select User</h4>
        {usersIdList.map((userId) => {
          return (
            <button key={userId} onClick={() => this.handleLogin(userId)}>
              {users[userId].name}
            </button>
          );
        })}
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  const usersIdList = Object.keys(users);
  return { users, usersIdList };
}

export default connect(mapStateToProps)(Login);
