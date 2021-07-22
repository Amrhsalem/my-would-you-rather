import { Component } from "react";
import { connect } from "react-redux";

class LeaderBoard extends Component {
  render() {
    const { usersList, users } = this.props;
    let usersScore = {};

    usersList.map(
      (user) =>
        (usersScore[user] =
          Object.keys(users[user].answers).length +
          users[user].questions.length)
    );
    usersList.sort((a, b) => usersScore[b] - usersScore[a]);

    return (
      <div>
        <ul>
          {usersList.map((user) => (
            <li>
              <img
                src={users[user].avatarURL}
                alt="question author avatar"
                className="avatar"
              />
              <span>
                {users[user].name} Score: {usersScore[user]}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  const usersList = Object.keys(users);
  return { usersList, users };
}
export default connect(mapStateToProps)(LeaderBoard);
