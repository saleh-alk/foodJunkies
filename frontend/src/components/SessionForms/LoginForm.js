import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForm.css';

import { login, clearSessionErrors } from '../../store/session';

function LoginForm () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === 'email' ? setEmail : setPassword;
    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password })); 
  }

  return (
    <div id="outer">

    <div className="outerBox">
      <form className="session-form" onSubmit={handleSubmit}>
        <h2 className="formTitle">Sign in</h2>

        <div className="errors">{errors?.email}</div>
        <label className="custom-field">
          <input type="email"
            value={email}
            onChange={update('email')}
            placeholder="Email"
            className="custom-field"
            required/>
            
        </label>

        <div className="errors">{errors?.password}</div>

        <label className="custom-field">
          <input type="password"
            value={password}
            onChange={update('password')}
            placeholder="Password"
            className="custom-field"
            required/>
      
        </label>
        <input
          className="formButton"
          type="submit"
          value="Log In"
          disabled={!email || !password}
          />
      </form>
    </div>
  </div>
  );
}

export default LoginForm;