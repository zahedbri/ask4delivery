/* eslint-disable react/prop-types */
import React from 'react'
import { NavLink } from 'react-router-dom'
import { ReactComponent as User } from '../img/user.svg'
import { ReactComponent as Bell } from '../img/bell.svg'
import { ReactComponent as Faq } from '../img/faq.svg'
import { ReactComponent as Home } from '../img/home.svg'

const NavMobile = ({ toggle, onClose }) => {
  return (
    <div className={`nav-mobile ${toggle ? 'nav-open' : ''}`}>
      <ul className="nav-mobile__list">
        <NavLink
          exact
          to="/dashboard/profile"
          activeClassName="mobile-selected"
          className="nav-mobile__list__link"
          onClick={() => onClose()}
        >
          <li className="nav-mobile__list__item">
            <User className="nav-mobile__list__icon mr-4" />
            Profile Settings
          </li>
        </NavLink>
        <NavLink
          to="/dashboard/requests"
          activeClassName="mobile-selected"
          className="nav-mobile__list__link"
          onClick={() => onClose()}
        >
          <li className="nav-mobile__list__item">
            <Bell className="nav-mobile__list__icon mr-4" /> Requests
          </li>
        </NavLink>
        <NavLink
          to="/dashboard/address"
          activeClassName="mobile-selected"
          className="nav-mobile__list__link"
          onClick={() => onClose()}
        >
          <li className="nav-mobile__list__item">
            <Home className="nav-mobile__list__icon mr-4" />
            Address
          </li>
        </NavLink>
        <NavLink
          to="/dashboard/faq"
          activeClassName="mobile-selected"
          className="nav-mobile__list__link"
          onClick={() => onClose()}
        >
          <li className="nav-mobile__list__item">
            <Faq className="nav-mobile__list__icon mr-4" />
            FAQ
          </li>
        </NavLink>
      </ul>
    </div>
  )
}

export default NavMobile
