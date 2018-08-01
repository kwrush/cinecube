import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { GoIssueOpened } from 'react-icons/go';

import './style.scss'

class AutoComplete extends React.Component {

  static propTypes = {
    results: PropTypes.object,
    isOpen: PropTypes.bool
  }

  static defaultProps = {
    results: {},
    isOpen: false
  }

  renderNoResult = () => {
    return [
      <div styleName="no-result">
        <GoIssueOpened styleName="issue-icon"/>
        <span>No result is found...</span>
      </div>
    ];
  }

  renderItems = (items) => {
    return (
      <ListGroup flush>
        { 
          items.map((item, index) => {
            return (
              <ListGroupItem key={index}>
                {item}
              </ListGroupItem>
            );
          }) 
        }
      </ListGroup>
    );
  }

  renderSuggestions = (results) => {

    const contents = [];

    for (let prop in results) {

      let result = results[prop];
      
      if (result.length > 0) {
        contents.push(
          <div
            key={`group-type-${prop}`}
            styleName="suggestion-group"
          >
            <h6 styleName="group-title">{prop}</h6>
            {this.renderItems(result)}
            <Link to="/" styleName="link-more">More...</Link>
          </div>
        );
      }
    }

    return contents.length === 0 ? this.renderNoResult() : contents;
  }

  render () {

    //if (isEmpty(this.props.results)) return null;

    return this.props.isOpen
      ? (
        <div styleName="autocomplete">
          {this
            .renderSuggestions(this.props.results)
            .map(result => result)
          }
        </div>
      )
      : null;
  }
}

export default AutoComplete;