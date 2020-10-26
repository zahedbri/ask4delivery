import React from 'react'
import { NavLink } from 'react-router-dom'
import { ReactComponent as Edit } from '../img/edit.svg'
import { ReactComponent as User } from '../img/user.svg'
import { ReactComponent as Bell } from '../img/bell.svg'
import { ReactComponent as Faq } from '../img/faq.svg'
import { ReactComponent as Home } from '../img/home.svg'

const SideBar = () => {
  return (
    <div className="mb-4">
      <NavLink to="/dashboard/request" className="requestButton" activeClassName="clicked">
        <Edit />
        <span className="pl-3"> Request an Order</span>
      </NavLink>
      <div className="sidebar">
        <nav className="sidebar__nav">
          <ul className="sidebar__list">
            <NavLink
              exact
              to="/dashboard/profile"
              activeClassName="selected"
              className="sidebar__list-link"
            >
              <li className="sidebar__list-item">
                <User className="sidebar__list-icon" />
                <span className="sidebar__list-text">Profile Settings</span>
              </li>
            </NavLink>
            <NavLink
              to="/dashboard/requests"
              activeClassName="selected"
              className="sidebar__list-link"
            >
              <li className="sidebar__list-item">
                <Bell className="sidebar__list-icon" />
                <span className="sidebar__list-text">Requests</span>
              </li>
            </NavLink>
            <NavLink
              to="/dashboard/address"
              activeClassName="selected"
              className="sidebar__list-link"
            >
              <li className="sidebar__list-item">
                <Home className="sidebar__list-icon" />
                <span className="sidebar__list-text">Address</span>
              </li>
            </NavLink>
            <NavLink to="/dashboard/faq" activeClassName="selected" className="sidebar__list-link">
              <li className="sidebar__list-item">
                <Faq className="sidebar__list-icon" />
                <span className="sidebar__list-text">FAQ</span>
              </li>
            </NavLink>
          </ul>
        </nav>
        <div className="sidebar__footer">
          &copy; 2019 Grabit{' '}
          <ul className="sidebar__legal">
            <li className="sidebar__legal-item">Terms</li>
            <li className="sidebar__legal-item">Privacy Policy</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SideBar
