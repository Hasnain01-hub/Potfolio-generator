import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../Firebase";
const Header = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const styles = {
    Login: {
      background: "white",
      padding: "0 10px",
      width:"auto",
      height:"37px",
      marginTop: "18px",
      
      color: "black",
      fontSize: "15px",
      borderRadius: "15px",
      border: "none",
      boxShadow: "0px 0px 3px 0px #09ab1b",
      cursor: "pointer",
    },
  };
  let history = useHistory();
  const logout=() =>{
    auth.signOut();
    toast.success("Logout Successfully");
    history.push("/");
  }
  return (
    <div className="navbar-area pakap-new-navbar-area">
      <div className="pakap-responsive-nav">
        <div className="container">
          <div className="pakap-responsive-menu">
            <div className="logo">
              <Link to="/">
                <img src="assets/ast/img/black-logo.png" alt="logo" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="pakap-nav">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">
              <img src="assets/ast/img/black-logo.png" alt="logo" />
            </Link>
            <div className="collapse navbar-collapse mean-menu">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/" className="nav-link active">
                    Home
                  </Link>
                  {/* <ul className="dropdown-menu">
                    <li className="nav-item">
                      <a href="index.html" className="nav-link">
                        Home Demo - 1
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="index-2.html" className="nav-link">
                        Home Demo - 2
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="index-3.html" className="nav-link">
                        Home Demo - 3
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="index-4.html" className="nav-link">
                        Home Demo - 4
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="index-5.html" className="nav-link">
                        Home Demo - 5
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="index-6.html" className="nav-link">
                        Home Demo - 6
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="index-7.html" className="nav-link">
                        Home Demo - 7
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="index-8.html" className="nav-link active">
                        Home Demo - 8
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="index-9.html" className="nav-link">
                        Home Demo - 9
                      </a>
                    </li>
                  </ul> */}
                </li>
                <li className="nav-item">
                  <Link to="/about" className="nav-link">
                    About Us
                  </Link>
                  {/* <ul className="dropdown-menu">
                    <li className="nav-item">
                      <a href="about-simple.html" className="nav-link">
                        About Simple
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="about-modern.html" className="nav-link">
                        About Modern
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#/" className="dropdown-toggle nav-link">
                        Features
                      </a>
                      <ul className="dropdown-menu">
                        <li className="nav-item">
                          <a href="features-1.html" className="nav-link">
                            Features 1
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="features-2.html" className="nav-link">
                            Features 2
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul> */}
                </li>
                <li className="nav-item megamenu">
                  <a href="#/" className="dropdown-toggle nav-link">
                    Pages
                  </a>
                  <ul className="dropdown-menu">
                    <li className="nav-item">
                      <div className="container">
                        <div className="row">
                          <div className="col">
                            <h6 className="submenu-title">Pages I</h6>
                            <ul className="megamenu-submenu">
                              <li>
                                <Link to="team-1.html">Team 1</Link>
                              </li>
                              <li>
                                <a href="team-2.html">Team 2</a>
                              </li>
                              <li>
                                <a href="how-it-works.html">How It Works</a>
                              </li>
                              <li>
                                <a href="gallery.html">Gallery</a>
                              </li>
                              <li>
                                <a href="services.html">Services</a>
                              </li>
                              <li>
                                <a href="pricing.html">Pricing Plan</a>
                              </li>
                            </ul>
                          </div>
                          <div className="col">
                            <h6 className="submenu-title">Pages II</h6>
                            <ul className="megamenu-submenu">
                              <li>
                                <a href="feedback.html">Reviews</a>
                              </li>
                              <li>
                                <a href="sign-in.html">Sign In</a>
                              </li>
                              <li>
                                <a href="sign-up.html">Sign Up</a>
                              </li>
                              <li>
                                <a href="forget-password.html">
                                  Forget Password
                                </a>
                              </li>
                              <li>
                                <a href="privacy-policy.html">Privacy Policy</a>
                              </li>
                              <li>
                                <a href="terms-conditions.html">
                                  Terms &amp; Conditions
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="col">
                            <h6 className="submenu-title">Pages III</h6>
                            <ul className="megamenu-submenu">
                              <li>
                                <a href="screenshots.html">Screenshots</a>
                              </li>
                              <li>
                                <a href="faq.html">FAQ</a>
                              </li>
                              <li>
                                <a href="coming-soon.html">Coming Soon</a>
                              </li>
                              <li>
                                <a href="error-404.html">404 Error Page</a>
                              </li>
                              <li>
                                <a href="app-download.html">App Download</a>
                              </li>
                              <li>
                                <a href="contact.html">Contact Us</a>
                              </li>
                            </ul>
                          </div>
                          <div className="col">
                            <a
                              href="#/"
                              target="_blank"
                              className="d-block p-0"
                            >
                              <img src="assets/ast/img/navbar.jpg" alt="disp" />
                            </a>
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
                  {/* <ul className="dropdown-menu">
                    <li className="nav-item">
                      <a href="products.html" className="nav-link">
                        Products List
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="cart.html" className="nav-link">
                        Cart
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="checkout.html" className="nav-link">
                        Checkout
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="products-details.html" className="nav-link">
                        Products Details
                      </a>
                    </li>
                  </ul> */}
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Pricing
                  </Link>
                  {/* <ul className="dropdown-menu">
                    <li className="nav-item">
                      <a href="blog-grid.html" className="nav-link">
                        Blog Grid
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="blog-right-sidebar.html" className="nav-link">
                        Blog Right Sidebar
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="blog-left-sidebar.html" className="nav-link">
                        Blog Left Sidebar
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="blog-details.html" className="nav-link">
                        Blog Details
                      </a>
                    </li>
                  </ul> */}
                </li>
                {!user ? (
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  </li>
                ) : (
                  <button
                    onClick={logout}
                    style={styles.Login}
                    // icon={<GoogleOutlined />}
                    size="large"
                  >
                    <i class="ri-logout-circle-r-line"></i>
                    &nbsp;Logout
                  </button>
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
