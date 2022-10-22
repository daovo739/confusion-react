import React from 'react'
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap'
import { Link } from 'react-router-dom'

function formatDate(dateString) {
  const date = new Date(dateString)

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const DishDetail = props => {
  const RenderDish = ({ dish }) => {
    return (
      <Card>
        <CardImg top src={dish.image} alt={dish.name} />

        <CardBody>
          <CardTitle>{dish.name}</CardTitle>

          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    )
  }

  const RenderComments = ({ comments }) => {
    const component = comments.map(singleComment => {
      const { id, comment, author, date } = singleComment

      return (
        <div key={id}>
          <p>{comment}</p>
          <p>
            -- {author}, {formatDate(date)}
          </p>
        </div>
      )
    })
    return component
  }

  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.dish.name}</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <RenderDish dish={props.dish} />
        </div>
        <div className="col-12 col-md-5 m-1">
          <RenderComments comments={props.comments} />
        </div>
      </div>
    </div>
  )
}

export default DishDetail
