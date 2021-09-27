import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ACTION_TYPES} from "../../constants";
import axios from 'axios';
import './style.css';

function Login() {

const dispatch = useDispatch();  
const email = useSelector((state) => {return state.email});
const password = useSelector((state) => {return state.password});
const user = useSelector((state) => {return state.user});

const onChangeEmail= (event) => {
  const changeEmailAction = {
    type: ACTION_TYPES.CHANGE_EMAIL,
    payload: event.target.value
  }

  dispatch(changeEmailAction);
}

const onChangePassword = (event) => {
  const changePasswordAction = {
    type: ACTION_TYPES.CHANGE_PASSWORD,
    payload: event.target.value
  }

  dispatch(changePasswordAction);
}

const onLogin = async () => {
  try {
    dispatch({
      type: ACTION_TYPES.LOGIN_START
    })
    const user = await axios
      .post(`http://localhost:3001/signin`,
        {
          email: email,
          password: password
        })
      .then(response => response.data.user)
      
    dispatch({
      type: ACTION_TYPES.LOGIN_SUCCESS,
      payload: user
    })
  } catch (err) {
      dispatch({
      type: ACTION_TYPES.LOGIN_FAILURE,
    });
  }
}

  return (
    <div className="wrapper">
      <input type="text" value={email} placeholder="email" onChange={onChangeEmail}/>
      <input type="password" value={password} placeholder="password" onChange={onChangePassword}/>
      <button className="onLogin" onClick={onLogin}>Ready</button>
      { user.id && <Redirect to="/withComputer"/> }
    </div>
  );
}

export default Login;
