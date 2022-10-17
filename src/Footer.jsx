import React from "react";

const Footer = () => {
  return (
    <footer className="dark-wrapper inverse-text">
      <div className="sub-footer">
        <div className="container inner pt-50 pb-50 text-center">
          <p>© 2017 crea;tink. All rights reserved. Theme by elemis.</p>
          <div className="space20" />
          <ul className="social social-bg social-s">
            <li>
              <a href="#/">
                <i className="et-twitter" />
              </a>
            </li>
            <li>
              <a href="#/">
                <i className="et-facebook" />
              </a>
            </li>
            <li>
              <a href="#/">
                <i className="et-pinterest" />
              </a>
            </li>
            <li>
              <a href="#/">
                <i className="et-vimeo" />
              </a>
            </li>
            <li>
              <a href="#/">
                <i className="et-instagram" />
              </a>
            </li>
          </ul>
        </div>
        {/* /.container */}
      </div>
      {/* /.sub-footer */}
    </footer>
  );
};

export default Footer;
