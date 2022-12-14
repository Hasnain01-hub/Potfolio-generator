import React from "react";
import "./hero.css";
const Hero = ({ data }) => {
  return (
    <>
      <div className="page-banner home-banner">
        <div className="container h-100">
          <div className="row align-items-center h-100">
            <div className="col-lg-6 py-3 wow fadeInUp">
              <h1 className="mb-4 capitalize">{data.name}</h1>
              <p className="text-lg mb-5">{data.profession}</p>

              <a href="#" className="text-secondary  btn-outline border btn ">
                More Info
              </a>
              <a href="#" className="btn btn-primary btn-split ml-2">
                Watch Video{" "}
                <div className="fab">
                  <span className="mai-play"></span>
                </div>
              </a>
            </div>
            <div className="col-lg-6 py-3 wow zoomIn">
              <div className="img-place">
                <img className="img-fluid" src={data.images[1]["url"]} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
