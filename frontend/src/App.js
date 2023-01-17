import { Router, Switch } from 'react-router-dom'
import { AuthRoute, ProtectedRoute } from './components/Routes/routes';

import MainPage from './components/MainPage/MainPage'
import LoginForm from './components/SessionForms/LoginForm'
import SignupForm from './components/SessionForms/SignupForm'
import NavBar from './components/NavBar/NavBar'


function App() {
  return (
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
