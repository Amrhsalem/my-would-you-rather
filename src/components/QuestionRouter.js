import React, { Component } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import UnansweredQuestion from "./UnansweredQuestion";

import AnsweredQuestion from "./AnsweredQuestion";

class QuestionRouter extends Component {
  render() {
    // const { id } = this.props.match.params;
    const { answeredIdList, id, authedUser, unansweredIdList } = this.props;
    return (
      <div>
        {authedUser !== null ? (
          answeredIdList.includes(id) ? (
            <AnsweredQuestion id={id} />
          ) : unansweredIdList.includes(id) ? (
            <UnansweredQuestion id={id} />
          ) : (
            <Redirect to="/404" />
          )
        ) : (
          <Redirect
            to={{ pathname: "/", state: { from: this.props.location } }}
          />
        )}
      </div>
    );
  }
}
function mapStateToProps({ questions, users, authedUser }, props) {
  if (authedUser !== null) {
    const { id } = props.match.params;
    const answeredIdList = Object.keys(users[authedUser].answers);
    const unansweredIdList = Object.keys(questions).filter((q) => {
      return !answeredIdList.includes(q);
    });
    return {
      id,
      answeredIdList,
      authedUser,
      unansweredIdList,
    };
  }
  return { authedUser };
}
export default connect(mapStateToProps)(QuestionRouter);
