import React from 'react';
import {
  Container,
  Row,
  Col 
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Logo from '../Logo/index';

import './style.scss';

const Footer = props => (
  <div styleName="footer">
      <Container>
        <Row>
          <Col>
            <Logo size={1.7} color="#333" hoverAnimation={false} />
          </Col>
          <Col>
            <a href="https://kwrush.github.io/">Github</a>
          </Col>
        </Row>
      </Container>
  </div>
);

export default Footer;