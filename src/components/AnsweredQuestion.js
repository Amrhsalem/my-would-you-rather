import React, { Component } from "react";
import { connect } from "react-redux";

class AnsweredQuestion extends Component {
  render() {
    const {
      id,
      questions,
      users,
      optionOneLength,
      optionTwoLength,
      authedUserVote,
    } = this.props;
    const question = questions[id];
    const total = optionOneLength + optionTwoLength;
    return (
      <div>
        <img
          src={users[question.author].avatarURL}
          alt="question author avatar"
          className="avatar"
        />
        <div>{users[question.author].name} asked: would you rather.... </div>
        {authedUserVote === "optionOne"
          ? `My Vote: ${question.optionOne.text}`
          : question.optionOne.text}
        <br />
        <progress id="optionOne" value={optionOneLength} max={total} />{" "}
        <span>
          {(optionOneLength / total) * 100}%({optionOneLength}Votes)
        </span>
        <hr />
        {authedUserVote === "optionTwo"
          ? `My Vote: ${question.optionTwo.text}`
          : question.optionTwo.text}
        <br />
        <progress id="optionTwo" value={optionTwoLength} max={total} />
        <span>
          {(optionTwoLength / total) * 100}% ({optionTwoLength}Votes)
        </span>
        <br />
      </div>
    );
  }
}
function mapStateToProps({ questions, users, authedUser }, props) {
  const { id } = props;
  const optionOne = questions[id].optionOne.votes;
  const optionTwo = questions[id].optionTwo.votes;
  let authedUserVote = null;
  if (optionOne.includes(authedUser)) {
    authedUserVote = "optionOne";
  } else {
    authedUserVote = "optionTwo";
  }
  const optionOneLength = optionOne.length;
  const optionTwoLength = optionTwo.length;

  return {
    questions,
    users,
    authedUser,
    optionOneLength,
    optionTwoLength,
    authedUserVote,
  };
}

export default connect(mapStateToProps)(AnsweredQuestion);
