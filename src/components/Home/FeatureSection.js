import React from 'react'

const FeatureSection = () => {
    return (
        <div className="key-features-area bg-transparent-with-color pt-100 pb-100">
            <div className="container">
                <div className="section-title">
                    <span className="sub-title">FEATURES</span>
                    <h2 style={{ fontWeight: "bold" }}>
                        Most Probably Included Best Features Ever
                    </h2>
                </div>
                <div className="row justify-content-center">
                    <div className="col-xl-4 col-lg-6 col-sm-6 col-md-6">
                        <div className="key-features-card style-two">
                            <div className="icon">
                                <i className="ri-eye-line" />
                            </div>
                            <h3>Codeless</h3>
                            <p>
                                Without writing any code bulit your portfolio within few
                                click.
                            </p>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-sm-6 col-md-6">
                        <div className="key-features-card bg-color-two style-two">
                            <div className="icon bg2">
                                <i className="ri-stack-line" />
                            </div>
                            <h3>Easily deploy</h3>
                            <p>Automatically deploy your portfolio to the cloud.</p>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-sm-6 col-md-6">
                        <div className="key-features-card style-two">
                            <div className="icon">
                                <i className="ri-leaf-line" />
                            </div>
                            <h3>Easy Editable Data</h3>
                            <p>
                                Easily manage your content with our easy to use dashboard.
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
                                It encrypts your data and keeps it safe from unauthorized
                                access.
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
                                Cloud based storage for your data backup just log in with
                                your gmail account and choose whatever template you want for
                                your business purpose.
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
                                The design of the templete will be adjusted according to the
                                any screen size.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default FeatureSection