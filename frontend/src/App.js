import { Switch } from 'react-router-dom'
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';

import MainPage from './components/MainPage/MainPage';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';
import NavBar from './components/NavBar/NavBar';
import PostIndex from './components/PostIndex/PostIndex';


function App() {
  return (
    <>
    <NavBar />
    <Switch>
      <AuthRoute exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginForm} />
      <AuthRoute exact path="/signup" component={SignupForm} />

      {/* making this an auth route while auth is broken */}
      <AuthRoute exact path="/posts" component={PostIndex} />
    </Switch>
    </>
  );
}

export default App;
