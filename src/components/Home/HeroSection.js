import React from 'react'

const HeroSection = () => {
    return (
            <div className="new-app-main-banner-wrap-area">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-12">
                            <div className="new-app-main-banner-wrap-content">
                                <span className="sub-title">
                                    #Get Your 14 Days Free Trial
                                </span>
                                <h1 style={{ fontWeight: "bold" }}>
                                    Create your portfoliio within a click
                                </h1>
                                <p>
                                    choose from 5+ pre-made templates and create your portfolio
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

                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <div
                                className="new-app-main-banner-wrap-image"
                                data-aos="fade-left"
                                data-aos-duration={2000}
                            >
                                <img
                                    src="assets/ast/img/more-home/banner/front.png"
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
    )
}

export default HeroSection