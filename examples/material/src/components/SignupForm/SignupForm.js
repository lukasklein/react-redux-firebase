import React, {Component, PropTypes} from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { capitalize } from 'lodash'

import './SignupForm.css'

const fieldStyle = { width: '80%' }
const buttonStyle = { width: '96%', marginBottom: '.5rem' }

export default class SignupForm extends Component {

  static propTypes = {
    account: PropTypes.object,
    onSignup: PropTypes.func.isRequired
  }

  state = { errors: {} }

  reset = () =>
    this.setState({
      errors: {},
      username: null,
      email: null,
      name: null
    })

  /**
   * @function handleSignup
   * @description Fire onLoginClick function provided to component when login is clicked
   */
  handleSignup = e => {
    console.log('handle signup called:', e)
    e.preventDefault()
    let newAccountData = this.state
    if (this.requireInputs()) {
      newAccountData.password = this.password
      newAccountData.confirm = this.confirm
      this.props.onSignup(newAccountData)
    }
  }

  /**
   * @function requireInputs
   * @description Confirm that all required inputs have values
   * @return {Boolean}
   */
  requireInputs = () => {
    const requiredInputs = [
      {name: 'username', val: this.state.username},
      {name: 'email', val: this.state.email},
      {name: 'name', val: this.state.name},
      {name: 'password', val: this.password},
      {name: 'confirm', val: this.confirm}
    ]
    const firstError = find(requiredInputs, (input) => {
      if (!input.val || input.val === '') {
        return true
      }
    })
    if (firstError) {
      let errors = {}
      errors[firstError.name] = `${capitalize(firstError.name)} is required`
      this.setState({ errors })
      return false
    }
    return true
  }

  googleSignup = () => {
    this.props.onSignup({provider: 'google', type: 'popup'})
  }

  render () {
    const { errors } = this.state
    return (
      <form className='SignupForm' onSubmit={this.handleSignup}>
        <TextField
          hintText='username'
          floatingLabelText='Username'
          errorText={errors.username}
          style={fieldStyle}
        />
        <TextField
          hintText='email'
          floatingLabelText='Email'
          errorText={errors.email}
          style={fieldStyle}
        />
        <TextField
          hintText='password'
          floatingLabelText='Password'
          errorText={errors.password}
          style={fieldStyle}
          type='password'
        />
        <div className='SignupForm-Submit'>
          <RaisedButton
            label='Sign Up'
            secondary
            type='submit'
            style={buttonStyle}
          />
        </div>
      </form>
    )
  }
}