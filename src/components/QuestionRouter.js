import React, { Component } from "react";

import { connect } from "react-redux";
import UnansweredQuestion from "./UnansweredQuestion";

import AnsweredQuestion from "./AnsweredQuestion";

class QuestionRouter extends Component {
  render() {
    // const { id } = this.props.match.params;
    const { answeredIdList, id } = this.props;
    return (
      <div>
        {answeredIdList.includes(id) ? (
          <AnsweredQuestion id={id} />
        ) : (
          <UnansweredQuestion id={id} />
        )}
      </div>
    );
  }
}
function mapStateToProps({ questions, users, authedUser }, props) {
  const { id } = props.match.params;
  const answeredIdList = Object.keys(users[authedUser].answers);
  //   const unansweredIdList = Object.keys(questions).filter((q) => {
  //     return !answeredIdList.includes(q);
  //   });
  return {
    id,
    answeredIdList,
    //  unansweredIdList
  };
}
export default connect(mapStateToProps)(QuestionRouter);
