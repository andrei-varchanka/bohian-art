import './App.scss';
import React, {useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from "./components/shared/Header";
import Gallery from "./components/gallery/Gallery";
import Footer from "./components/shared/Footer";

class App extends React.Component {

  render() {
    return (
        <Router>
          <div className="app">
            <div className="app__header">
              <Header/>
            </div>
            <div className="app__content">
              <Switch>
                <Route path="/gallery">
                  <Gallery/>
                </Route>
                <Route path="/contacts">
                  <Contacts/>
                </Route>
                <Route path="/">
                  <Gallery/>
                </Route>
              </Switch>
            </div>
            <div className="app__footer">
              <Footer/>
            </div>
          </div>
        </Router>
    );
  }
}

function Contacts() {
  return <h2>Contacts</h2>;
}

export default App;
