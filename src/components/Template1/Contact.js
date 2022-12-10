import React from 'react'

const Contact = ({data}) => {
  return (
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
  )
}

export default Contact