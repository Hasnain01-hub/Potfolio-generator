import React from 'react'

const TestimonialSection = () => {
    return (
        <div className="feedback-wrap-area ptb-100">
            <div className="container">
                <div className="section-title">
                    <span className="sub-title">CLIENT REVIEWS</span>
                    <h2 style={{ fontWeight: "bold" }}>
                        What Our Customer Say About Us
                    </h2>
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
                    <div className="swiper-button-next" data-aos="fade-right" />
                    <div className="swiper-button-prev" data-aos="fade-left" />
                </div>
            </div>
        </div>
    )
}

export default TestimonialSection