import React from "react";

const Footer = ({ data }) => {
  return (
    <>
      <section className="features1 cid-rGtBD2aWsp" id="map1-39">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 svg-col col-lg-8">
              <svg
                width="100%"
                height="100%"
                preserveAspectRatio="none"
                viewBox="0 0 600 355"
                style={{}}
              >
                <path
                  fill="red"
                  d="M-12.90108,-24.49671L-33.23076,13.96482C44.79122,45.83296 142.04396,30.44834 222.8132,16.71208C303.58244,2.97582 334.35167,35.94286 352.48354,72.20659C370.61541,108.47032 384.90111,119.45933 437.64838,130.44835C490.39564,141.43736 499.18684,144.18462 518.41761,164.51429C537.64839,184.84395 539.82415,209.11209 532.41759,235.16484C525.01102,261.21758 500.81316,277.79341 491.75824,284.61539C482.70332,291.43736 462.90108,303.06814 437.91209,306.04396C412.9231,309.01978 407.40657,311.3099 353.2967,307.14286C299.18683,302.97582 292.02196,305.26594 268.68132,306.59341C245.34068,307.92088 228.85716,312.31647 172.8132,320.00879C116.76924,327.70111 84.35166,337.04177 44.79122,334.84396C5.23078,332.64615 -11.27474,328.89231 -32.96704,323.62638C-54.65933,318.36044 -31.03296,380.44836 -30.76923,380.21978C-31.03296,380.44836 152.48353,393.08572 154.68134,392.53627C156.87914,391.98682 504.68135,393.63517 504.3956,393.40659C504.68135,393.63517 659.07696,385.39341 658.79121,385.16484C659.07696,385.39341 642.59344,177.7011 644.24179,174.40439C645.89014,171.10769 638.19784,20.00878 637.09894,9.01977C636.00003,-1.96924 643.69234,-47.57364 625.56047,-48.67254C607.4286,-49.77144 280.50552,-39.33188 279.95606,-40.43078C279.40661,-41.52968 208.52748,-28.34287 153.58243,-32.18902C98.63738,-36.03518 42.04397,-29.44177 -12.90108,-24.49671z"
                  id="svg_10"
                  className
                />
              </svg>
              <div className="google-map">
                <iframe
                  title="Frame"
                  frameBorder={0}
                  style={{ border: 0 }}
                  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAEIpgj38KyLFELm2bK9Y7krBkz1K-cMq8&q=place_id:ChIJn6wOs6lZwokRLKy1iqRcoKw"
                  allowFullScreen
                />
              </div>
            </div>
            <div className="card col-12 col-md-6 col-lg-5 card-col m-auto">
              <div className="card-head">
                <img src={data.images[0]["url"]} alt="" title />
              </div>
              <div className="card-wrapper">
                <div className="item">
                  <div className="card-img">
                    <span className="mbr-iconfont mbrib-pin" />
                  </div>
                  <div className="card-box">
                    <h4 className="card-title mbr-bold mbr-fonts-style display-5">
                      Address
                    </h4>
                    <p className="mbr-text pb-3 mbr-fonts-style display-4">
                      {data.location}
                    </p>
                  </div>
                </div>
                <div className="item">
                  <div className="card-img">
                    <span className="mbr-iconfont mbrib-alert" />
                  </div>
                  <div className="card-box">
                    <h4 className="card-title mbr-bold mbr-fonts-style display-5">
                      Telephone
                    </h4>
                    <p className="mbr-text pb-3 mbr-fonts-style display-4">
                      {data.phone}
                      <br />
                    </p>
                  </div>
                </div>
                <div className="item">
                  <div className="card-img">
                    <span className="mbr-iconfont mbrib-letter" />
                  </div>
                  <div className="card-box">
                    <h4 className="card-title mbr-bold mbr-fonts-style display-5">
                      E-mail
                    </h4>
                    <p className="mbr-text pb-3 mbr-fonts-style display-4">
                      {data.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="form cid-rGtBGu0BpJ" id="footer2-3a">
        <div className="container">
          <div className="row">
            <div className="col-md-6 title-col align-left col-lg-3">
              <div className="item-wrap pb-4">
                <div className="icons-wrap">
                  <img
                    src="/assets/temp3/assets/images/logo24.png"
                    alt="Mobirise"
                  />
                  <h2 className="title1 align-left p-0 mbr-bold mbr-fonts-style display-5">
                    {data.name}
                  </h2>
                </div>
              </div>
              <div className="socicon-wrap">
                <a href={data.instagram}>
                  <span className="mbr-iconfont  socicon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0-2a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm6.5-.25a1.25 1.25 0 0 1-2.5 0 1.25 1.25 0 0 1 2.5 0zM12 4c-2.474 0-2.878.007-4.029.058-.784.037-1.31.142-1.798.332-.434.168-.747.369-1.08.703a2.89 2.89 0 0 0-.704 1.08c-.19.49-.295 1.015-.331 1.798C4.006 9.075 4 9.461 4 12c0 2.474.007 2.878.058 4.029.037.783.142 1.31.331 1.797.17.435.37.748.702 1.08.337.336.65.537 1.08.703.494.191 1.02.297 1.8.333C9.075 19.994 9.461 20 12 20c2.474 0 2.878-.007 4.029-.058.782-.037 1.309-.142 1.797-.331.433-.169.748-.37 1.08-.702.337-.337.538-.65.704-1.08.19-.493.296-1.02.332-1.8.052-1.104.058-1.49.058-4.029 0-2.474-.007-2.878-.058-4.029-.037-.782-.142-1.31-.332-1.798a2.911 2.911 0 0 0-.703-1.08 2.884 2.884 0 0 0-1.08-.704c-.49-.19-1.016-.295-1.798-.331C14.925 4.006 14.539 4 12 4zm0-2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2z" />
                    </svg>
                  </span>
                </a>
                <a href={data.youtube}>
                  <span className="mbr-iconfont socicon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <h2 className="title align-left mbr-bold pb-2 mbr-fonts-style display-5">
                About
              </h2>
              <div className="align-wrap align-left">
                <div className="item-wrap">
                  <div className="icons-wrap pb-2">
                    <span className="mbr-iconfont mbrib-clock" />
                    <h3 className="icon-title mbr-regular mbr-fonts-style display-4">
                      Mon - Sun: 8AM - 8PM
                    </h3>
                  </div>
                </div>
                <br />
                <div className="item-wrap">
                  <div className="icons-wrap pb-2">
                    <span className="mbr-iconfont mbrib-key" />
                    <h3 className="icon-title align-left mbr-regular mbr-fonts-style display-4">
                      {data.phone}&nbsp;&nbsp;
                    </h3>
                  </div>
                </div>
                <div className="item-wrap">
                  <div className="icons-wrap pb-2">
                    <span className="mbr-iconfont mbrib-pin" />
                    <h3 className="icon-title align-left mbr-regular mbr-fonts-style display-4">
                      {data.location}
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            {/* <div
              className="col-md-6 col-lg-3 mbr-form"
              data-form-type="formoid"
            >
              <form
                action="https://mobirise.com/"
                method="POST"
                className="mbr-form form-with-styler"
                data-form-title="Form Name"
              >
                <input
                  type="hidden"
                  name="email"
                  data-form-email="true"
                  defaultValue="gCmPNu6fJen+flhLjufigRL0Ut65QAgyydyucCdcB/k2FxT7UzlvzGi1pmJ3qbCUGsp3JAAfcL7EJCZSxq7oW9siHx8omkpAmIJBi1NK/XWYhj+83h6lU4L5tcCyBKuc.13yppxpng5ASZgxRMyemCCbKMPS9KsKNh4k7suiZjjscO7nUVneN4MD4VqUjWdYIFJyWHSsw7flxuNRgRjqmtTVkjh8y9qtmhKVw+yVKFZAzhuAyD9qO6slqO6Xgf61j"
                />
                <h2 className="title align-left mbr-bold pb-2 mbr-fonts-style display-5">
                  Newsletter
                </h2>
                <div className="form-row">
                  <div
                    hidden="hidden"
                    data-form-alert
                    className="alert alert-success col-12"
                  >
                    Thanks for filling out the form!
                  </div>
                  <div
                    hidden="hidden"
                    data-form-alert-danger
                    className="alert alert-danger col-12"
                  >
                    Oops...! some problem!
                  </div>
                </div>
                <div className="dragArea form-row">
                  <div
                    className="col-lg-12 col-md-12 col-sm-12 form-group"
                    data-for="email"
                  >
                    <input
                      type="email"
                      name="email"
                      placeholder="Your email"
                      data-form-field="email"
                      className="form-control display-7"
                      defaultValue
                      id="email-footer2-3a"
                    />
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <button type="submit" className="btn btn-primary display-4">
                      SUBSCRIBE
                    </button>
                  </div>
                </div>
              </form>
            </div> */}
          </div>
        </div>
      </section>
      <section className="cid-rGsJ0Syn9D" id="footer1-1b">
        <div className="container">
          <div className="media-container-row align-center mbr-white">
            <div className="col-12">
              <p className="mbr-text mb-0 mbr-fonts-style display-7">
                © Copyright 2019 Mobirise - All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
