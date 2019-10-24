import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import { Login } from './components/Login';
import { Register } from './components/Register';
import { authentication } from './reducers/authenticationReducer';
import { registration } from './reducers/registrationReducer';
import { alert } from './reducers/alertReducer';
import './index.css';
import Game from './components/Game';
import gameReducer from './reducers/gameReducer'
import * as serviceWorker from './serviceWorker';

const logger = createLogger();
const rootReducer = combineReducers({
  gameReducer,
  registration,
  authentication,
  alert
});


const store = createStore(rootReducer, applyMiddleware(thunk, logger));
const gameStore = createStore(gameReducer);


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/user/login" exact component={Login} />
        <Route path="/user/register" exact component={Register} />
        <Provider store={gameStore}>
          <Route path="/game" exact component={Game} />
        </Provider>
        <Redirect to="/user/login" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
