import { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class LeaderBoard extends Component {
  render() {
    const { usersList, users, authedUser } = this.props;
    let usersScore = {};
    usersList.map(
      (user) =>
        (usersScore[user] =
          Object.keys(users[user].answers).length +
          users[user].questions.length)
    );
    usersList.sort((a, b) => usersScore[b] - usersScore[a]);

    return (
      <div className="leaderboard">
        {" "}
        {authedUser !== null ? (
          <ul>
            {usersList.map((user) => (
              <li key={user}>
                <img
                  src={users[user].avatarURL}
                  alt="question author avatar"
                  className="avatar"
                />
                <br />
                <span>
                  {users[user].name} <br />
                  Questions asked: {users[user].questions.length} <br />
                  Questions answered:{Object.keys(users[user].answers).length}
                  <br />
                  Score: {usersScore[user]}
                </span>
                <hr />
              </li>
            ))}
          </ul>
        ) : (
          <Redirect
            to={{ pathname: "/", state: { from: this.props.location } }}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps({ users, authedUser }) {
  const usersList = Object.keys(users);
  return { usersList, users, authedUser };
}
export default connect(mapStateToProps)(LeaderBoard);
