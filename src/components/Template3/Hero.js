import React from "react";

const Hero = ({ data }) => {
  return (
    <>
      <section className="cid-rGsOE1E5qe" id="header1-1k">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 content align-left py-4 col-lg-5 ">
              <h1 className="mbr-section-title align-left mbr-bold pb-3 mbr-fonts-style display-2">
                Pets Training School
              </h1>
              <p className="mbr-text pb-3 align-left mbr-fonts-style display-7">
                {" "}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu
                dui non diam eleifend egestas id a ligula.
              </p>
              <div className="align-wrap align-left">
                <div className="icons-wrap">
                  <div className="icon-wrap">
                    <span className="mbr-iconfont mbrib-apple" />
                    <h3 className="icon-title mbr-bold mbr-fonts-style display-7">
                      EAT
                    </h3>
                  </div>
                  <div className="icon-wrap">
                    <span className="mbr-iconfont mbrib-globe" />
                    <h3 className="icon-title mbr-bold mbr-fonts-style display-7">
                      PLAY
                    </h3>
                  </div>
                  <div className="icon-wrap">
                    <span className="mbr-iconfont mbrib-github" />
                    <h3 className="icon-title mbr-bold mbr-fonts-style display-7">
                      BRUSH
                    </h3>
                  </div>
                </div>
              </div>
              <div className="align-left mbr-section-btn">
                <a
                  className="btn btn-md btn-primary display-4"
                  href="https://mobirise.co/"
                >
                  VIEW MORE
                </a>{" "}
                <a
                  className="btn btn-md btn-primary-outline display-4"
                  href="https://mobirise.co/"
                >
                  BOOK NOW
                </a>
              </div>
            </div>
            <div className="col-md-12 col-lg-7 img-col">
              <div className="mbr-figure">
                <img src="/assets/temp3/assets/images/07.png" alt="Mobirise" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
