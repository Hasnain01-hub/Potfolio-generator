import React from "react";

const MainSection = ({ data }) => {
  return (
    <>
      <section
        data-bs-version="5.1"
        className="features6 cid-tdxO0nnOKE"
        id="features06-4"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 pb-4">
              <h3 className="mbr-section-title mbr-fonts-style align-center mb-4 display-1">
                <strong>Features</strong>
              </h3>
            </div>
            <div className="col-sm-6 col-md-12 col-lg-4">
              <div className="card-wrap card1">
                <div className="image-wrap">
                  <img src={data.images[0]["url"]} alt={data.name} />
                </div>
                <div className="content-wrap">
                  <h5 className="mbr-section-title card-title mbr-fonts-style align-left m-0 display-5">
                    <strong>Creation</strong>
                  </h5>
                  {/* <p className="card-text mbr-fonts-style align-left display-7">
                    {data.aboutme}
                  </p> */}
                  <div className="social-row display-7">
                    <div className="soc-item">
                      <span className="tag mbr-fonts-style display-4">art</span>
                    </div>
                    <div className="soc-item">
                      <span className="tag mbr-fonts-style display-4">
                        creator
                      </span>
                    </div>
                    <div className="soc-item">
                      <span className="tag mbr-fonts-style display-4">
                        Photography
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-12 col-lg-4">
              <div className="card-wrap card2">
                <div className="image-wrap">
                  <img
                    src={data.images[1]["url"]}
                    alt="Mobirise Website Builder"
                  />
                </div>
                <div className="content-wrap">
                  <h5 className="mbr-section-title card-title2 mbr-fonts-style align-left m-0 display-5">
                    <strong>Branding</strong>
                  </h5>
                  {/* <p className="card-text2 mbr-fonts-style align-left display-7">
                    Lorem ipsum dolor sit amet nulla vel, consectetur
                    adipiscing. Donec massa nulla gravida pulvinar.
                  </p> */}
                  <div className="social-row display-7">
                    <div className="soc-item">
                      <span className="tag mbr-fonts-style display-4">art</span>
                    </div>
                    <div className="soc-item">
                      <span className="tag mbr-fonts-style display-4">
                        creator
                      </span>
                    </div>
                    <div className="soc-item">
                      <span className="tag mbr-fonts-style display-4">
                        Photography
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-12 col-lg-4">
              <div className="card-wrap card3">
                <div className="image-wrap">
                  <img
                    src={data.images[2]["url"]}
                    alt="Mobirise Website Builder"
                  />
                </div>
                <div className="content-wrap">
                  <h5 className="mbr-section-title card-title3 mbr-fonts-style align-left m-0 display-5">
                    <strong>Promotion</strong>
                  </h5>
                  {/* <p className="card-text3 mbr-fonts-style align-left display-7">
                    Lorem ipsum dolor sit amet nulla vel, consectetur
                    adipiscing. Donec massa nulla gravida pulvinar.
                  </p> */}
                  <div className="social-row display-7">
                    <div className="soc-item soc-item3">
                      <span className="tag3 mbr-fonts-style display-4">
                        art
                      </span>
                    </div>
                    <div className="soc-item soc-item3">
                      <span className="tag3 mbr-fonts-style display-4">
                        creator
                      </span>
                    </div>
                    <div className="soc-item soc-item3">
                      <span className="tag3 mbr-fonts-style display-4">
                        Photography
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        data-bs-version="5.1"
        className="features4 cid-tdxO14723f"
        id="features04-5"
      >
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-9">
              <h3 className="mbr-section-title mbr-fonts-style align-center mb-0 display-1">
                <strong>Services</strong>
              </h3>
            </div>
          </div>
          <div className="row">
            <div className="card col-12 col-md-6 col-lg-4">
              <div className="card-wrapper">
                <div className="card-box align-left">
                  <div className="iconfont-wrapper">
                    <span className="mbr-iconfont mobi-mbri-idea mobi-mbri" />
                  </div>
                  <h5 className="card-title mbr-fonts-style display-5">
                    <strong>Creation</strong>
                  </h5>
                  <p className="card-text mbr-fonts-style display-7">
                    Lorem ipsum dolor sit amet nulla vel, consectetur
                    adipiscing. Donec massa nulla gravida pulvinar.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="card col-12 col-md-6 col-lg-4">
              <div className="card-wrapper">
                <div className="card-box align-left">
                  <div className="iconfont-wrapper">
                    <span className="mbr-iconfont mobi-mbri-growing-chart mobi-mbri" />
                  </div>
                  <h5 className="card-title mbr-fonts-style display-5">
                    <strong>Promotion</strong>
                  </h5>
                  <p className="card-text mbr-fonts-style display-7">
                    Lorem ipsum dolor sit amet nulla vel, consectetur
                    adipiscing. Donec massa nulla gravida pulvinar.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="card col-12 col-md-6 col-lg-4">
              <div className="card-wrapper">
                <div className="card-box align-left">
                  <div className="iconfont-wrapper">
                    <span className="mbr-iconfont mobi-mbri-change-style mobi-mbri" />
                  </div>
                  <h5 className="card-title mbr-fonts-style display-5">
                    <strong>Branding</strong>
                  </h5>
                  <p className="card-text mbr-fonts-style display-7">
                    Lorem ipsum dolor sit amet nulla vel, consectetur
                    adipiscing. Donec massa nulla gravida pulvinar.&nbsp;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        data-bs-version="5.1"
        className="header2 cid-tdxOqvZdhb"
        id="header02-d"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-12 col-lg-5 image-wrapper">
              <img
                className="w-100"
                src={data.images[2]["url"]}
                alt="Mobirise Website Builder"
              />
            </div>
            <div className="col-12 col-md-12 col-lg">
              <div className="text-wrapper align-left">
                <h1 className="mbr-section-title mbr-fonts-style mb-4 display-2">
                  <strong>About Me</strong>
                </h1>
                <p className="mbr-text align-left mbr-fonts-style display-7">
                  {data.aboutme}
                </p>
                {/* <div className="mbr-section-btn align-left mt-3">
                  <a
                    className="btn btn-lg btn-primary display-4"
                    href="https://mobiri.se/"
                  >
                    Get Started
                  </a>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        data-bs-version="5.1"
        className="people1 cid-tdxO3wSJuj"
        id="people01-7"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-5 mb-5 align-left">
              <h5 className="mbr-section-maintitle mbr-fonts-style mt-3 display-1">
                <strong>Achievement</strong>
              </h5>
              <p className="mbr-section-maintext mbr-fonts-style mt-3 display-7">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent vitae pellentesque. Integer aliquam.
                <br />
              </p>
            </div>
            <div className="col-lg-7">
              {data.achievenemt.map((card, index) => {
                return (
                  <div className="row item-row">
                    <div className="col-lg-7">
                      <div className="article-wrapper align-left">
                        <h3 className="mbr-section-title mbr-fonts-style mt-3 display-5">
                          <strong>
                            {index + 1}. {card.AchievementName}
                          </strong>
                        </h3>
                        <h4 className="mbr-section-subtitle mbr-fonts-style mt-1 display-7">
                          {card.About}
                        </h4>
                      </div>
                    </div>
                    <div className="col-lg-5">
                      <div className="mbr-section-btn align-right">
                        <a
                          className="btn btn-lg article-btn btn-secondary display-4"
                          href={data.instagram}
                        >
                          <strong>know more</strong>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
              {/* <div className="row item-row">
                <div className="col-lg-7">
                  <div className="article-wrapper align-left">
                    <h3 className="mbr-section-title mbr-fonts-style mt-3 display-5">
                      <strong>Manager</strong>
                    </h3>
                    <h4 className="mbr-section-subtitle mbr-fonts-style mt-1 display-7">
                      Lorem ipsum dolor sit amet consectetur.
                    </h4>
                    <p className="mbr-section-text mbr-fonts-style mt-3 display-7">
                      Full-time
                      <br />
                    </p>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="mbr-section-btn align-right">
                    <a
                      className="btn btn-lg article-btn btn-secondary display-4"
                      href="https://mobiri.se/"
                    >
                      <strong>Read more</strong>
                    </a>
                  </div>
                </div>
              </div>
              <div className="row item-row">
                <div className="col-lg-7">
                  <div className="article-wrapper align-left">
                    <h3 className="mbr-section-title mbr-fonts-style mt-3 display-5">
                      <strong>Creator</strong>
                    </h3>
                    <h4 className="mbr-section-subtitle mbr-fonts-style mt-1 display-7">
                      Lorem ipsum dolor sit amet consectetur.
                    </h4>
                    <p className="mbr-section-text mbr-fonts-style mt-3 display-7">
                      Full-time
                      <br />
                    </p>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="mbr-section-btn align-right">
                    <a
                      className="btn btn-lg article-btn btn-secondary display-4"
                      href="https://mobiri.se/"
                    >
                      <strong>Read more</strong>
                    </a>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      <section
        data-bs-version="5.1"
        className="clients2 cid-tdxO2EAyjQ"
        id="clients02-6"
      >
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-12">
              <h3 className="mbr-section-title mbr-fonts-style align-center mb-5 display-2">
                <strong>Find Social Links</strong>
              </h3>
            </div>
            <div className="col-sm-6 card col-lg-3">
              <div
                className="card-wrap card1"
                style={{
                  backgroundImage: "url(" + `${data.images[0]["url"]}` + ")",
                }}
              >
                <div className="content-wrap">
                  <div className="mbr-section-btn card-btn align-center">
                    <a
                      className="btn btn-white display-4"
                      href={data.instagram}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 card col-lg-3">
              <div
                className="card-wrap card2"
                style={{
                  backgroundImage: "url(" + `${data.images[1]["url"]}` + ")",
                }}
              >
                <div className="content-wrap">
                  <div className="mbr-section-btn card-btn align-center">
                    <a className="btn btn-white display-4" href={data.youtube}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 card col-lg-3">
              <div
                className="card-wrap card3"
                style={{
                  backgroundImage: "url(" + `${data.images[2]["url"]}` + ")",
                }}
              >
                <div className="content-wrap">
                  <div className="mbr-section-btn card-btn align-center">
                    <a
                      className="btn btn-white display-4"
                      href={`mailto:${data.email}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M18.803 8.493A5.023 5.023 0 0 0 22 8.9V20a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h13.1c-.066.323-.1.658-.1 1a4.98 4.98 0 0 0 1.193 3.241l-5.132 4.442-6.414-5.445-1.294 1.524 7.72 6.555 6.73-5.824zM21 7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        data-bs-version="5.1"
        className="footer2 cid-tdxO6UlGHf"
        id="footer02-a"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8">
              <div className="image-wrapper d-flex justify-content-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="40"
                  zoomAndPan="magnify"
                  viewBox="0 0 30 30.000001"
                  height="40"
                  preserveAspectRatio="xMidYMid meet"
                  version="1.0"
                >
                  <defs>
                    <clipPath id="id1">
                      <path
                        d="M 2.371094 18 L 27.773438 18 L 27.773438 23.921875 L 2.371094 23.921875 Z M 2.371094 18 "
                        clipRule="nonzero"
                      />
                    </clipPath>
                    <clipPath id="id2">
                      <path
                        d="M 2.371094 10 L 27.773438 10 L 27.773438 19 L 2.371094 19 Z M 2.371094 10 "
                        clipRule="nonzero"
                      />
                    </clipPath>
                    <clipPath id="id3">
                      <path
                        d="M 2.371094 5.050781 L 27.773438 5.050781 L 27.773438 11 L 2.371094 11 Z M 2.371094 5.050781 "
                        clipRule="nonzero"
                      />
                    </clipPath>
                  </defs>
                  <g clipPath="url(#id1)">
                    <path
                      fill="rgb(7.449341%, 53.329468%, 3.138733%)"
                      d="M 2.375 21.019531 C 2.375 22.625 3.640625 23.921875 5.199219 23.921875 L 24.945312 23.921875 C 26.503906 23.921875 27.769531 22.625 27.769531 21.019531 L 27.769531 18.117188 L 2.375 18.117188 Z M 2.375 21.019531 "
                      fillOpacity="1"
                      fillRule="nonzero"
                    />
                  </g>
                  <g clipPath="url(#id2)">
                    <path
                      fill="rgb(93.328857%, 93.328857%, 93.328857%)"
                      d="M 2.375 10.859375 L 27.769531 10.859375 L 27.769531 18.117188 L 2.375 18.117188 Z M 2.375 10.859375 "
                      fillOpacity="1"
                      fillRule="nonzero"
                    />
                  </g>
                  <g clipPath="url(#id3)">
                    <path
                      fill="rgb(100%, 59.999084%, 19.999695%)"
                      d="M 27.769531 10.859375 L 27.769531 7.957031 C 27.769531 6.351562 26.503906 5.050781 24.945312 5.050781 L 5.199219 5.050781 C 3.640625 5.050781 2.375 6.351562 2.375 7.957031 L 2.375 10.859375 Z M 27.769531 10.859375 "
                      fillOpacity="1"
                      fillRule="nonzero"
                    />
                  </g>
                  <path
                    fill="rgb(0%, 0%, 50.19989%)"
                    d="M 17.894531 14.488281 C 17.894531 14.871094 17.820312 15.242188 17.679688 15.597656 C 17.535156 15.953125 17.332031 16.269531 17.066406 16.539062 C 16.804688 16.8125 16.496094 17.023438 16.152344 17.167969 C 15.804688 17.316406 15.445312 17.390625 15.074219 17.390625 C 14.699219 17.390625 14.339844 17.316406 13.992188 17.167969 C 13.648438 17.023438 13.34375 16.8125 13.078125 16.539062 C 12.8125 16.269531 12.609375 15.953125 12.464844 15.597656 C 12.324219 15.242188 12.25 14.871094 12.25 14.488281 C 12.25 14.101562 12.324219 13.730469 12.464844 13.375 C 12.609375 13.019531 12.8125 12.707031 13.078125 12.433594 C 13.34375 12.164062 13.648438 11.953125 13.992188 11.804688 C 14.339844 11.65625 14.699219 11.585938 15.074219 11.585938 C 15.445312 11.585938 15.804688 11.65625 16.152344 11.804688 C 16.496094 11.953125 16.804688 12.164062 17.066406 12.433594 C 17.332031 12.707031 17.535156 13.019531 17.679688 13.375 C 17.820312 13.730469 17.894531 14.101562 17.894531 14.488281 Z M 17.894531 14.488281 "
                    fillOpacity="1"
                    fillRule="nonzero"
                  />
                  <path
                    fill="rgb(93.328857%, 93.328857%, 93.328857%)"
                    d="M 17.1875 14.488281 C 17.1875 14.777344 17.136719 15.054688 17.027344 15.320312 C 16.921875 15.585938 16.765625 15.824219 16.570312 16.027344 C 16.371094 16.230469 16.140625 16.390625 15.882812 16.5 C 15.621094 16.609375 15.351562 16.664062 15.074219 16.664062 C 14.792969 16.664062 14.523438 16.609375 14.261719 16.5 C 14.003906 16.390625 13.773438 16.230469 13.578125 16.027344 C 13.378906 15.824219 13.226562 15.585938 13.117188 15.320312 C 13.011719 15.054688 12.957031 14.777344 12.957031 14.488281 C 12.957031 14.199219 13.011719 13.921875 13.117188 13.65625 C 13.226562 13.386719 13.378906 13.152344 13.578125 12.949219 C 13.773438 12.742188 14.003906 12.585938 14.261719 12.476562 C 14.523438 12.367188 14.792969 12.308594 15.074219 12.308594 C 15.351562 12.308594 15.621094 12.367188 15.882812 12.476562 C 16.140625 12.585938 16.371094 12.742188 16.570312 12.949219 C 16.765625 13.152344 16.921875 13.386719 17.027344 13.65625 C 17.136719 13.921875 17.1875 14.199219 17.1875 14.488281 Z M 17.1875 14.488281 "
                    fillOpacity="1"
                    fillRule="nonzero"
                  />
                  <path
                    fill="rgb(39.99939%, 39.99939%, 70.199585%)"
                    d="M 15.074219 12.308594 L 15.175781 13.953125 L 15.882812 12.476562 L 15.367188 14.035156 L 16.570312 12.949219 L 15.511719 14.183594 L 17.027344 13.65625 L 15.589844 14.382812 L 17.1875 14.488281 L 15.589844 14.59375 L 17.027344 15.320312 L 15.511719 14.789062 L 16.570312 16.027344 L 15.367188 14.941406 L 15.882812 16.5 L 15.175781 15.023438 L 15.074219 16.664062 L 14.96875 15.023438 L 14.261719 16.5 L 14.777344 14.941406 L 13.574219 16.027344 L 14.632812 14.789062 L 13.117188 15.320312 L 14.554688 14.59375 L 12.957031 14.488281 L 14.554688 14.382812 L 13.117188 13.65625 L 14.632812 14.183594 L 13.574219 12.949219 L 14.777344 14.035156 L 14.261719 12.476562 L 14.96875 13.953125 Z M 15.074219 12.308594 "
                    fillOpacity="1"
                    fillRule="nonzero"
                  />
                  <path
                    fill="rgb(0%, 0%, 50.19989%)"
                    d="M 15.777344 14.488281 C 15.777344 14.6875 15.707031 14.859375 15.570312 15 C 15.433594 15.140625 15.265625 15.214844 15.074219 15.214844 C 14.878906 15.214844 14.710938 15.140625 14.574219 15 C 14.4375 14.859375 14.367188 14.6875 14.367188 14.488281 C 14.367188 14.289062 14.4375 14.117188 14.574219 13.972656 C 14.710938 13.832031 14.878906 13.761719 15.074219 13.761719 C 15.265625 13.761719 15.433594 13.832031 15.570312 13.972656 C 15.707031 14.117188 15.777344 14.289062 15.777344 14.488281 Z M 15.777344 14.488281 "
                    fillOpacity="1"
                    fillRule="nonzero"
                  />
                </svg>
              </div>
              <p className="mbr-description mbr-fonts-style mt-2 align-center display-7">
                {data.location}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        data-bs-version="5.1"
        className="footer3 cid-tdxO5MWA8J"
        once="footers"
        id="footer03-9"
      >
        <div className="container">
          <div className="media-container-row align-center mbr-white">
            <div className="col-12">
              <p className="mbr-text mb-0 mbr-fonts-style display-7">
                © Copyright 2022 Mobirise - All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainSection;
