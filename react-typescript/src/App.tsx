import './App.scss';
import React, {useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from "./components/Header";
import Gallery from "./components/Gallery";

function App() {

  return (
      <Router>
        <div className="app">
          <div className="app__header">
            <Header/>
          </div>
          <div className="app__content">
            <Switch>
              <Route path="/about">
                <About/>
              </Route>
              <Route path="/users">
                <Users/>
              </Route>
              <Route path="/">
                <Gallery/>
              </Route>
            </Switch>
          </div>
          <div className="app__footer">
            {/*<app-footer></app-footer>*/}
          </div>
        </div>
      </Router>
  );
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

export default App;
