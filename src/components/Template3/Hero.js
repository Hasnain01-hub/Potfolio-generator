import React from "react";

const Hero = ({ data }) => {
  return (
    <>
      <section className="cid-rGsOE1E5qe" id="header1-1k">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 content align-left py-4 col-lg-5 ">
              <h1 className="mbr-section-title align-left mbr-bold pb-3 mbr-fonts-style display-2">
                {data.name}
              </h1>
              <p className="mbr-text pb-3 align-left mbr-fonts-style display-7">
                {" "}
                {data.profession}
              </p>
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
