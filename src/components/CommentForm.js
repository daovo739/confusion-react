import React from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Label,
} from 'reactstrap'
import { Control, LocalForm, Errors } from 'react-redux-form'

class CommentForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
    }
    this.toggle = this.toggle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    })
  }

  handleSubmit(values) {
    alert(values.rating + ' ' + values.author + ' ' + values.comment)
    // this.toggle()
    // this.props.addComment(
    //   this.props.dishId,
    //   values.rating,
    //   values.author,
    //   values.comment
    // )
    // event.preventDefault();
  }

  render() {
    const maxLength = len => val => !val || val.length <= len
    const minLength = len => val => val && val.length >= len
    return (
      <div>
        <Button color="primary" onClick={this.toggle}>
          Submit comment
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <LocalForm onSubmit={values => this.handleSubmit(values)}>
            <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
            <ModalBody>
              <Row className="form-group mt-3">
                <Label htmlFor="author" md={2}>
                  Author
                </Label>
                <Col md={10}>
                  <Control.text
                    model=".author"
                    id="author"
                    name="author"
                    placeholder="Author"
                    className="form-control"
                    validators={{
                      maxLength: maxLength(15),
                      minLength: minLength(3),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      minLength: 'Must be greater than 3 characters',
                      maxLength: 'Must be 15 characters or less',
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group mt-3">
                <Label htmlFor="Rating" md={2}>
                  Rating
                </Label>
                <Col md={10}>
                  <Control.text
                    min={1}
                    type="number"
                    model=".rating"
                    id="rating"
                    name="rating"
                    placeholder="Rating"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Row className="form-group mt-3">
                <Label htmlFor="comment" md={2}>
                  Comment
                </Label>
                <Col md={10}>
                  <Control.textarea
                    rows={6}
                    model=".comment"
                    id="comment"
                    name="comment"
                    placeholder="Comment"
                    className="form-control"
                  />
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit">
                Submit
              </Button>
            </ModalFooter>
          </LocalForm>
        </Modal>
      </div>
    )
  }
}

export default CommentForm
