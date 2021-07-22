import { Component } from "react";
import { connect } from "react-redux";

class LeaderBoard extends Component {
  render() {
    const { usersList, users, questions } = this.props;
    let usersScore = {};
    // usersList.sort(
    //   (a, b) =>
    //     Object.keys(users[b].answers).length +
    //     users[b].questions.length -
    //     (Object.keys(users[a].answers).length + users[a].questions.length)
    // );
    const userContribution = usersList.map((user) => {
      usersScore[user] =
        Object.keys(users[user].answers).length + users[user].questions.length;
    });
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

function mapStateToProps({ questions, users }) {
  const usersList = Object.keys(users);
  return { usersList, users, questions };
}
export default connect(mapStateToProps)(LeaderBoard);
