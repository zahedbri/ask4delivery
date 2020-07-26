/* eslint-disable react/static-property-placement */
/* eslint-disable react/sort-comp */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component, createRef } from 'react'
import uuid from 'uuid'
import { toast } from 'react-toastify'
import DirectionsMap from './DirectionsMap'
import { firestore } from '../firebase'
import { UserContext } from '../contexts/UserProvider'
import { validateCost, validateText } from '../utils'
import { ReactComponent as Add } from '../img/add.svg'
import { ReactComponent as Text } from '../img/text.svg'
import { ReactComponent as Calendar } from '../img/calendar.svg'
import { ReactComponent as Clock } from '../img/clock.svg'
import { ReactComponent as Dollar } from '../img/dollar.svg'
import { ReactComponent as Box } from '../img/box.svg'

class RequestForm extends Component {
  constructor(props) {
    super(props)
    this.addInput = createRef()
    this.state = {
      item: '',
      items: [],
      from: '',
      to: '',
      description: '',
      date: '',
      schedule: '',
      cost: '',
      errors: {
        description: '',
        cost: '',
        items: '',
        from: '',
        to: ''
      }
    }
  }

  handleAddItem = () => {
    const { value: item } = this.addInput.current

    if (item === '') {
      return
    }

    const newItems = [{ id: uuid(), value: item }, ...this.state.items]
    this.setState({ items: newItems, item: '' })
  }

  handleAddItemOnEnter = e => {
    if (e.keyCode === 13) {
      this.handleAddItem()
    }
  }

  handleRemoveItem = id => {
    const oldItems = [...this.state.items]
    const flitered = oldItems.filter(item => item.id !== id)
    this.setState({ items: flitered })
  }

  handleChange = e => {
    const { name, value } = e.target

    this.setState({
      [name]: value,
      errors: {
        description: '',
        cost: '',
        items: '',
        from: '',
        to: ''
      }
    })
  }

  handleSubmit = async e => {
    e.preventDefault()

    const { description, cost, items, from, to, schedule, date } = this.state

    const isValid = this.validate()

    const order = {
      description,
      cost,
      items,
      from,
      to,
      schedule,
      custumerID: this.context.uid,
      date,
      dateCreated: new Date()
    }

    if (isValid) {
      try {
        await firestore.collection('orders').add(order)
        toast.success('order Made succesfully!')
        this.setState({
          description: '',
          date: '',
          schedule: '',
          cost: '',
          items: [],
          from: '',
          to: ''
        })
      } catch (err) {
        console.error(err.message)
      }
    }
  }

  validate = () => {
    const { description, cost, items, from, to } = this.state
    let descriptionError = ''
    let costError = ''
    let itemsError = ''
    let fromError = ''
    let toError = ''

    if (validateText(description)) {
      descriptionError = 'Please Specify your order details'
    }

    if (validateCost(cost)) {
      costError = 'Please specify a valid cost'
    }

    if (items.length === 0) {
      itemsError = 'Please Add items to the list'
    }

    if (validateText(from)) {
      fromError = 'Please set the location of the order'
    }

    if (validateText(to)) {
      toError = 'Please where you want to recieve the order'
    }

    if (descriptionError || costError || itemsError || fromError || toError) {
      this.setState({
        errors: {
          description: descriptionError,
          cost: costError,
          items: itemsError,
          from: fromError,
          to: toError
        }
      })
      return false
    }

    return true
  }

  static contextType = UserContext

