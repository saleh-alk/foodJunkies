import { Route, Switch } from 'react-router-dom'
import { AuthRoute, ProtectedRoute } from './components/Routes/routes';




import PostIndex from './components/PostIndex/PostIndex';

import MainPage from './components/MainPage/MainPage'
import LoginForm from './components/SessionForms/LoginForm'
import SignupForm from './components/SessionForms/SignupForm'
import NavBar from './components/NavBar/NavBar'
import { fetchCurrentUser } from './store/session';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Profile from './components/Profile/Profile'


function App() {

  const [loaded, setLoaded] = useState(true)

  const dispatch = useDispatch();
   

  useEffect(() => {
    dispatch(fetchCurrentUser()).then(() => setLoaded(true))
  }, [dispatch])

  return loaded && (
    <>
    <NavBar />
    <Switch>
      <AuthRoute exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginForm} />
      <AuthRoute exact path="/signup" component={SignupForm} />
      {/* making this an auth route while auth is broken */}
      <AuthRoute exact path="/posts" component={PostIndex} />

      <Route path="/profile/:userId">
          <Profile />
      </Route>
    </Switch>
    </>
  );
}

export default App;
