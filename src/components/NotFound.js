import { Component } from "react";
import { Link } from "react-router-dom";

class NotFound extends Component {
  render() {
    return (
      <div>
        <h1>404</h1>
        <h3>The url you requested is not found.</h3>
        <Link to="/questions">Go Home</Link>
      </div>
    );
  }
}
export default NotFound;
