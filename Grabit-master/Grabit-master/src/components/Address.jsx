/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react'
import Map from './Map'
import Modal from './Modal'
import { ReactComponent as Trash } from '../img/trash.svg'
import { ReactComponent as Pin } from '../img/pin.svg'

class Address extends Component {
  constructor(props) {
    super(props)

    this.state = {
      addresses: [
        {
          id: 1,
          name: '47, Avenue Atlas, Agdal, Morocco',
          position: {
            lat: -3.745,
            lng: -38.523
          }
        },
        {
          id: 2,
          name: 'Else where in  Morocco',
          position: {
            lat: -3.745,
            lng: -38.523
          }
        }
      ],
      modalIsOpen: false,
      modalType: null
    }
  }

  handleOpenModal = id => {
    this.setState({ modalIsOpen: true, modalType: id })
  }

  handleCloseModal = () => {
    this.setState({ modalIsOpen: false })
  }

  handleDelete = id => {
    const newAddresses = [...this.state.addresses]
    const filtered = newAddresses.filter(address => address.id !== id)
    this.setState({ addresses: filtered, modalIsOpen: false })
  }

  render() {
    const { addresses, modalType, modalIsOpen } = this.state
    return (
      <>
        <h1 className="settings__heading">Address</h1>
        {addresses.map((address, index) => (
          <div key={address.id} className="address">
            <h1 className="address__heading">Address #{index + 1}</h1>
            <div className="address__content">
              <div className="address__banner">
                <div className="address__container">
                  <Pin className="address__pin" />
                  <h2 className="address__name">{address.name}</h2>
                </div>
                <button
                  type="button"
                  className="address__delete-button"
                  onClick={() => this.handleOpenModal(address.id)}
                >
                  <Trash />
                </button>
              </div>
              <Map
                lat={address.position.lat}
                lng={address.position.lng}
                width="100%"
                height="12rem"
              />
            </div>
          </div>
        ))}
        <Modal isShown={modalIsOpen} onHide={this.handleCloseModal}>
          <h3>Are you sure you want to delete this Address?</h3>
          <div className="mt-5">
            <button
              type="button"
              className="button button__dark button__small m-4"
              onClick={this.handleCloseModal}
            >
              Cancel
            </button>
            <button
              type="button"
              className="button button__primary button__small"
              onClick={() => this.handleDelete(modalType)}
            >
              Delete
            </button>
          </div>
        </Modal>
      </>
    )
  }
}

export default Address
