import React from "react";
import "./App.css";
import Nav from "./components/nav";
import Login from "./components/login";
import Register from "./components/register";
import newevent from "./components/newevent";
import Users from "./components/usersList";
import Category from "./components/category";
import eventList from "./components/eventList";
import oneEvent from "./components/oneEvent";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ButterToast, { POS_RIGHT, POS_TOP } from "butter-toast";

class App extends React.Component {
  render() {
    if (localStorage.getItem("userEmail")) {
      if (localStorage.getItem("userType") === "admin") {
        return (
          
          <Router>
            <div className="App">
              <Nav />
              <Switch>
                <Route path="/usersList" component={Users}></Route>
                <Route path="/category" component={Category}></Route>
                <Route path="/newevent" component={newevent}></Route>
                <Route path="/eventList" component={eventList}></Route>
                <Route path="/viewnewEvent" component={oneEvent}></Route>
                <Route path="/" component={eventList}></Route>
              </Switch>
              <ButterToast
                position={{ vertical: POS_TOP, horizontal: POS_RIGHT }}
              />
            </div>
          </Router>
        );
      }  else {
        return (
          <Router>
            <div className="App">
              <Nav />
              <Switch>
                <Route path="/eventList" component={eventList}></Route>
                <Route path="/viewnewEvent" component={oneEvent}></Route>
                <Route path="/" component={eventList}></Route>
              </Switch>
              <ButterToast
                position={{ vertical: POS_TOP, horizontal: POS_RIGHT }}
              />
            </div>
          </Router>
        );
      }
    } else {
      return (
        <Router>
          <div className="App">
            <Nav />
            <Switch>
              <Route path="/login" component={Login}></Route>
              <Route path="/register" component={Register}></Route>
              <Route path="/eventList" component={eventList}></Route>
              <Route path="/viewnewEvent" component={oneEvent}></Route>
              <Route path="/" component={eventList}></Route>
            </Switch>
            <ButterToast
              position={{ vertical: POS_TOP, horizontal: POS_RIGHT }}
            />
          </div>
        </Router>
      );
    }
  }
}

export default App;
