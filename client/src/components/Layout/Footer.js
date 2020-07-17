import React from 'react';

function Footer() {
  return (
    <footer>
      <div className="d-flex justify-content-center">&copy; ApertureApp {new Date().getFullYear()}</div>
    </footer>
  )
}

export default Footer;