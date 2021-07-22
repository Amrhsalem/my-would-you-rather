import React, { Component } from "react";
import { connect } from "react-redux";
import { handleReturnAnswer } from "../actions/questions";

class UnansweredQuestion extends Component {
  handleSubmit = (e, answer) => {
    e.preventDefault();
    const { id, dispatch } = this.props;

    dispatch(handleReturnAnswer(id, answer));
  };
  render() {
    const { id, questions, users } = this.props;
    const question = questions[id];

    return (
      <div>
        <img
          src={users[question.author].avatarURL}
          alt="question author avatar"
          className="avatar"
        />
        <span>{users[question.author].name} asked: would you rather...</span>
        <br />
        <button onClick={(e) => this.handleSubmit(e, "optionOne")}>
          {question.optionOne.text}
        </button>
        <br /> 
        <button onClick={(e) => this.handleSubmit(e, "optionTwo")}>
          {question.optionTwo.text}
        </button>
        <br />
        <hr />
      </div>
    );
  }
}
function mapStateToProps({ questions, users, authedUser }) {
  return { questions, users, authedUser };
}

export default connect(mapStateToProps)(UnansweredQuestion);
