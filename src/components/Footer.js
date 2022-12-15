import React from "react";

const Footer = () => {
  return (
    <div className="footer-wrap-area pt-100">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="single-footer-widget">
              <h5
                style={{ color: "#fff" }}
                className="mbr-section-title card-title2 mbr-fonts-style align-left m-0 display-5"
              >
                <strong>PortfolioG</strong>
              </h5>
              <br />
              <p>
                Cloud based storage for your data backup just log in with your
                gmail account and choose whatever template you want for your
                business purpose.
              </p>
              <ul className="social-links">
                <li>
                  <a href="#/" target="_blank">
                    <i className="ri-facebook-fill" />
                  </a>
                </li>
                <li>
                  <a href="#/" target="_blank">
                    <i className="ri-twitter-fill" />
                  </a>
                </li>
                <li>
                  <a href="#/" target="_blank">
                    <i className="ri-linkedin-fill" />
                  </a>
                </li>

                <li>
                  <a href="#/" target="_blank">
                    <i className="ri-github-fill" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-2 col-md-6 col-sm-6">
            <div className="single-footer-widget pl-2">
              <h3>Company</h3>
              <ul className="links-list">
                <li>
                  <a href="about-simple.html">About Us</a>
                </li>
                <li>
                  <a href="features-2.html">Core Services</a>
                </li>
                <li>
                  <a href="privacy-policy.html">Refund Policy</a>
                </li>
                <li>
                  <a href="faq.html">FAQ's</a>
                </li>
                <li>
                  <a href="feedback.html">Reviews</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-2 col-md-3 col-sm-6">
            <div className="single-footer-widget">
              <h3>Useful Links</h3>
              <ul className="links-list">
                <li>
                  <a href="privacy-policy.html">Privacy Policy</a>
                </li>
                <li>
                  <a href="privacy-policy.html">Return Policy</a>
                </li>
                <li>
                  <a href="terms-conditions.html">Terms &amp; Conditions</a>
                </li>
                <li>
                  <a href="how-it-works.html">How It Works?</a>
                </li>
                <li>
                  <a href="contact.html">Contact Us</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="single-footer-widget">
              <h3>Newsletter</h3>
              <p>
                Best solution for your it startup business,
                consecteturadipiscing elit.
              </p>
              <form className="newsletter-form" data-toggle="validator">
                <input
                  type="text"
                  className="input-newsletter"
                  placeholder="Your Email"
                  name="EMAIL"
                  required
                  autoComplete="off"
                />
                <button type="submit">
                  <i className="ri-send-plane-2-line" />
                </button>
                <div id="validator-newsletter" className="form-result" />
              </form>
            </div>
          </div>
        </div>
        <div className="copyright-area">
          <p>
            Copyright <strong>AStheTECH</strong>. All Rights Reserved by{" "}
            <a href="#/" target="_blank">
              AStheTECH
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
