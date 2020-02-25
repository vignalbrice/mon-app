import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import About from "../Pages/About";
import App from "../App";
import Error404 from'../Pages/Error404';
import history from "../history";
import Feed from "../Pages/Users/Feed";
import Dashboard from "../Pages/Users/Dashboard";
import Profil from "../Pages/Users/Profil";
import Favoris from "../Pages/Users/Favoris";
import DetailFilms from "../Pages/Users/DetailFilms";
import Store from '../Redux/store/configureStore'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'
import { Provider } from 'react-redux'
import NavbarMenu from "../Components/Navbar/NavbarMenu";
import ModifyProfil from "../Pages/Users/Modify";

export default class Routes extends Component {
  render(){
    let persistor = persistStore(Store);
            return (
              <Router history={history}>
                <Provider store={Store}>
                  <PersistGate persistor={persistor}>
                    <div>
                    <Switch>
                          <Route path='/Header' component={NavbarMenu} />
                          <Route exact path="/" component={App} />
                          <Route path="/Feed" component={Feed} />
                          <Route path="/About" component={About} />
                          <Route path="/Detail/:id" component={DetailFilms} />
                          <Route path="/Dashboard" component={Dashboard} />
                          <Route path="/Modify" component={ModifyProfil} />
                          <Route component={Error404} />
                      </Switch>
                    </div>
                  </PersistGate>
                </Provider>
              </Router>
            );
          }
}
