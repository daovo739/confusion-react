import React from 'react'
import { Link } from 'react-router-dom'
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Label,
  Input,
  Col,
  FormFeedback,
  Row,
} from 'reactstrap'
import { Control, Form, Errors, action } from 'react-redux-form'
import { v4 as uuidv4 } from 'uuid'

class Contact extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contactType: 'Tel.',
      message: '',
      touched: {
        firstname: false,
        lastname: false,
        telnum: false,
        email: false,
      },
      feedbacks: [],
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.fetchFeedBack = this.fetchFeedBack.bind(this)
    this.postFeedback = this.postFeedback.bind(this)
  }

  fetchFeedBack() {
    fetch('http://localhost:3001/feedbacks')
      .then(response => {
        return response.json()
      })
      .then(feedbacks => {
        this.setState({ feedbacks: feedbacks })
      })
  }
  componentDidMount() {
    this.fetchFeedBack()
  }

  postFeedback(feedback) {
    fetch('http://localhost:3001/feedbacks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedback),
    })
      .then(response => {
        return response.json()
      })
      .then(feedback => {
        this.setState([...this.state.feedbacks, feedback])
      })
  }

  handleSubmit(values) {
    // console.log('Current State is: ' + JSON.stringify(values))

    // alert('Current State is: ' + JSON.stringify(values))
    this.postFeedback({
      id: uuidv4(),
      firstName: values.firstname,
      lastName: values.lastname,
      phone: values.telnum,
      email: values.email,
    })
    this.fetchFeedBack()
    this.props.resetFeedbackForm()
  }

  handleBlur = field => evt => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    })
    console.log(this.state)
  }

  validate(firstname, lastname, telnum, email) {
    const errors = {
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
    }

    if (this.state.touched.firstname && firstname.length < 3)
      errors.firstname = 'First Name should be >= 3 characters'
    else if (this.state.touched.firstname && firstname.length > 10)
      errors.firstname = 'First Name should be <= 10 characters'

    if (this.state.touched.lastname && lastname.length < 3)
      errors.lastname = 'Last Name should be >= 3 characters'
    else if (this.state.touched.lastname && lastname.length > 10)
      errors.lastname = 'Last Name should be <= 10 characters'

    const reg = /^\d+$/
    if (this.state.touched.telnum && !reg.test(telnum))
      errors.telnum = 'Tel. Number should contain only numbers'

    if (
      this.state.touched.email &&
      email.split('').filter(x => x === '@').length !== 1
    )
      errors.email = 'Email should contain a @'

    return errors
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value,
    })
  }

  render() {
    console.log(this.state.feedbacks)
    const required = val => val && val.length
    const maxLength = len => val => !val || val.length <= len
    const minLength = len => val => val && val.length >= len
    const isNumber = val => !isNaN(Number(val))
    const validEmail = val =>
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)
    const errors = this.validate(
      this.state.firstname,
      this.state.lastname,
      this.state.telnum,
      this.state.email
    )
    return (
      <div className="row row-content">
        <div className="col-12">
          <h3>Send us your Feedback</h3>
        </div>
        <div className="col-12 col-md-9">
          {/* <Form onSubmit={this.handleSubmit}>
            <FormGroup row>
              <Label htmlFor="firstname" md={2}>
                First Name
              </Label>
              <Col md={10}>
                <Input
                  type="text"
                  id="firstname"
                  name="firstname"
                  placeholder="First Name"
                  value={this.state.firstname}
                  valid={errors.firstname === ''}
                  invalid={errors.firstname !== ''}
                  onBlur={this.handleBlur('firstname')}
                  onChange={this.handleInputChange}
                />
                <FormFeedback>{errors.firstname}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="lastname" md={2}>
                Last Name
              </Label>
              <Col md={10}>
                <Input
                  type="text"
                  id="lastname"
                  name="lastname"
                  placeholder="Last Name"
                  value={this.state.lastname}
                  valid={errors.lastname === ''}
                  invalid={errors.lastname !== ''}
                  onBlur={this.handleBlur('lastname')}
                  onChange={this.handleInputChange}
                />
                <FormFeedback>{errors.lastname}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="telnum" md={2}>
                Contact Tel.
              </Label>
              <Col md={10}>
                <Input
                  type="tel"
                  id="telnum"
                  name="telnum"
                  placeholder="Tel. Number"
                  value={this.state.telnum}
                  valid={errors.telnum === ''}
                  invalid={errors.telnum !== ''}
                  onBlur={this.handleBlur('telnum')}
                  onChange={this.handleInputChange}
                />
                <FormFeedback>{errors.telnum}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="email" md={2}>
                Email
              </Label>
              <Col md={10}>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  valid={errors.email === ''}
                  invalid={errors.email !== ''}
                  onBlur={this.handleBlur('email')}
                  onChange={this.handleInputChange}
                />
                <FormFeedback>{errors.email}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md={{ size: 6, offset: 2 }}>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      name="agree"
                      checked={this.state.agree}
                      onChange={this.handleInputChange}
                    />{' '}
                    <strong>May we contact you?</strong>
                  </Label>
                </FormGroup>
              </Col>
              <Col md={{ size: 3, offset: 1 }}>
                <Input
                  type="select"
                  name="contactType"
                  value={this.state.contactType}
                  onChange={this.handleInputChange}
                >
                  <option>Tel.</option>
                  <option>Email</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="message" md={2}>
                Your Feedback
              </Label>
              <Col md={10}>
                <Input
                  type="textarea"
                  id="message"
                  name="message"
                  rows="12"
                  value={this.state.message}
                  onChange={this.handleInputChange}
                ></Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md={{ size: 10, offset: 2 }}>
                <Button type="submit" color="primary">
                  Send Feedback
                </Button>
              </Col>
            </FormGroup>
          </Form> */}
          <Form model="feedback" onSubmit={values => this.handleSubmit(values)}>
            <Row className="form-group">
              <Label htmlFor="firstname" md={2}>
                First Name
              </Label>
              <Col md={10}>
                <Control.text
                  model=".firstname"
                  id="firstname"
                  name="firstname"
                  placeholder="First Name"
                  className="form-control"
                  validators={{
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(15),
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".firstname"
                  show="touched"
                  messages={{
                    required: 'Required',
                    minLength: 'Must be greater than 2 characters',
                    maxLength: 'Must be 15 characters or less',
                  }}
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Label htmlFor="lastname" md={2}>
                Last Name
              </Label>
              <Col md={10}>
                <Control.text
                  model=".lastname"
                  id="lastname"
                  name="lastname"
                  placeholder="Last Name"
                  className="form-control"
                  validators={{
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(15),
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".lastname"
                  show="touched"
                  messages={{
                    required: 'Required',
                    minLength: 'Must be greater than 2 characters',
                    maxLength: 'Must be 15 characters or less',
                  }}
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Label htmlFor="telnum" md={2}>
                Contact Tel.
              </Label>
              <Col md={10}>
                <Control.text
                  model=".telnum"
                  id="telnum"
                  name="telnum"
                  placeholder="Tel. Number"
                  className="form-control"
                  validators={{
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(15),
                    isNumber,
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".telnum"
                  show="touched"
                  messages={{
                    required: 'Required',
                    minLength: 'Must be greater than 2 numbers',
                    maxLength: 'Must be 15 numbers or less',
                    isNumber: 'Must be a number',
                  }}
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Label htmlFor="email" md={2}>
                Email
              </Label>
              <Col md={10}>
                <Control.text
                  model=".email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="form-control"
                  validators={{
                    required,
                    validEmail,
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".email"
                  show="touched"
                  messages={{
                    required: 'Required',
                    validEmail: 'Invalid Email Address',
                  }}
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Col md={{ size: 10, offset: 2 }}>
                <Button type="submit" color="primary">
                  Send Feedback
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
        <div className="">
          <ul>
            {this.state.feedbacks.map((feedback, index) => {
              return (
                <li key={index}>
                  <h5>Feedback #{index + 1}</h5>
                  <p>First Name: {feedback.firstName}</p>
                  <p>Last Name: {feedback.lastName}</p>
                  <p>Phone: {feedback.Phone}</p>
                  <p>Email: {feedback.email}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}
export default Contact
