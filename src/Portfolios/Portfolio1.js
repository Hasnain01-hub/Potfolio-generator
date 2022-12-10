import React from "react";
import { useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";
const userData = {
  name: "John Doe",
  profession:
    "I specialize in fashion, advertorial, black &amp; white photography",
  email: "demo@example.com",
  achievenemt:
    "“Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nullam id dolor id nibh  ultricies vehicula ut id elit. Cum sociis natoque penatibus.”",
  images: [
    { url: "/assets/images/art/about8.jpg" },
    { url: "/assets/images/art/about8.jpg" },
  ],
  about:
    "“Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nullam id dolor id nibh  ultricies vehicula ut id elit. Cum sociis natoque penatibus.”",
  loaction: "India",
  phone: "1234567890",
  whychooseme:
    "Duis mollis, est non commodo luctus, nisi porttitor ligula, eget lacinia odio sem nec elit. Aenean eu leo quam. Pellentesque ornare sem lacinia quam.",
  youtube: "www.youtube.com",
  instagram: "www.instagram.com",
  id: "1",
};
const Portfolio1 = () => {
  const { postfoliodata } = useSelector((state) => ({ ...state }));
  // const { user } = useSelector((state) => ({ ...state }));
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    if (postfoliodata && postfoliodata.id) {
      setData(postfoliodata);
      setLoading(true);
    } else {
      setData(userData);
      setLoading(true);
    }
  }, [postfoliodata]);
  return (
    <>
      {loading ? (
        <div>
          {console.log(data)}
          <div className="content-wrapper">
            <nav className="navbar center wide absolute dark-wrapper bg-opacity-dark inverse-text">
              <div className="flex-it">
                <div className="navbar-header align-left">
                  <div className="navbar-brand">
                    <img
                      src="#"
                      srcSet="/assets/images/logo2.png 1x, /assets/images/logo2@2x.png 2x"
                      alt=""
                    />
                  </div>
                  <div className="nav-bars-wrapper">
                    <div className="nav-bars-inner">
                      <div
                        className="nav-bars"
                        data-toggle="collapse"
                        data-target=".navbar-collapse"
                      >
                        <span />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="align-center flex-it">
                  <div className="navbar-collapse collapse">
                    <ul className="nav navbar-nav">
                      <li>
                        <a href="#home" className="scroll">
                          Home
                        </a>{" "}
                      </li>

                      {/* <li>
                        <a href="#fashion" className="scroll">
                          Fashion
                        </a>{" "}
                      </li> */}

                      <li>
                        <a href="#about" className="scroll">
                          About
                        </a>{" "}
                      </li>
                      <li>
                        <a href="#contact" className="scroll">
                          Contact
                        </a>{" "}
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="align-right text-right">
                  <ul className="social social-color social-s">
                    <li>
                      <a href={data.youtube}>
                        <i className="et-youtube" />
                      </a>
                    </li>
                    <li>
                      <a href={data.instagram}>
                        <i className="et-instagram" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <section id="home">
              <div className="rev_slider_wrapper fullscreen-container">
                <div
                  id="slider7"
                  className="rev_slider fullscreenbanner rs-nav-light"
                  data-version="5.4.1"
                >
                  <ul>
                    <li data-transition="fade" data-nav-color="dark">
                      <img
                        src="/assets/images/art/sliderbg41.jpg"
                        alt=""
                        data-bgposition="center center"
                        data-kenburns="on"
                        data-duration={10000}
                        data-ease="Power1.easeOut"
                        data-scalestart={110}
                        data-scaleend={100}
                        data-rotatestart={0}
                        data-rotateend={0}
                        data-offsetstart="0 0"
                        data-offsetend="0 0"
                        className="rev-slidebg"
                        data-no-retina
                      />
                      <div
                        className="tp-caption w-regular color-white text-center"
                        data-x="left"
                        data-hoffset="['610','510','410','230']"
                        data-y="middle"
                        data-voffset="['-110','-110','-110','-110']"
                        data-fontsize="['40','40','30','20']"
                        data-lineheight="['50','50','40','30']"
                        data-width="['450','450','380','230']"
                        data-whitespace="['normal','normal','normal','normal']"
                        data-frames='[{"delay":"+490","speed":2000,"frame":"0","from":"x:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;","mask":"x:[-100%];y:0px;s:inherit;e:inherit;","to":"o:1;","ease":"Power4.easeInOut"},{"delay":"wait","speed":750,"frame":"999","to":"x:[-100%];opacity:1;","mask":"x:[100%];y:0;s:inherit;e:inherit;","ease":"Power4.easeInOut"}]'
                        data-responsive="on"
                        data-responsive_offset="on"
                        style={{ zIndex: 9 }}
                      >
                        {data.name}
                      </div>
                      <div
                        className="tp-caption w-light color-white text-center"
                        data-x="left"
                        data-hoffset="['610','510','410','230']"
                        data-y="middle"
                        data-voffset="['0','0','0','0']"
                        data-fontsize="['26','26','22','18']"
                        data-lineheight="['36','36','32','28']"
                        data-width="['450','450','380','230']"
                        data-whitespace="['normal','normal','normal','normal']"
                        data-frames='[{"delay":"+490","speed":2000,"frame":"0","from":"x:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;","mask":"x:[-100%];y:0px;s:inherit;e:inherit;","to":"o:1;","ease":"Power4.easeInOut"},{"delay":"wait","speed":750,"frame":"999","to":"x:[-100%];opacity:1;","mask":"x:[100%];y:0;s:inherit;e:inherit;","ease":"Power4.easeInOut"}]'
                        data-responsive="on"
                        data-responsive_offset="on"
                        style={{ zIndex: 9 }}
                      >
                        {data.profession}
                      </div>
                    </li>
                  </ul>
                  <div className="tp-bannertimer tp-bottom" />
                </div>
              </div>
            </section>

            {/* <section id="black-white">
              <div className="wrapper light-wrapper">
                <div className="container inner pb-40">
                  <h2 className="section-title text-center">
                    Black &amp; White Photograpy
                  </h2>
                  <p className="lead text-center mb-0">
                    I take photographs with creativity, concept and passion
                  </p>
                </div>

                <div class="carousel slide" id="myCarousel">
                  <div class="carousel-inner">
                    {data.images.map((img) => {
                      return (
                        <div class="item active">
                          <div class="col-xs-2">
                            <div>
                              <img src={img.url} class="img-responsive" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <a
                      class="left carousel-control"
                      href="#myCarousel"
                      data-slide="prev"
                    >
                      <i class="glyphicon glyphicon-chevron-left"></i>
                    </a>
                    <a
                      class="right carousel-control"
                      href="#myCarousel"
                      data-slide="next"
                    >
                      <i class="glyphicon glyphicon-chevron-right"></i>
                    </a>
                  </div>
                </div>

                <div className="space90" />
              </div>
            </section> */}
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
                      <p>{data.about}</p>
                      <blockquote className="border">
                        <p>
                          “Praesent commodo cursus magna, vel scelerisque nisl
                          consectetur et. Nullam id dolor id nibh ultricies
                          vehicula ut id elit. Cum sociis natoque penatibus.”
                        </p>
                      </blockquote>
                      <p>
                        Praesent commodo cursus magna, vel scelerisque nisl
                        consectetur et. Nullam id dolor id nibh ultricies
                        vehicula ut id elit. Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Donec ullamcorper nulla
                        non.
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
                      {/* <ol>
                        <li>Vivamus sagittis lacus vel augue laoreet.</li>
                        <li>Cras mattis consectetur purus sit amet.</li>
                        <li>Vestibulum id ligula porta felis euismod.</li>
                      </ol> */}
                    </div>
                  </div>

                  <div className="space10" />
                </div>
              </div>
            </section>
            <section id="contact">
              <div className="wrapper light-wrapper">
                <div className="container inner">
                  <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                      <h2 className="section-title text-center">
                        Get in Touch
                      </h2>

                      <div className="space30" />
                      <div className="row text-center">
                        <div className="col-sm-4">
                          {" "}
                          <span className="icon icon-color icon-m mb-5">
                            <i className="si-camping_map" />
                          </span>
                          <p>
                            {data.loaction ??
                              "123, Street, City, State, Country"}
                          </p>
                        </div>

                        <div className="col-sm-4">
                          {" "}
                          <span className="icon icon-color icon-m mb-5">
                            <i className="si-phone_phone-ringing" />
                          </span>
                          <p>{`+91 ${data.phone}` ?? "+91 1234567890"}</p>
                        </div>

                        <div className="col-sm-4">
                          {" "}
                          <span className="icon icon-color icon-m mb-5">
                            <i className="si-mail_mail-2" />
                          </span>
                          <p>
                            <a
                              className="nocolor"
                              href={`mailto:${data.email}`}
                            >
                              <span
                                className="__cf_email__"
                                data-cfemail="a4c9c5cac5c3c1d6e4c1c9c5cdc88ac7cbc9"
                              >
                                {data.email}
                              </span>
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <footer className="dark-wrapper inverse-text">
            <div className="sub-footer">
              <div className="container inner pt-50 pb-50 text-center">
                <p>© 2022 All rights reserved</p>
                <div className="space20" />
                <ul className="social social-bg social-s">
                  <li>
                    <a href={data.youtube}>
                      <i className="et-youtube" />
                    </a>
                  </li>

                  <li>
                    <a href={data.instagram}>
                      <i className="et-instagram" />
                    </a>
                  </li>
                </ul>
              </div>
              {/* /.container */}
            </div>
            {/* /.sub-footer */}
          </footer>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <i class="ri-refresh-line rotate"></i>
        </div>
      )}
    </>
  );
};

export default Portfolio1;
