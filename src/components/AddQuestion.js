import { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { handleReturnQuestion } from "../actions/questions";

class AddQuestion extends Component {
  state = { optionOneText: "", optionTwoText: "" };
  handleChange = (e, option) => {
    e.preventDefault();

    this.setState(() => ({
      [option]: e.target.value,
    }));
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { optionOneText, optionTwoText } = this.state;
    const { dispatch } = this.props;
    // console.log(optionOneText, optionTwoText, this.props.authedUser);
    dispatch(handleReturnQuestion(optionOneText, optionTwoText));

    this.setState(() => ({ optionOneText: "", optionTwoText: "" }));
    this.props.history.push("/questions");
  };
  render() {
    const { users, authedUser } = this.props;
    const { optionOneText, optionTwoText } = this.state;

    return (
      <div>
        {" "}
        {authedUser !== null ? (
          <div className="addQuestion">
            <img
              src={users[authedUser].avatarURL}
              alt="question author avatar"
              className="avatar"
            />
            <span>
              Hey {users[authedUser].name}. Add your very own "would you
              rather... below.
            </span>
            <form className="new-question" onSubmit={this.handleSubmit}>
              <textarea
                placeholder="Option One"
                value={optionOneText}
                onChange={(e) => this.handleChange(e, "optionOneText")}
                className="textarea"
              />
              <textarea
                placeholder="Option Two"
                value={optionTwoText}
                onChange={(e) => this.handleChange(e, "optionTwoText")}
                className="textarea"
              />
              <button
                className="btn"
                type="submit"
                disabled={optionOneText === "" || optionTwoText === ""}
              >
                submit
              </button>
            </form>
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

function mapStateToProps({ authedUser, users }) {
  return { authedUser, users };
}
export default connect(mapStateToProps)(AddQuestion);
