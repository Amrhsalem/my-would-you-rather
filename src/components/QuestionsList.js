import { Component } from "react";
import { connect } from "react-redux";
import QuestionPreview from "./QuestionPreview";

class QuestionsList extends Component {
  state = { tab: "unanswered" };
  changeTab = (e) => {
    this.setState(() => ({ tab: e.target.value }));
  };
  render() {
    const { unansweredIdList, answeredIdList } = this.props;
    return (
      <div>
        <div className="tab">
          <button value="unanswered" onClick={this.changeTab}>
            Unanswered
          </button>
          <button value="answered" onClick={this.changeTab}>
            Answered
          </button>
        </div>
        <div>
          {this.state.tab === "unanswered"
            ? unansweredIdList.map((id) => <QuestionPreview id={id} key={id} />)
            : answeredIdList.map((id) => <QuestionPreview id={id} key={id} />)}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }) {
  const answeredIdList = Object.keys(users[authedUser].answers).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  );
  const unansweredIdList = Object.keys(questions)
    .filter((q) => {
      return !answeredIdList.includes(q);
    })
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

  return { answeredIdList, unansweredIdList };
}

export default connect(mapStateToProps)(QuestionsList);
