import { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

class NotFound extends Component {
  render() {
    const { authedUser } = this.props;
    return (
      <div>
        {authedUser !== null ? (
          <div>
            <h1>404</h1>
            <h3>The url you requested is not found.</h3>
            <Link to="/questions">Go Home</Link>
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
export default connect(({ authedUser }) => ({ authedUser }))(NotFound);
