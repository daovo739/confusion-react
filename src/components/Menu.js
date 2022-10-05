import React, { Component } from 'react'
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
} from 'reactstrap'

class Menu extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectDish: null,
    }
  }

  onDishSelect(dish) {
    this.setState({ selectedDish: dish })
  }

  renderDish(dish) {
    const component = dish ? (
      <Card>
        <CardImg top src={dish.image} alt={dish.name} />

        <CardBody>
          <CardTitle>{dish.name}</CardTitle>

          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    ) : (
      <div></div>
    )
    return component
  }

  render() {
    const menu = this.props.dishes.map(dish => {
      const { id, name, image } = dish
      return (
        <div className="col-12 col-md-5 m-1">
          <Card key={id} onClick={() => this.onDishSelect(dish)}>
            <CardImg width="100%" src={image} alt={name} />
            <CardImgOverlay>
              <CardTitle>{name}</CardTitle>
            </CardImgOverlay>
          </Card>
        </div>
      )
    })

    return (
      <div className="container">
        <div className="row">{menu}</div>

        <div className="row">
          <div className="col-12 col-md-5 m-1">
            {this.renderDish(this.state.selectedDish)}
          </div>
        </div>
      </div>
    )
  }
}

export default Menu
