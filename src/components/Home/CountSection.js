import React from 'react'

const CountSection = () => {
    return (
        <div className="gradient-funfacts-area pt-100 pb-75">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-3 col-sm-6 col-md-6">
                        <div className="single-funfacts-card">
                            <div className="icon">
                                <i class="ri-server-fill"></i>
                            </div>
                            <p>Portfolio Hosted</p>
                            <h3>
                                <span className="odometer" data-count={200}>
                                    00
                                </span>
                                <span className="sign">+</span>
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
                                <span className="odometer" data-count={2}>
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
                                <span className="odometer" data-count={10}>
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
                                <span className="sign">k</span>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CountSection