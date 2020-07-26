/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react'
import { withRouter } from 'react-router-dom'
import Modal from './Modal'
import { UserContext } from '../contexts/UserProvider'
import { signInWithFacebook } from '../firebase'
import logo from '../img/logo.svg'
import helmet from '../img/helmet.svg'
import userIcon from '../img/user.svg'
import arrow from '../img/arrow.svg'
import { ReactComponent as Facebook } from '../img/facebook.svg'

const Header = props => {
  const user = useContext(UserContext)

  const signIn = async () => {
    try {
      await signInWithFacebook()
      if (user !== null) {
        props.history.push('/dashboard')
      }
    } catch (err) {
      console.error(err)
    }
  }
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalType, setModalType] = useState('')

  const openModal = type => {
    setModalType(type)
    setModalIsOpen(true)
  }

  const hideModal = () => {
    setModalIsOpen(false)
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header__nav">
          <img src={logo} alt="Grabit" className="header__logo" />
          <button
            type="button"
            className="button button__primary"
            onClick={() => openModal('signin')}
          >
            Sign In
          </button>
        </div>
        <div className="header__heading-wrapper">
          <h1 className="header__main-heading">
            we <span className="header__main-heading--italic">deliver</span> it to your{' '}
            <span className="header__main-heading--italic">door</span> within{' '}
            <span className="header__main-heading--italic">one hour</span>
          </h1>
        </div>
        <div className="header__sign-up">
          <button
            type="button"
            className="header__sign-up-button"
            onClick={() => openModal('Driver')}
          >
            <img src={helmet} alt="Grabit" className="header__sign-up-button-icon" />
            Sign Up as Driver{' '}
            <img src={arrow} alt="Grabit" className="header__sign-up-button-arrow" />
          </button>
          <button
            type="button"
            className="header__sign-up-button"
            onClick={() => openModal('Customer')}
          >
            <img src={userIcon} alt="Grabit" className="header__sign-up-button-icon" />
            Sign Up as Custumer{' '}
            <img src={arrow} alt="Grabit" className="header__sign-up-button-arrow" />
          </button>
        </div>
      </div>
      <Modal isShown={modalIsOpen} onHide={hideModal}>
        <h1>
          {modalType !== 'signin' ? (
            <>
              Sign Up as a <span style={{ textDecoration: 'capitalize' }}>{modalType}</span>
            </>
          ) : (
            'Welcome Back'
          )}
        </h1>
        <p className="pb-5">{modalType === 'signin' ? 'Sign in' : 'Welcome'} to Grabit services</p>
        <button className="button button__secondary" type="button" onClick={signIn}>
          <Facebook className="mr-3 small__icon" /> Continue With Facebook
        </button>
      </Modal>
    </header>
  )
}

export default withRouter(Header)
