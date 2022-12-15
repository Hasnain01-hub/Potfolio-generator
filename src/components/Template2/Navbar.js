import React from "react";
import { Helmet } from "react-helmet";

const NavBar = ({ data }) => {
  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="/assets/temp2/assets/web/assets/mobirise-icons2/mobirise2.css"
        />
        <link
          rel="stylesheet"
          href="/assets/temp2/assets/bootstrap/css/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          href="/assets/temp2/assets/bootstrap/css/bootstrap-grid.min.css"
        />
        <link
          rel="stylesheet"
          href="/assets/temp2/assets/bootstrap/css/bootstrap-reboot.min.css"
        />
        <link
          rel="stylesheet"
          href="/assets/temp2/assets/dropdown/css/style.css"
        />
        <link
          rel="stylesheet"
          href="/assets/temp2/assets/socicon/css/styles.css"
        />
        <link
          rel="stylesheet"
          href="/assets/temp2/assets/theme/css/style.css"
        />
        <link rel="stylesheet" href="/assets/temp2/assets/recaptcha.css" />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css?family=Albert+Sans:100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i&amp;display=swap"
          as="style"
          onload="this.onload=null;this.rel='stylesheet'"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Albert+Sans:100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i&amp;display=swap"
        />
        <link
          rel="preload"
          as="style"
          href="/assets/temp2/assets/mobirise/css/mbr-additional.css"
        />
        <link
          rel="stylesheet"
          href="/assets/temp2/assets/mobirise/css/mbr-additional.css"
          type="text/css"
        />
      </Helmet>
      <nav className="navbar navbar-dropdown navbar-expand-lg">
        <div className="container">
          <div className="navbar-brand">
            <span className="navbar-caption-wrap">
              <a
                className="navbar-caption text-black display-5"
                href="https://mobiri.se/"
              >
                {data.name}
              </a>
            </span>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-bs-toggle="collapse"
            data-target="#navbarSupportedContent"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <div className="hamburger">
              <span />
              <span />
              <span />
              <span />
            </div>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav nav-dropdown" data-app-modern-menu="true">
              <li className="nav-item">
                <a
                  className="nav-link link text-black display-4"
                  href="https://mobiri.se/"
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link link text-black display-4"
                  href="https://mobiri.se/"
                  aria-expanded="false"
                >
                  About
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link link text-black display-4"
                  href="https://mobiri.se/"
                >
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link link text-black display-4"
                  href="https://mobiri.se/"
                >
                  Help
                </a>
              </li>
            </ul>
            <div className="navbar-buttons mbr-section-btn">
              <a
                className="btn btn-lg btn-white display-4"
                href="https://mobiri.se/"
              >
                <div className="btn-overlay" />
                <div className="btn-transform">
                  <div className="btn-transform-1">Log in&nbsp;</div>
                </div>
              </a>{" "}
              <a
                className="btn btn-lg btn-black display-4"
                href="https://mobiri.se/"
              >
                <div className="btn-overlay" />
                <div className="btn-transform">
                  <div className="btn-transform-1">Get Started</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
