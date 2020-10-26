/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react'
import { withRouter } from 'react-router-dom'
import { signInWithFacebook } from '../firebase'
import { UserContext } from '../contexts/UserProvider'
import Modal from './Modal'
import { ReactComponent as Facebook } from '../img/facebook.svg'

const CallToAction = props => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

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

  const hideModal = () => {
    setModalIsOpen(false)
  }

  return (
    <div className="cta">
      <h2 className="cta__heading">Ready to order?</h2>
      <div className="cta__paragraph-wrapper">
        <p className="cta__paragraph">
          Browse local restaurants and businesses available in your area for delivery by entering
          your address below.
        </p>
      </div>
      <div className="cta__input">
        <button
          type="button"
          className="button button__invert"
          onClick={() => setModalIsOpen(true)}
        >
          Get Started
        </button>
      </div>
      <Modal isShown={modalIsOpen} onHide={hideModal}>
        <h1>Sign Up</h1>
        <p className="pb-5">Welcome to Grabit services</p>
        <button className="button button__secondary" type="button" onClick={signIn}>
          <Facebook className="mr-3 small__icon" /> Continue With Facebook
        </button>
      </Modal>
    </div>
  )
}

export default withRouter(CallToAction)
