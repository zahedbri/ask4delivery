/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from 'react'

const Modal = ({ isShown, children, onHide }) => {
  return (
    <div className={`my-modal ${isShown ? `open` : ''}`}>
      <div className="my-modal__content">
        <span className="my-modal__close-button" onClick={() => onHide()}>
          &times;
        </span>
        <div className="my-modal__content-body">{children}</div>
      </div>
    </div>
  )
}

export default Modal