  render() {
    const { item, items, description, date, schedule, cost, errors, from, to } = this.state
    return (
      <>
        <h1 className="settings__heading">Request</h1>
        <div className="row p-5">
          <div className="col-lg-6 order-lg-last margin__bottom__mobile--medium">
            <div className="form-group">
              <label htmlFor="from" style={{ fontSize: 14, fontWeight: 500 }}>
                From
              </label>
              <input
                id="from"
                type="text"
                placeholder="Set the Order location"
                className={`form-control ${errors.from ? 'is-invalid' : ''}`}
                name="from"
                value={from}
                onChange={this.handleChange}
              />
              {errors.from && <div className="invalid-feedback mb-2">{errors.from}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="to" style={{ fontSize: 14, fontWeight: 500 }}>
                To
              </label>
              <input
                id="to"
                type="text"
                placeholder="Set the Order destination"
                className={`form-control ${errors.to ? 'is-invalid' : ''}`}
                name="to"
                value={to}
                onChange={this.handleChange}
              />
              {errors.to && <div className="invalid-feedback mb-2">{errors.to}</div>}
            </div>
            <DirectionsMap from={from} to={to} />
          </div>
          <div className="col-lg-6">
            <form className="request-form" onSubmit={this.handleSubmit}>
              <div className="request-form__group">
                <label className="request-form__group__label" htmlFor="details">
                  <Text className="request-form__group__label--icon" /> Describe your Order
                </label>
                <textarea
                  className={`request-form__group__textaria form-control ${
                    errors.description ? 'is-invalid' : ''
                  }`}
                  id="details"
                  rows="3"
                  name="description"
                  value={description}
                  onChange={this.handleChange}
                />
                {errors.description && (
                  <div className="invalid-feedback mb-2">{errors.description}</div>
                )}
              </div>
              <label className="request-form__group__label  mt-5" htmlFor="details">
                <Box className="request-form__group__label--icon" /> Order Items List
              </label>
              <div className={`request-form__add-item ${errors.items ? 'has-error' : ''}`}>
                <div>
                  <Add className="request-form__add-item__icon" />
                  <input
                    type="text"
                    ref={this.addInput}
                    placeholder="Add Item"
                    className="request-form__add-item__input"
                    name="item"
                    value={item}
                    onChange={this.handleChange}
                    onKeyDown={this.handleAddItemOnEnter}
                  />
                </div>
                <button
                  type="button"
                  className="request-form__add-item__button"
                  onClick={this.handleAddItem}
                >
                  Add
                </button>
              </div>
              {errors.items && <div className="error-message">{errors.items}</div>}
              <div className="mt-4">
                {items.map(singleItem => (
                  <div key={singleItem.id} className="request-form__item">
                    <li>{singleItem.value}</li>
                    <div>
                      <button
                        type="button"
                        className="request-form__item__button"
                        onClick={() => this.handleRemoveItem(singleItem.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="row my-5">
                <div className="request-form__group col-lg-6 margin__bottom__mobile--small">
                  <label htmlFor="text" className="request-form__group__label">
                    <Clock className="request-form__group__label--icon" /> Date
                  </label>
                  <input
                    type="text"
                    className="form-control request-form__group__input"
                    id="date"
                    name="date"
                    placeholder="ASAP"
                    value={date}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="request-form__group col-lg-6">
                  <label htmlFor="schedule" className="request-form__group__label">
                    <Calendar className="request-form__group__label--icon" /> Schedule
                  </label>
                  <input
                    type="date"
                    className="form-control request-form__group__input"
                    id="schedule"
                    name="schedule"
                    selected={schedule}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="request-form__group">
                <label htmlFor="cost" className="request-form__group__label">
                  <Dollar className="request-form__group__label--icon" /> Order Cost
                </label>
                <input
                  type="text"
                  className={`form-control request-form__group__input ${
                    errors.cost ? 'is-invalid' : ''
                  }`}
                  id="cost"
                  name="cost"
                  placeholder="$50 - $60"
                  value={cost}
                  onChange={this.handleChange}
                />
                {errors.cost && <div className="invalid-feedback mb-2">{errors.cost}</div>}
              </div>
              <input
                type="submit"
                value="Request"
                className="button button__primary button__block mt-5"
              />
            </form>
          </div>
        </div>
      </>
    )
  }
}

export default RequestForm
