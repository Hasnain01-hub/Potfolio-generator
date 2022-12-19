import React from "react";
import "./image.css";
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
              <div className="splatted " style={{ margin: "0 auto" }}>
                <div
                  class="splatted__image"
                  style={{
                    "--hue": "110",
                    "--hover-rotate": "-10",
                    "--active-rotate": "-30",
                    "--hover-scale": "1.15",
                    "--active-scale": "0.75",
                    backgroundImage: "url(" + data.images[0]["url"] + ")",
                  }}
                >
                  <img src={data.images[0]["url"]} alt="Mobirise" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
