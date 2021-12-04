import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from 'react-router-dom';
import Login from './pages/Login';
import AboutUsPage from './pages/AboutUsPage';
import HomePage from './pages/HomePage';
import Accounts from './pages/Accounts';
import Transactions from './pages/Transactions';
import MoneyTransfer from './pages/MoneyTransfer';
import MoneyTransferHistory from './pages/MoneyTransferHistory';

import './App.css';



function Navigation(props) {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-secondary shadow mb-3">
      <Link className="navbar-brand" to="/">X-Bank</Link>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/login">
            Login
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/about-us">
            About Us
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}


class App extends React.Component {
  render() {
    return (
      <Router History={History}>
        <Navigation />
        <div className="container-fluid text-center">
          <div className="row justify-content-center">
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/about-us" component={AboutUsPage} />
              <Route path="/accounts" component={Accounts} />
              <Route path="/transactions" component={Transactions} />
              <Route path="/money_transfer" component={MoneyTransfer} />
              <Route path="/money_transfer_history" component={MoneyTransferHistory} />
              <Route path="/" component={HomePage} />
            </Switch>
          </div>
      </div>
      </Router>
    );
  }
}

export default App;