import { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import QuestionPreview from "./QuestionPreview";

class QuestionsList extends Component {
  state = { tab: "unanswered" };
  changeTab = (e) => {
    this.setState(() => ({ tab: e.target.value }));
  };
  render() {
    const { unansweredIdList, answeredIdList, authedUser } = this.props;
    return (
      <div>
        {authedUser !== null ? (
          <div>
            <div className="tab">
              <button
                value="unanswered"
                className={
                  this.state.tab === "unanswered" ? "selected" : "unselected"
                }
                onClick={this.changeTab}
              >
                Unanswered
              </button>
              <button
                value="answered"
                className={
                  this.state.tab === "answered" ? "selected" : "unselected"
                }
                onClick={this.changeTab}
              >
                Answered
              </button>
            </div>
            <div>
              {this.state.tab === "unanswered"
                ? unansweredIdList.map((id) => (
                    <QuestionPreview id={id} key={id} />
                  ))
                : answeredIdList.map((id) => (
                    <QuestionPreview id={id} key={id} />
                  ))}
            </div>
          </div>
        ) : (
          <Redirect
            to={{ pathname: "/", state: { from: this.props.location } }}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }) {
  if (authedUser !== null) {
    const answeredIdList = Object.keys(users[authedUser].answers).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    );
    const unansweredIdList = Object.keys(questions)
      .filter((q) => {
        return !answeredIdList.includes(q);
      })
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

    return { answeredIdList, unansweredIdList, authedUser };
  }
  return { authedUser };
}

export default connect(mapStateToProps)(QuestionsList);
