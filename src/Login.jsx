import React from 'react';
import './Login.css';
import Button from '@mui/material/Button';

import { auth, provider } from './firebase';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';
import { signInWithPopup } from 'firebase/auth';

function Login() {
  const [{}, dispatch] = useStateValue();
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/800px-WhatsApp.svg.png"
          alt=""
        />
        <div className="login__text">
          <h1>Whatsapp-Clone Giriş Yap</h1>
        </div>
        <Button onClick={signIn}>Google ile giriş yap</Button>
      </div>
    </div>
  );
}

export default Login;
