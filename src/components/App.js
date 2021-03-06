import React, { Component } from "react";
import { connect } from "react-redux";
import { LoadingBar } from "react-redux-loading";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { handleInitialData } from "../actions/shared";
import LoggedUser from "./LoggedUser";
import Login from "./Login";
import Navigation from "./Navigation";
import QuestionRouter from "./QuestionRouter";
import QuestionsList from "./QuestionsList";
import AddQuestion from "./AddQuestion";
import NotFound from "./NotFound";
import LeaderBoard from "./LeaderBoard";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    const { authedUser } = this.props;
    console.log(this.props);
    return (
      <Router>
        <div className="App">
          <LoadingBar />
          <div>
            {authedUser !== null ? (
              <div className="topPanel">
                <Navigation />
                <LoggedUser />
              </div>
            ) : null}
            <Switch>
              <Route path="/questions" exact component={QuestionsList} />
              <Route path="/questions/:id" exact component={QuestionRouter} />
              <Route path="/add" exact component={AddQuestion} />
              <Route path="/leaderboard" exact component={LeaderBoard} />
              <Route path="/" exact component={Login} />
              <Route path="/404" exact component={NotFound} />
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}
export default connect(mapStateToProps)(App);
