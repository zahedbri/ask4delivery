/* eslint-disable react/static-property-placement */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react'
import { toast } from 'react-toastify'
import { firestore, uploadFile } from '../firebase'
import { UserContext } from '../contexts/UserProvider'
import { validateEmail, validatePhone, validateText } from '../utils'

class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayName: '',
      email: '',
      phone: '',
      photoURL: null,
      errors: {
        name: '',
        email: '',
        phone: ''
      }
    }
  }

  componentDidMount() {
    this.setState(this.context)
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = async e => {
    e.preventDefault()
    const { uid } = this.context
    const profile = firestore.doc(`users/${uid}`)

    const { displayName, email, phone, photoURL } = this.state

    const isValid = this.validate()

    if (isValid) {
      try {
        await profile.update({ displayName, email, phone, photoURL })
        this.setState({ errors: { name: '', email: '', phone: '' } })
        toast.success('Profile Updated!')
      } catch (error) {
        console.log(error)
        toast.error('An Error has Occured!')
      }
    }
  }

  validate = () => {
    const { displayName, email, phone } = this.state
    let nameError = ''
    let emailError = ''
    let phoneError = ''

    if (validateText(displayName)) {
      nameError = 'Please provide a valid Name'
    }

    if (validateEmail(email)) {
      emailError = 'Please provide a valid Email'
    }

    if (validatePhone(phone)) {
      phoneError = 'Please provide a valid Phone number'
    }

    if (nameError || nameError || emailError) {
      this.setState({ errors: { name: nameError, email: emailError, phone: phoneError } })
      return false
    }

    return true
  }

  handleImageChange = async e => {
    const file = e.target.files[0]
    const { uid } = this.context
    const photoURL = await uploadFile(uid, file)
    this.setState({ photoURL })
  }

  static contextType = UserContext

  render() {
    const { displayName, email, phone, photoURL, errors } = this.state
    return (
      <>
        <h1 className="settings__heading">Profile Settings</h1>
        <div className="profile">
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-lg-6 text-center order-lg-last margin__bottom__mobile--medium">
                {photoURL ? (
                  <img src={photoURL} alt="avatar" className="profile__avatar" />
                ) : (
                  <div className="profile__avatar profile__avatar--letter">{displayName[0]}</div>
                )}
                <div>
                  <input
                    type="file"
                    name="file"
                    id="file"
                    className="profile__upload-button"
                    onChange={this.handleImageChange}
                  />
                  <label htmlFor="file">Upload</label>
                  <button
                    type="button"
                    className="button button__small button__light m-1"
                    onClick={() => this.setState({ photoURL: null })}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group-lg">
                  <label htmlFor="displayName" className="profile__input-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className={`form-control p-4 ${errors.name ? 'is-invalid' : ''}`}
                    id="displayName"
                    name="displayName"
                    value={displayName}
                    onChange={this.handleChange}
                  />
                  {errors.name && <div className="invalid-feedback mb-2">{errors.name}</div>}
                </div>
                <div className="form-group-lg mt-4">
                  <label htmlFor="email" className="profile__input-label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className={`form-control p-4 ${errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    value={email}
                    onChange={this.handleChange}
                  />
                  {errors.email && <div className="invalid-feedback mb-2">{errors.email}</div>}
                </div>
                <div className="form-group-lg mt-4">
                  <label htmlFor="phone" className="profile__input-label">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    className={`form-control p-4 ${errors.phone ? 'is-invalid' : ''}`}
                    id="phone"
                    value={phone}
                    onChange={this.handleChange}
                  />
                  {errors.phone && <div className="invalid-feedback mb-2">{errors.phone}</div>}
                </div>
                <button type="submit" className="button button__block button__primary mt-5">
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </>
    )
  }
}

export default Profile
