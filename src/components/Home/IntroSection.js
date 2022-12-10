import React from 'react'

const IntroSection = () => {
    return (
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
                            <h2 style={{ fontWeight: "bold" }}>
                                Get familar with our dashboard
                            </h2>
                            <p>
                                Stuck any where?? watch the video and get familar with our
                                app.
                            </p>
                            <a href="contact.html" className="default-btn">
                                Get Started
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IntroSection