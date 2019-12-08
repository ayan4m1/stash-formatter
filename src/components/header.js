import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from 'react-bootstrap';

const Header = ({ siteTitle }) => (
  <Navbar>
    <Navbar.Brand>{siteTitle}</Navbar.Brand>
  </Navbar>
);

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``
};

export default Header;
