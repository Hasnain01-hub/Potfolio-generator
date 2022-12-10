import React from "react";

const NavBar = ({ data }) => {
  return (
    <>
      
      <nav className="navbar center wide absolute dark-wrapper bg-opacity-dark inverse-text">
        <div className="flex-it">
          <div className="navbar-header align-left">
            <div className="navbar-brand">
              <img
                src="#"
                srcSet="/assets/images/logo2.png 1x, /assets/images/logo2@2x.png 2x"
                alt=""
              />
            </div>
            <div className="nav-bars-wrapper">
              <div className="nav-bars-inner">
                <div
                  className="nav-bars"
                  data-toggle="collapse"
                  data-target=".navbar-collapse"
                >
                  <span />
                </div>
              </div>
            </div>
          </div>

          <div className="align-center flex-it">
            <div className="navbar-collapse collapse">
              <ul className="nav navbar-nav">
                <li>
                  <a href="#home" className="scroll">
                    Home
                  </a>{" "}
                </li>
                <li>
                  <a href="#about" className="scroll">
                    About
                  </a>{" "}
                </li>
                <li>
                  <a href="#contact" className="scroll">
                    Contact
                  </a>{" "}
                </li>
              </ul>
            </div>
          </div>

          <div className="align-right text-right">
            <ul className="social social-color social-s">
              <li>
                <a href={data.youtube}>
                  <i className="et-youtube" />
                </a>
              </li>
              <li>
                <a href={data.instagram}>
                  <i className="et-instagram" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
