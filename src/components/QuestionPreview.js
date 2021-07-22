import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class QuestionPreview extends Component {
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
        .....
        <Link to={`/questions/${id}`}>more..</Link>
        <hr />
      </div>
    );
  }
}
function mapStateToProps({ questions, users, authedUser }) {
  return { questions, users };
}

export default connect(mapStateToProps)(QuestionPreview);
