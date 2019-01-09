import React from 'react';
import PropTypes from 'prop-types';
import { 
  Button,
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap';
import { MdArrowBack } from 'react-icons/md';
import { mapToCssModules } from '../../utils/helpers';
import './FullModal.scss';

const noFunc = () => {};

class FullModal extends React.PureComponent {

  static propTypes = {
    children: PropTypes.element,
    cssModule: PropTypes.object,
    open: PropTypes.bool,
    toggle: PropTypes.func,
    fade: PropTypes.bool,
    onEnter: PropTypes.func,
    onExit: PropTypes.func,
    onOpened: PropTypes.func,
    onClosed: PropTypes.func,
  }

  static defaultProps = {
    fade: true,
    open: false,
    toggle: noFunc,
    onEnter: noFunc,
    onExit: noFunc,
    onOpened: noFunc,
    onClosed: noFunc
  }

  render () {

    const { 
      open,
      toggle,
      fade,
      onEnter,
      onExit,
      onOpened,
      onClosed,
      children,
      className,
      cssModule 
    } = this.props;
    
    const contentClasses = mapToCssModules('border-0 rounded-0 bg-light', cssModule);
    const classes = mapToCssModules(className, cssModule);

    return (
      <Modal 
        fade={fade}
        isOpen={open} 
        toggle={toggle} 
        styleName="full-modal ovrd"
        contentClassName={contentClasses}
        className={classes}
        onEnter={onEnter}
        onExit={onExit}
        onOpened={onOpened}
        onClosed={onClosed}
      >
        <ModalHeader>
          <Button close onClick={toggle}>
            <MdArrowBack size="1.5rem"/>
          </Button>
        </ModalHeader>
        <ModalBody>
          {children}
        </ModalBody>
      </Modal>
    );
  }

}

export default FullModal;