import React from 'react'

const KeyFeaturesSection = () => {
    return (
        <>
            <div className="features-area pt-100 pb-75">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-12">
                            <div className="features-inner-content">
                                <span className="sub-title">KEY FEATURES</span>
                                <h2 style={{ fontWeight: "bold" }}>
                                    Most Probably Included Best Features Ever
                                </h2>
                                <p>
                                    Without writing any code bulit your portfolio within few
                                    click.
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
                                            <h3>Responsive Design</h3>
                                        </div>
                                        <p>
                                            The design of the templete will be adjusted according to
                                            the any screen size.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-sm-6">
                                    <div className="features-inner-card with-box-shadow">
                                        <div className="icon">
                                            <i className="ri-stack-line" />
                                            <h3>Easily deploy</h3>
                                        </div>
                                        <p>Automatically deploy your portfolio to the cloud.</p>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-sm-6">
                                    <div className="features-inner-card with-box-shadow">
                                        <div className="icon">
                                            <i className="ri-cloud-line" />
                                            <h3>Cloud Storage</h3>
                                        </div>
                                        <p>
                                            Cloud based storage for your data backup just log in
                                            with your gmail account and choose whatever template you
                                            want for your business purpose.
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
                                            Easily manage your content with our easy to use
                                            dashboard.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
                                    <i className="ri-code-line" />
                                </div>
                                <h3>Codeless</h3>
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
        </>
    )
}

export default KeyFeaturesSection