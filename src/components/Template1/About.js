import React from "react";

const About = ({ data }) => {
  return (
    <section id="about">
      <div className="wrapper gray-wrapper">
        <div className="container inner">
          <h2 className="section-title text-center">About Me</h2>
          <div className="space20" />
          <div className="row">
            <div className="col-md-6">
              <figure>
                <img src={data.images[0]["url"]} alt="" />
              </figure>
            </div>

            <div className="space30 hidden-xs hidden-md hidden-lg" />
            <div className="col-md-6">
              <blockquote className="border">
                <p>{data.aboutme}</p>
              </blockquote>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur
                et. Nullam id dolor id nibh ultricies vehicula ut id elit. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
                dolor sit amet, consectetur adipiscing elit. Donec ullamcorper
                nulla non.
              </p>
            </div>
          </div>

          <div className="space70" />
          <div className="row">
            <div className="col-sm-4">
              <h3>Achievenemt</h3>
              <p className="lead">{data.achievenemt}</p>
            </div>

            <div className="col-sm-4">
              <h3>Why Choose Me?</h3>
              <p>{data.whychooseme}</p>
            </div>
          </div>

          <div className="space10" />
        </div>
      </div>
    </section>
  );
};

export default About;
