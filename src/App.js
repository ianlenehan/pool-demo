import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { People, PlaylistAddCheck, Pool, AccountCircle } from '@material-ui/icons';

import './App.css';
import FollowUp from './screens/FollowUp'
import Customers from './screens/Customers'
import Customer from './screens/Customer'
import Products from './screens/Products'
import CustomerPdf from './screens/CustomerPdf'

const NavIcon = ({ label }) => {
  switch (label) {
    case "Follow Up":
      return <PlaylistAddCheck className="left-icon" />
    case "Customers":
      return <People className="left-icon" />
    case "Products":
      return <Pool className="left-icon" />
    default:
      return <PlaylistAddCheck className="left-icon" />
  }
}

const MenuLink = ({ label, to, activeOnlyWhenExact }) => (
  <Route
    path={to}
    exact={activeOnlyWhenExact}
    children={({ match }) => (
      <div className={match ? "nav-link active" : "nav-link inactive"}>
        <Link to={to}>
          <NavIcon label={label} />
          {label}
        </Link>
      </div>
    )}
  />
)

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Pool CRM</h1>
          <div className="App-user">
            <AccountCircle />
            <span>Joe Anson</span>
          </div>
        </header>
        <Router>
          <div className="container">
            <div className="left-side">
              <MenuLink to="/follow-up" label="Follow Up" />
              <MenuLink to="/customers" label="Customers" />
              <MenuLink to="/products" label="Products" />
            </div>
            <div className="right-side">
              <Route path="/follow-up" component={FollowUp} />
              <Route exact path="/customers" component={Customers} />
              <Route exact path="/customers/:id" component={Customer} />
              <Route exact path="/customers/1/pdf" component={CustomerPdf} />
              <Route path="/products" component={Products} />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
