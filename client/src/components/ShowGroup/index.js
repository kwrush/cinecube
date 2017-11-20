/**
 * Card group for demonstration
 */

import './style.scss';

import React from 'react';
import { Container, Row, Col, Card, CardImg, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap';

import MdKeyboardArrowRight from 'react-icons/lib/md/keyboard-arrow-right';

class ShowGroup extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <Container styleName="show-group">
        <header styleName="group-header">
          <div className="d-flex justify-content-between">
            <span className="d-flex">Movies</span>
            <a href="" className="d-flex align-items-center text-uppercase" styleName="link-more">
              <span>More</span>
              <MdKeyboardArrowRight />
            </a>
          </div>
        </header>
        <Row>
          <Col xs="12" sm="12" md="5">
            <Card body>
              <CardImg top width="100%" src="" />
              <CardBody>
                <CardTitle>Movie name</CardTitle>
                <CardSubtitle>Release date: 11/11/2017</CardSubtitle>
                <CardText>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit culpa adipisci porro, similique nostrum molestias voluptate ut? Quo, voluptates dolores cupiditate voluptatibus, ex, quis rem libero voluptate minus pariatur nesciunt.</CardText>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="12" md="7">
            <Row>
              <Col xs="12" sm="6">
                <Card body></Card>
              </Col>
              <Col xs="12" sm="6">
                <Card body></Card>
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="6">
                <Card body></Card>
              </Col>
              <Col xs="12" sm="6">
                <Card body></Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ShowGroup