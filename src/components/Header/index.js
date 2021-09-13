import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { ACTION_TYPES} from "../../constants";
import './style.css';


const Header = () => {
  const dispatch = useDispatch();
  function changeGameType(gameType){
    const changeGameTypeAction = {
      type: ACTION_TYPES.CHANGE_GAME_TYPE,
      payload: gameType
    }
  
    dispatch(changeGameTypeAction);
  }
  return (
      <header className="header">
          <h1>Let`s play!</h1>
          <ul>
            <li>
              <Link className="link" onClick={() => changeGameType('withComputer')} to="/login">Play with computer</Link>
            </li>
            <li>
              <Link className="link" onClick={() => changeGameType('hotseat')} to="/game">Hotseat mode</Link>
            </li>
          </ul>
      </header>        
  );
};

export default Header;
