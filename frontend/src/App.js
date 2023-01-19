import { Switch } from 'react-router-dom'


import { AuthRoute, ProtectedRoute } from './components/Routes/routes';






import PostIndex from './components/PostIndex/PostIndex';
import MainPage from './components/MainPage/MainPage'
import LoginForm from './components/SessionForms/LoginForm'
import SignupForm from './components/SessionForms/SignupForm'
import CreatePost from './components/CreatePost/CreatePost';
import NavBar from './components/NavBar/NavBar'
import Profile from './components/Profile/Profile';
import { fetchCurrentUser } from './store/session';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

function App() {

  const [loaded, setLoaded] = useState(false)

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


      <ProtectedRoute exact path="/posts" component={PostIndex} />
      <ProtectedRoute exact path='/posts/new' component={CreatePost} />

      <ProtectedRoute exact path="/profile/:userId" component={Profile} />
      

    </Switch>
    </>
  );
}

export default App;
