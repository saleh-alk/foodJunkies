import { Router, Switch } from 'react-router-dom'
import { AuthRoute, ProtectedRoute } from './components/Routes/routes';

import MainPage from './components/MainPage/MainPage'
import LoginForm from './components/SessionForms/LoginForm'
import SignupForm from './components/SessionForms/SignupForm'
import NavBar from './components/NavBar/NavBar'
import { getCurrentUser } from './store/session';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';





function App() {
  const [loaded, setLoaded] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true))
  }, [dispatch])

  

  return loaded && (
    <>
    <NavBar />
      <Switch>
        <AuthRoute exact path="/" component={MainPage} />
        <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/signup" component={SignupForm} />
      </Switch>
    </>
  );
}

export default App;
