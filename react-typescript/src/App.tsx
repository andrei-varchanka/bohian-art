import './App.scss';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from "./components/header/Header";
import Gallery from "./components/gallery/Gallery";
import Footer from "./components/shared/Footer";
import Registration from "./components/registration/Registration";
import User from "./components/user/User";
import Contacts from "./components/contacts/Contacts";
import Painting from "./components/painting/Painting";
import PaintingEditor from "./components/painting-editor/PaintingEditor";

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
                <Route path="/gallery/:id" component={Painting}/>
                <Route path="/gallery" component={Gallery}/>
                <Route path="/painting-editor/:id" component={PaintingEditor}/>
                <Route path="/painting-editor/" component={PaintingEditor}/>
                <Route path="/contacts" component={Contacts}/>
                <Route path="/user/:id" component={User}/>
                <Route path="/registration" component={Registration}/>
                <Route path="/" component={Gallery}/>
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

export default App;
