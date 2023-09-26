import React from 'react';
import '../../App.css'
import Header from '../Header';
import Landing from '../Landing';
import Footer from '../Footer';
import Welcome from '../Welcome';
import Login from '../Login';
import Signup from '../SignUp';
import ErrorPage from '../ErrorPage';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ForgetPassword from '../ForgetPassword';
import { IconContext } from 'react-icons/lib';



function App() {
  return (
    <BrowserRouter>
    <IconContext.Provider value={{style: {verticalAlign: 'middle'}}}>
      <Header />
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/welcome" component={Welcome} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/forgetpassword" component={ForgetPassword}/>
        <Route component={ErrorPage} />
      </Switch>

      <Footer />
      </IconContext.Provider>
    </BrowserRouter>
  );
}

export default App;
