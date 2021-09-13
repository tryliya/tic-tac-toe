import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Header, Game, GameWithComputer, Login } from "../components";
import './style.css';



const Navigator = () => {
  return (
    <Router>
      <div className="wrap">
        <Header/>        
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/game">
            <Game />
          </Route> 
          <Route path="/withComputer">
            <GameWithComputer />
          </Route>       
        </Switch>
      </div>
    </Router>
  )
}
export default Navigator;
