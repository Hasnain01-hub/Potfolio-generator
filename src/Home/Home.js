import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Home = () => {
  return (
    <>
      <div>
        {/* Start Navbar Area */}
        <Header />
        {/* End Navbar Area */}
        {/* Start New App Main Banner Wrap Area */}
        <div className="new-app-main-banner-wrap-area">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-12">
                <div className="new-app-main-banner-wrap-content">
                  <span className="sub-title">
                    #Get Your 14 Days Free Trial
                  </span>
                  <h1>Manage All Of Your Stuff Using A Pakap</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id
                    tincidunt eifend odio viverra diam aliquet donec again.
                  </p>
                  <ul className="user-info">
                    <li>
                      <img
                        src="assets/ast/img/user/user1.jpg"
                        className="rounded-circle"
                        alt="disp"
                      />
                    </li>
                    <li>
                      <img
                        src="assets/ast/img/user/user2.jpg"
                        className="rounded-circle"
                        alt="disp"
                      />
                    </li>
                    <li>
                      <img
                        src="assets/ast/img/user/user3.jpg"
                        className="rounded-circle"
                        alt="disp"
                      />
                    </li>
                    <li>
                      <img
                        src="assets/ast/img/user/user4.jpg"
                        className="rounded-circle"
                        alt="disp"
                      />
                    </li>
                    <li className="title">4K+ used this App</li>
                  </ul>
                  <div className="app-btn-box">
                    <a href="#/" className="applestore-btn" target="_blank">
                      <img src="assets/ast/img/apple-store.png" alt="disp" />
                      Download on the
                      <span>Apple Store</span>
                    </a>
                    <a href="#/" className="playstore-btn" target="_blank">
                      <img src="assets/ast/img/play-store.png" alt="disp" />
                      Get It On
                      <span>Google Play</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div
                  className="new-app-main-banner-wrap-image"
                  data-aos="fade-left"
                  data-aos-duration={2000}
                >
                  <img
                    src="assets/ast/img/more-home/banner/banner-2.png"
                    alt="disp"
                  />
                  <div className="wrap-image-shape-1">
                    <img
                      src="assets/ast/img/more-home/banner/shape-3.png"
                      alt="disp"
                    />
                  </div>
                  <div className="wrap-image-shape-2">
                    <img
                      src="assets/ast/img/more-home/banner/shape-4.png"
                      alt="disp"
                    />
                  </div>
                  <div className="banner-circle">
                    <img
                      src="assets/ast/img/more-home/banner/banner-circle.png"
                      alt="disp"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="new-app-main-banner-wrap-shape">
            <img src="assets/ast/img/more-home/banner/shape-5.png" alt="disp" />
          </div>
        </div>
        {/* End New App Main Banner Wrap Area */}
        {/* Start Features Area */}
        <div className="features-area pt-100 pb-75">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-12">
                <div className="features-inner-content">
                  <span className="sub-title">KEY FEATURES</span>
                  <h2>Most Probably Included Best Features Ever</h2>
                  <p>
                    Cloud based storage for your data backup just log in with
                    your mail account from play store and using whatever you
                    want for your business purpose orem ipsum dummy text. Never
                    missyour chance its just began.
                  </p>
                  <p>
                    Cloud based storage for your data backup just log in with
                    your mail account from play store and using whatever you
                    want chance its just began.
                  </p>
                  <div className="btn-box">
                    <a href="pricing.html" className="default-btn">
                      Start Free Trial
                    </a>
                    <a href="features-2.html" className="link-btn">
                      See All Features
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 features-inner-list">
                <div className="row justify-content-center">
                  <div className="col-lg-6 col-sm-6">
                    <div className="features-inner-card">
                      <div className="icon">
                        <i className="ri-eye-line" />
                        <h3>High Resolution</h3>
                      </div>
                      <p>
                        Just log in with your mail account from play store and
                        using whatever you want for your able business purpose.
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-6">
                    <div className="features-inner-card with-box-shadow">
                      <div className="icon">
                        <i className="ri-stack-line" />
                        <h3>Retina Ready Screen</h3>
                      </div>
                      <p>
                        Just log in with your mail account from play store and
                        using whatever you want for your able business purpose.
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-6">
                    <div className="features-inner-card with-box-shadow">
                      <div className="icon">
                        <i className="ri-cloud-line" />
                        <h3>Cloud Storage</h3>
                      </div>
                      <p>
                        Just log in with your mail account from play store and
                        using whatever you want for your able business purpose.
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-6">
                    <div className="features-inner-card">
                      <div className="icon">
                        <i className="ri-leaf-line" />
                        <h3>Easy Editable Data</h3>
                      </div>
                      <p>
                        Just log in with your mail account from play store and
                        using whatever you want for your able business purpose.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Features Area */}
        {/* Start Features Area */}
        <div className="features-area pb-75">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-3 col-lg-3 col-sm-3 col-md-3 col-6">
                <div className="features-box-card">
                  <div className="icon">
                    <i className="ri-smartphone-line" />
                  </div>
                  <h3>User Friendly</h3>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-sm-3 col-md-3 col-6">
                <div className="features-box-card">
                  <div className="icon bg2">
                    <i className="ri-award-line" />
                  </div>
                  <h3>Award Winning App</h3>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-sm-3 col-md-3 col-6">
                <div className="features-box-card">
                  <div className="icon">
                    <i className="ri-fingerprint-line" />
                  </div>
                  <h3>Privacy Protected</h3>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-sm-3 col-md-3 col-6">
                <div className="features-box-card">
                  <div className="icon bg2">
                    <i className="ri-vip-diamond-line" />
                  </div>
                  <h3>Lifetime Update</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Features Area */}
        {/* Start App About Area */}
        <div className="app-about-area pb-100">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-12">
                <div className="app-about-image">
                  <img
                    src="assets/ast/img/more-home/about/about-2.png"
                    alt="disp"
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="app-about-content">
                  <span className="sub-title">ABOUT US</span>
                  <h2>Most Probably You Are Getting Best App Ever</h2>
                  <p>
                    Cloud based storage for your data backup just log in with
                    your mail account from play store and using whatever you
                    want for your business purpose orem ipsum dummy text. Never
                    missyour chance its just began.
                  </p>
                  <ul className="list">
                    <li>
                      <div className="icon bg-3">
                        <i className="ri-award-line" />
                      </div>
                      <h3>Trusted and Reliable</h3>
                      <p>
                        Most provabily best you can trust on it, just log in
                        with your mail account from play store and using
                        whatever you want for your business.
                      </p>
                    </li>
                    <li>
                      <div className="icon bg-3">
                        <i className="ri-download-cloud-2-line" />
                      </div>
                      <h3>Cloud Storage</h3>
                      <p>
                        Just log in with your mail account from play store and
                        using whatever you want for your business purpose.
                      </p>
                    </li>
                  </ul>
                  <div className="btn-box">
                    <a href="app-download.html" className="default-btn">
                      Start Free Trial
                    </a>
                    <a href="features-1.html" className="link-btn">
                      See All Features
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End App About Area */}
        {/* Start Key Features Area */}
        <div className="key-features-area bg-transparent-with-color pt-100 pb-100">
          <div className="container">
            <div className="section-title">
              <span className="sub-title">KEY FEATURES</span>
              <h2>Most Probably Included Best Features Ever</h2>
            </div>
            <div className="row justify-content-center">
              <div className="col-xl-4 col-lg-6 col-sm-6 col-md-6">
                <div className="key-features-card style-two">
                  <div className="icon">
                    <i className="ri-eye-line" />
                  </div>
                  <h3>High Resolution</h3>
                  <p>
                    Just log in with your mail account from play store and using
                    whatever you want for your able business purpose.
                  </p>
                </div>
              </div>
              <div className="col-xl-4 col-lg-6 col-sm-6 col-md-6">
                <div className="key-features-card bg-color-two style-two">
                  <div className="icon bg2">
                    <i className="ri-stack-line" />
                  </div>
                  <h3>Retina Ready Screen</h3>
                  <p>
                    Just log in with your mail account from play store and using
                    whatever you want for your able business purpose.
                  </p>
                </div>
              </div>
              <div className="col-xl-4 col-lg-6 col-sm-6 col-md-6">
                <div className="key-features-card style-two">
                  <div className="icon">
                    <i className="ri-leaf-line" />
                  </div>
                  <h3>Easy Editable Data</h3>
                  <p>
                    Just log in with your mail account from play store and using
                    whatever you want for your able business purpose.
                  </p>
                </div>
              </div>
              <div className="col-xl-4 col-lg-6 col-sm-6 col-md-6">
                <div className="key-features-card bg-color-two style-two">
                  <div className="icon bg2">
                    <i className="ri-secure-payment-line" />
                  </div>
                  <h3>Fully Secured</h3>
                  <p>
                    Just log in with your mail account from play store and using
                    whatever you want for your able business purpose.
                  </p>
                </div>
              </div>
              <div className="col-xl-4 col-lg-6 col-sm-6 col-md-6">
                <div className="key-features-card style-two">
                  <div className="icon">
                    <i className="ri-cloud-line" />
                  </div>
                  <h3>Cloud Storage</h3>
                  <p>
                    Just log in with your mail account from play store and using
                    whatever you want for your able business purpose.
                  </p>
                </div>
              </div>
              <div className="col-xl-4 col-lg-6 col-sm-6 col-md-6">
                <div className="key-features-card bg-color-two style-two">
                  <div className="icon bg2">
                    <i className="ri-pie-chart-2-line" />
                  </div>
                  <h3>Responsive Ready</h3>
                  <p>
                    Just log in with your mail account from play store and using
                    whatever you want for your able business purpose.
                  </p>
                </div>
              </div>
            </div>
            <div className="key-features-btn">
              <a href="app-download.html" className="default-btn">
                Start Free Trial
              </a>
            </div>
          </div>
        </div>
        {/* End Key Features Area */}
        {/* Start App Screenshots Area */}
        <div className="app-screenshots-area ptb-100">
          <div className="container">
            <div className="section-title">
              <span className="sub-title">APP SCREENS</span>
              <h2>Beautifully Crafted All App Screenshots</h2>
            </div>
            <div className="app-screenshots-slides owl-carousel owl-theme">
              <div className="single-screenshot-card">
                <img
                  src="assets/ast/img/more-home/screenshots/screenshots1.png"
                  alt="screenshots"
                />
              </div>
              <div className="single-screenshot-card">
                <img
                  src="assets/ast/img/more-home/screenshots/screenshots2.png"
                  alt="screenshots"
                />
              </div>
              <div className="single-screenshot-card">
                <img
                  src="assets/ast/img/more-home/screenshots/screenshots3.png"
                  alt="screenshots"
                />
              </div>
              <div className="single-screenshot-card">
                <img
                  src="assets/ast/img/more-home/screenshots/screenshots4.png"
                  alt="screenshots"
                />
              </div>
              <div className="single-screenshot-card">
                <img
                  src="assets/ast/img/more-home/screenshots/screenshots5.png"
                  alt="screenshots"
                />
              </div>
              <div className="single-screenshot-card">
                <img
                  src="assets/ast/img/more-home/screenshots/screenshots1.png"
                  alt="screenshots"
                />
              </div>
              <div className="single-screenshot-card">
                <img
                  src="assets/ast/img/more-home/screenshots/screenshots2.png"
                  alt="screenshots"
                />
              </div>
              <div className="single-screenshot-card">
                <img
                  src="assets/ast/img/more-home/screenshots/screenshots3.png"
                  alt="screenshots"
                />
              </div>
              <div className="single-screenshot-card">
                <img
                  src="assets/ast/img/more-home/screenshots/screenshots4.png"
                  alt="screenshots"
                />
              </div>
              <div className="single-screenshot-card">
                <img
                  src="assets/ast/img/more-home/screenshots/screenshots5.png"
                  alt="screenshots"
                />
              </div>
              <div className="single-screenshot-card">
                <img
                  src="assets/ast/img/more-home/screenshots/screenshots1.png"
                  alt="screenshots"
                />
              </div>
              <div className="single-screenshot-card">
                <img
                  src="assets/ast/img/more-home/screenshots/screenshots2.png"
                  alt="screenshots"
                />
              </div>
              <div className="single-screenshot-card">
                <img
                  src="assets/ast/img/more-home/screenshots/screenshots3.png"
                  alt="screenshots"
                />
              </div>
              <div className="single-screenshot-card">
                <img
                  src="assets/ast/img/more-home/screenshots/screenshots4.png"
                  alt="screenshots"
                />
              </div>
              <div className="single-screenshot-card">
                <img
                  src="assets/ast/img/more-home/screenshots/screenshots5.png"
                  alt="screenshots"
                />
              </div>
            </div>
          </div>
        </div>
        {/* End App Screenshots Area */}
        {/* Start App Video Area */}
        <div className="app-video-area pb-100">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-12">
                <div className="app-intro-video-box">
                  <img
                    src="assets/ast/img/more-home/video/video-2.jpg"
                    alt="video-img"
                  />
                  <a
                    href="https://www.youtube.com/watch?v=PWvPbGWVRrU"
                    className="video-btn popup-video"
                  >
                    <i className="ri-play-line" />
                  </a>
                  <div className="intro-video-shape">
                    <img
                      src="assets/ast/img/more-home/video/shape-3.png"
                      alt="disp"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="app-intro-video-content">
                  <span className="sub-title">INTRO VIDEO</span>
                  <h2>Watch Our Most Watched Pakap App Video</h2>
                  <p>
                    Cloud based storage for your data backup just log in with
                    your mail account from play store and using whatever you
                    want for your business purpose orem ipsum dummy text. Never
                    missyour chance its just began. Cloud based storage for your
                    data backup just log in with your mail account from play
                    store and using whatever you want for your business purpose
                    orem ipsum dummy text.Never missyour chance its just began.
                  </p>
                  <a href="contact.html" className="default-btn">
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End App Video Area */}
        {/* Start Gradient Funfacts Area */}
        <div className="gradient-funfacts-area pt-100 pb-75">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-3 col-sm-6 col-md-6">
                <div className="single-funfacts-card">
                  <div className="icon">
                    <i className="ri-download-2-line" />
                  </div>
                  <p>Total Downloads</p>
                  <h3>
                    <span className="odometer" data-count={10}>
                      00
                    </span>
                    <span className="sign">M</span>
                  </h3>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-md-6">
                <div className="single-funfacts-card">
                  <div className="icon">
                    <i className="ri-star-fill" />
                  </div>
                  <p>Total Reviews</p>
                  <h3>
                    <span className="odometer" data-count={799}>
                      00
                    </span>
                    <span className="sign">K</span>
                  </h3>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-md-6">
                <div className="single-funfacts-card">
                  <div className="icon">
                    <i className="ri-global-line" />
                  </div>
                  <p>Worldwide Countries</p>
                  <h3>
                    <span className="odometer" data-count={150}>
                      00
                    </span>
                    <span className="sign">+</span>
                  </h3>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-md-6">
                <div className="single-funfacts-card">
                  <div className="icon">
                    <i className="ri-map-pin-user-line" />
                  </div>
                  <p>Active Users</p>
                  <h3>
                    <span className="odometer" data-count={5}>
                      00
                    </span>
                    <span className="sign">M</span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Gradient Funfacts Area */}
        {/* Start New App Download Area */}
        <div className="new-app-download-wrap-area ptb-100">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-12">
                <div className="new-app-download-content">
                  <span className="sub-title">DOWNLOAD APP</span>
                  <h2>Let's Get Your Free Copy From Apple and Play Store</h2>
                  <p>
                    Instant free download from store Cloud based storage for
                    your data backup just log in with your mail account from
                    play store and using whatever you want for your business
                    purpose orem ipsum dummy text.
                  </p>
                  <div className="btn-box color-wrap">
                    <a href="#/" className="playstore-btn" target="_blank">
                      <img src="assets/ast/img/play-store.png" alt="disp" />
                      Get It On
                      <span>Google Play</span>
                    </a>
                    <a href="#/" className="applestore-btn" target="_blank">
                      <img src="assets/ast/img/apple-store.png" alt="disp" />
                      Download on the
                      <span>Apple Store</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div
                  className="new-app-download-image text-end"
                  data-aos="fade-up"
                >
                  <img
                    src="assets/ast/img/more-home/app-download/download-2.png"
                    alt="app-img"
                  />
                  <div className="download-circle">
                    <img
                      src="assets/ast/img/more-home/app-download/download-circle.png"
                      alt="disp"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="app-download-shape-1">
            <img
              src="assets/ast/img/more-home/app-download/shape-1.png"
              alt="disp"
            />
          </div>
          <div className="app-download-shape-2">
            <img
              src="assets/ast/img/more-home/app-download/shape-2.png"
              alt="disp"
            />
          </div>
        </div>
        {/* End New App Download Area */}
        {/* Start Feedback Wrap Area */}
        <div className="feedback-wrap-area ptb-100">
          <div className="container">
            <div className="section-title">
              <span className="sub-title">CLIENT REVIEWS</span>
              <h2>What Our Customer Say About Us</h2>
            </div>
            <div className="feedback-swiper-wrap-slides swiper-container">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="single-feedback-wrap-item">
                    <div className="rating">
                      <h5>Theme Customization</h5>
                      <div>
                        <i className="ri-star-fill" />
                        <i className="ri-star-fill" />
                        <i className="ri-star-fill" />
                        <i className="ri-star-fill" />
                        <i className="ri-star-fill" />
                      </div>
                    </div>
                    <p>
                      ‘Kiedo is the best digital agency in our area As a midsize
                      software developent company we combine the best of both
                      worlds. We have the focus and speed of the small it
                      outsurcing companies.’
                    </p>
                    <div className="client-info">
                      <img src="assets/ast/img/user/user1.jpg" alt="user" />
                      <div className="title">
                        <h3>Deanna Hodges</h3>
                        <span>Spotify Developer</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="single-feedback-wrap-item">
                    <div className="rating">
                      <h5>Theme Customization</h5>
                      <div>
                        <i className="ri-star-fill" />
                        <i className="ri-star-fill" />
                        <i className="ri-star-fill" />
                        <i className="ri-star-fill" />
                        <i className="ri-star-fill" />
                      </div>
                    </div>
                    <p>
                      ‘Kiedo is the best digital agency in our area As a midsize
                      software developent company we combine the best of both
                      worlds. We have the focus and speed of the small it
                      outsurcing companies.’
                    </p>
                    <div className="client-info">
                      <img src="assets/ast/img/user/user2.jpg" alt="user" />
                      <div className="title">
                        <h3>Deanna Hodges</h3>
                        <span>Spotify Developer</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="single-feedback-wrap-item">
                    <div className="rating">
                      <h5>Theme Customization</h5>
                      <div>
                        <i className="ri-star-fill" />
                        <i className="ri-star-fill" />
                        <i className="ri-star-fill" />
                        <i className="ri-star-fill" />
                        <i className="ri-star-fill" />
                      </div>
                    </div>
                    <p>
                      ‘Kiedo is the best digital agency in our area As a midsize
                      software developent company we combine the best of both
                      worlds. We have the focus and speed of the small it
                      outsurcing companies.’
                    </p>
                    <div className="client-info">
                      <img src="assets/ast/img/user/user3.jpg" alt="user" />
                      <div className="title">
                        <h3>Deanna Hodges</h3>
                        <span>Spotify Developer</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Add Pagination */}
              <div className="swiper-button-next" data-aos="fade-right" />
              <div className="swiper-button-prev" data-aos="fade-left" />
            </div>
          </div>
        </div>
        {/* End Feedback Wrap Area */}
        {/* Start App Pricing Area */}
        <div className="app-pricing-area pt-100 pb-75">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-4 col-md-12">
                <div className="app-pricing-section-title">
                  <span className="sub-title">PRICING TABLE</span>
                  <h2>No Hidden Charge Applied, Choose Your Plan</h2>
                  <a href="pricing.html">See All Pricing Plan</a>
                </div>
              </div>
              <div className="col-lg-8 col-md-12">
                <div className="row align-items-center">
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="single-app-pricing-box with-border-radius">
                      <div className="title">
                        <h3>Small Team</h3>
                        <p>Powerful &amp; awesome elements</p>
                      </div>
                      <span className="popular">Most Popular</span>
                      <div className="price">
                        $59 <span>/Month</span>
                      </div>
                      <div className="pricing-btn">
                        <a href="#/" className="default-btn">
                          Purchase Plan
                        </a>
                      </div>
                      <ul className="features-list">
                        <li>
                          <i className="ri-check-line" /> Up to 10 Website
                        </li>
                        <li>
                          <i className="ri-check-line" /> Lifetime free Support
                        </li>
                        <li>
                          <i className="ri-check-line" /> 10 GB Dedicated
                          Hosting free
                        </li>
                        <li>
                          <i className="ri-check-line" /> 24/7 Hours Support
                        </li>
                        <li>
                          <i className="ri-check-line" /> SEO Optimized
                        </li>
                        <li>
                          <i className="ri-check-line" /> Live Support
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="single-app-pricing-box with-border-radius">
                      <div className="title">
                        <h3>Business</h3>
                        <p>Powerful &amp; awesome elements</p>
                      </div>
                      <div className="price">
                        $69 <span>/Month</span>
                      </div>
                      <div className="pricing-btn">
                        <a href="#/" className="default-btn">
                          Purchase Plan
                        </a>
                      </div>
                      <ul className="features-list">
                        <li>
                          <i className="ri-check-line" /> Up to 10 Website
                        </li>
                        <li>
                          <i className="ri-check-line" /> Lifetime free Support
                        </li>
                        <li>
                          <i className="ri-check-line" /> 10 GB Dedicated
                          Hosting free
                        </li>
                        <li>
                          <i className="ri-check-line" /> 24/7 Hours Support
                        </li>
                        <li>
                          <i className="ri-check-line" /> SEO Optimized
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End App Pricing Area */}
        {/* Start Blog Wrap Area */}
        <div className="blog-area pb-75">
          <div className="container">
            <div className="section-title">
              <span className="sub-title">BLOG POST</span>
              <h2>Latest Article From Our Blog</h2>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6">
                <div className="single-blog-wrap-post">
                  <div className="image">
                    <a href="blog-details.html" className="d-block">
                      <img
                        src="assets/ast/img/more-home/blog/blog-1.jpg"
                        alt="blog"
                      />
                    </a>
                    <a href="blog-grid.html" className="tag">
                      Branding
                    </a>
                  </div>
                  <div className="content">
                    <ul className="meta">
                      <li>
                        <i className="ri-time-line" /> April 14, 2021
                      </li>
                      <li>
                        <i className="ri-message-2-line" />{" "}
                        <a href="blog-details.html">(0) Comment</a>
                      </li>
                    </ul>
                    <h3>
                      <a href="blog-details.html">
                        Branding involves developing strategy to create a point
                        of differentiation
                      </a>
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="single-blog-wrap-post">
                  <div className="image">
                    <a href="blog-details.html" className="d-block">
                      <img
                        src="assets/ast/img/more-home/blog/blog-2.jpg"
                        alt="blog"
                      />
                    </a>
                    <a href="blog-grid.html" className="tag">
                      Agency
                    </a>
                  </div>
                  <div className="content">
                    <ul className="meta">
                      <li>
                        <i className="ri-time-line" /> April 13, 2021
                      </li>
                      <li>
                        <i className="ri-message-2-line" />{" "}
                        <a href="blog-details.html">(4) Comment</a>
                      </li>
                    </ul>
                    <h3>
                      <a href="blog-details.html">
                        Design is a plan or specification for the construction
                        of an object
                      </a>
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="single-blog-wrap-post">
                  <div className="image">
                    <a href="blog-details.html" className="d-block">
                      <img
                        src="assets/ast/img/more-home/blog/blog-3.jpg"
                        alt="blog"
                      />
                    </a>
                    <a href="blog-grid.html" className="tag">
                      Marketing
                    </a>
                  </div>
                  <div className="content">
                    <ul className="meta">
                      <li>
                        <i className="ri-time-line" /> April 12, 2021
                      </li>
                      <li>
                        <i className="ri-message-2-line" />{" "}
                        <a href="blog-details.html">(2) Comment</a>
                      </li>
                    </ul>
                    <h3>
                      <a href="blog-details.html">
                        Branding involves developing strategy to create a point
                      </a>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Blog Wrap Area */}
        {/* Start Partner Area */}
        <div className="partner-area pb-100">
          <div className="container">
            <div className="partner-title">
              Trusted by world famous companies:
            </div>
            <div className="partner-slides owl-carousel owl-theme">
              <div className="partner-item">
                <a href="#/" className="d-block">
                  <img src="assets/ast/img/partner/partner3.png" alt="disp" />
                </a>
              </div>
              <div className="partner-item">
                <a href="#/" className="d-block">
                  <img src="assets/ast/img/partner/partner4.png" alt="disp" />
                </a>
              </div>
              <div className="partner-item">
                <a href="#/" className="d-block">
                  <img src="assets/ast/img/partner/partner1.png" alt="disp" />
                </a>
              </div>
              <div className="partner-item">
                <a href="#/" className="d-block">
                  <img src="assets/ast/img/partner/partner2.png" alt="disp" />
                </a>
              </div>
              <div className="partner-item">
                <a href="#/" className="d-block">
                  <img src="assets/ast/img/partner/partner5.png" alt="disp" />
                </a>
              </div>
              <div className="partner-item">
                <a href="#/" className="d-block">
                  <img src="assets/ast/img/partner/partner6.png" alt="disp" />
                </a>
              </div>
              <div className="partner-item">
                <a href="#/" className="d-block">
                  <img src="assets/ast/img/partner/partner7.png" alt="disp" />
                </a>
              </div>
              <div className="partner-item">
                <a href="#/" className="d-block">
                  <img src="assets/ast/img/partner/partner8.png" alt="disp" />
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* End Partner Area */}
        {/* Start Footer Wrap Area */}
        <Footer />
        {/* End Footer Wrap Area */}
        <div className="go-top">
          <i className="ri-arrow-up-s-line" />
        </div>
      </div>
    </>
  );
};

export default Home;
