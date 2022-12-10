import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../helpers/Firebase";

const Header = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const { portfolio } = useSelector((state) => ({ ...state }));
  
  let history = useHistory();
  const logout = () => {
    auth.signOut();
    toast.success("Logout Successfully");
    history.push("/");
  };

  return (
    <div className="navbar-area pakap-new-navbar-area">
      <div className="pakap-responsive-nav">
        <div className="container">
          <div className="pakap-responsive-menu">
            <div className="logo">
              <Link to="/">
                <b>
                  {" "}
                  <h1 style={{ fontWeight: " bold" }}>Portfolio Generator</h1>
                </b>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="pakap-nav">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">
              <b>
                <h1 style={{ fontWeight: " bold" }}>Portfolio Generator</h1>
              </b>
            </Link>
            <div className="collapse navbar-collapse mean-menu">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/" className="nav-link active">
                    Home
                  </Link>

                </li>

                <li className="nav-item megamenu">
                  <a href="/" className="dropdown-toggle nav-link">
                    Themes
                  </a>
                  <ul className="dropdown-menu">
                    <li className="nav-item">
                      <div className="container">
                        <div className="row">
                          <div className="col">
                            <h6 className="submenu-title">Design</h6>
                            <ul className="megamenu-submenu">
                              <li>
                                <a
                                  href={`/template1/${portfolio ? portfolio.id : "1"
                                    }`}
                                >
                                  Portfolio 1
                                </a>
                              </li>
                              <li>
                                <a href="team-2.html">Portfolio 2</a>
                              </li>
                              <li>
                                <a href="how-it-works.html">Portfolio 3</a>
                              </li>
                            </ul>
                          </div>

                        </div>
                      </div>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Contact
                  </Link>

                </li>

                {user ? (
                  <li className="nav-item">
                    <Link className="nav-link" to="/profilecomplete">
                      Register
                    </Link>
                  </li>
                ) : (
                  <></>
                )}
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Pricing
                  </Link>

                </li>
                {!user ? (
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link onClick={logout} className="nav-link">
                      Logout
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Header;