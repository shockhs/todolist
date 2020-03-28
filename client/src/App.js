import React from 'react';
import './App.css';
import { connect, } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm';
import TodoList from './components/TodoList/TodoList';
import { getAuthStatus, getUserToken, getUserLogin } from './redux/selectors/App-page';
import { callExit } from './redux/action';
import RegisterForm from './components/RegisterForm/RegisterForm';


function App({ authStatus, login, callExit, currentToken, ...props }) {
  let { component: path } = props;
  let renderComponent;
  if (props.location.pathname === '/register') {
    renderComponent = <RegisterForm />
  } else if (authStatus) {
    renderComponent = <TodoList callExit={callExit} userLogin={login} userToken={currentToken} />
  } else if (!authStatus) {
    renderComponent = <LoginForm />
  }
  return (
    <Switch>
      <Route path={path} render={() => renderComponent} />
      <Route path='/register' render={() => <RegisterForm />} />
      <Route path='/login' render={() => <LoginForm />} />
    </Switch>
  );
}
const mapStateToProps = (state) => {
  return {
    authStatus: getAuthStatus(state),
    currentToken: getUserToken(state),
    login: getUserLogin(state)
  };
}


const AppContainer = connect(mapStateToProps, { callExit })(withRouter(App));

export default AppContainer;