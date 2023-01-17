import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './SessionForm.css'
import { signup, clearSessionErrors  } from '../../store/session'


function SignupForm() {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")

  const dispatch = useDispatch()
  const errors = useSelector(state => state.errors.session)

  useEffect(()=> {
    dispatch(clearSessionErrors());
  }, [dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()
    const user = {
      email,
      username,
      password
    }
    dispatch(signup(user))
  }
    

  return (
    <>
      <div>Signup</div>

      <form className='session-form' onSubmit={handleSubmit}>

        <div className='errors'>{errors?.email}</div>
        <label> Email
          <input
          value={email}
          placeholder="demo@user.io"
          onChange={(e) => setEmail(e.target.value)}
          />
        </label> 

      <div className='errors'>{errors?.username}</div>
      <label>Username
          <input
            value={username}
            placeholder="demo-lition"
            onChange={(e) => setUsername(e.target.value)}
          />
      </label>


      <div className='errors'>{errors?.password}</div>
      <label> Password
          <input
          type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
      </label>


        <div className='errors'>{password !== password2 && "Confirm Password must match"}</div>
        <label> Confirm Password
          <input
            type="password"
            value={password2}
            placeholder="password"
            onChange={(e) => setPassword2(e.target.value)}
          />
        </label>

        <input 
          type="submit"
          value="Sign Up"
          disabled={!email || !username || !password || password !== password2}/>

      </form>
    </>
  )
}

export default SignupForm