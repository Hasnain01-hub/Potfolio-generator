import React from 'react'

const Hero = ({data}) => {
  return (
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
  )
}

export default Hero