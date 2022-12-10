import React from 'react'

const PricingSection = () => {
    return (
        <div className="app-pricing-area pt-100 pb-75">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-4 col-md-12">
                        <div className="app-pricing-section-title">
                            <span className="sub-title">PRICING TABLE</span>
                            <h2 style={{ fontWeight: "bold" }}>
                                No Hidden Charge Applied, Choose Your Plan
                            </h2>
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
    )
}

export default PricingSection