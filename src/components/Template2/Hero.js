import React from "react";
import "./hero.css";
const Hero = ({ data }) => {
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-12 col-lg-5 image-wrapper">
            <img
              className="w-100"
              src="/assets/temp2/assets/images/features2.jpg"
              alt="Mobirise Website Builder"
            />
          </div>
          <div className="col-12 col-lg col-md-12">
            <div className="text-wrapper align-left">
              <h1 className="mbr-section-title mbr-fonts-style mb-4 display-1">
                <strong>Instagram Social Media Influencer</strong>
              </h1>
              <p className="mbr-text mbr-fonts-style display-7">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                egestas massa vel nulla gravida pulvinar. Pellentesque habitant
                morbi tristique senectus et netus et malesuada egestas.
              </p>
              <div className="mbr-section-btn mt-3">
                <a
                  className="btn btn-lg btn-secondary display-7"
                  href="https://mobiri.se/"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
