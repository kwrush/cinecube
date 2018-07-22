import React from 'react';
import {
  Container,
  Row,
  Col 
} from 'reactstrap';
import Logo from '../Logo/index';

import './style.scss';

const Footer = props => (
  <div styleName="footer">
      <Container>
        <Row>
          <Col>
            <a href="/">
              <Logo size={1.2} color="#333" hoverAnimation={false} />
            </a>
          </Col>
          <Col>Link</Col>
          <Col>Something</Col>
        </Row>
      </Container>
  </div>
);

export default Footer