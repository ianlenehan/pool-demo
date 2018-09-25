import React, { Component } from 'react'
import { People, PlaylistAddCheck, Pool } from '@material-ui/icons';
import Icon from '@material-ui/core/Icon';
import { NavLink } from 'react-router-dom'
import './SideNav.css';

class SideNav extends Component {
  renderButtons() {
    return (
      <div className="buttons-container">
        <NavLink to="/follow-up">
          <PlaylistAddCheck className="left-icon" />
          Follow Up
        </NavLink>
        <NavLink to="/customers">
          <People className="left-icon" />
          Customers
        </NavLink>
        <NavLink to="products">
          <Pool className="left-icon" />
          Products
        </NavLink>
      </div>
    )
  }

  render() {
    return (
      <div className="side-nav-container">
        <p>Ian Lenehan</p>
        {this.renderButtons()}
      </div>
    )
  }
}

export default SideNav
