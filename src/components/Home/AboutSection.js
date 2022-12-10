import React from 'react'

const AboutSection = () => {
    return (
        <div className="app-about-area pb-100">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-12">
                        <div className="app-about-image">
                            <img
                                src="assets/ast/img/more-home/about/abouts.png"
                                alt="disp"
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <div className="app-about-content">
                            <span className="sub-title">ABOUT US</span>
                            <h2 style={{ fontWeight: "bold" }}>
                                Most Probably You Are Getting Best Service Ever
                            </h2>
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
    )
}

export default AboutSection