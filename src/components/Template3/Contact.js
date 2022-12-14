import React from "react";

const Contact = ({ data }) => {
  return (
    <>
      <section className="form cid-rGtBJ7ytQn" id="form2-3b">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-6 m-auto mbr-form" data-form-type="formoid">
              {/*Formbuilder Form*/}
              <form
                action="https://mobirise.com/"
                method="POST"
                className="mbr-form form-with-styler"
                data-form-title="Form Name"
              >
                <input
                  type="hidden"
                  name="email"
                  data-form-email="true"
                  defaultValue="rZSEQQn2cxIZriQ7g1eR2vf2NnM1rFTAP+TfKC+Gk1efUdS0nWbzGgLjuZdD8hCdXU4Drb1upI4PerhDL9HtNEyXqe4hTVSPhd817yWMyl08w/odNpB3k+5hr1zP9REo.3/IiFIEEbz+c+r0T/j8C2LmS5ukCj4Q72jpgSt+GwSHnRqKVSaXhNJ4X2GBVrXGWSRIoefEq/XertD46UEHaSQH47SI6qUuDq8JVoITe4xPnoRn1TPwCi9g/uyqOyXsC"
                />
                <div className="form-row">
                  <div
                    hidden="hidden"
                    data-form-alert
                    className="alert alert-success col-12"
                  >
                    Thanks for filling out the form!
                  </div>
                  <div
                    hidden="hidden"
                    data-form-alert-danger
                    className="alert alert-danger col-12"
                  >
                    Oops...! some problem!
                  </div>
                </div>
                <div className="dragArea form-row">
                  <div
                    className="col-lg-12 col-md-12 col-sm-12"
                    style={{ transform: "translateZ(0px)" }}
                  >
                    <h4 className="mbr-semibold mbr-fonts-style display-7">
                      PLANNING A TRAINING?
                    </h4>
                    <h5 className="mbr-bold pb-3 mbr-fonts-style display-2">
                      Contact Us
                    </h5>
                  </div>
                  <div
                    className="col-lg-12 col-md-12 col-sm-12 form-group"
                    data-for="name"
                  >
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      data-form-field="name"
                      className="form-control display-7"
                      defaultValue
                      id="name-form2-3b"
                    />
                  </div>
                  <div
                    data-for="email"
                    className="col-lg-12 col-md-12 col-sm-12 form-group"
                  >
                    <input
                      type="email"
                      name="email"
                      placeholder="E-mail"
                      data-form-field="email"
                      className="form-control display-7"
                      defaultValue
                      id="email-form2-3b"
                    />
                  </div>
                  <div
                    className="col-lg-12 col-md-12 col-sm-12 form-group"
                    data-for="textarea"
                  >
                    <textarea
                      name="textarea"
                      placeholder="Message"
                      data-form-field="textarea"
                      className="form-control display-7"
                      id="textarea-form2-3b"
                      defaultValue={""}
                    />
                  </div>
                  <div className="col-auto">
                    <button type="submit" className="btn btn-primary display-7">
                      SEND
                    </button>
                  </div>
                </div>
              </form>
              {/*Formbuilder Form*/}
            </div>
            <div className="col-md-12 col-lg-6 my-auto img-col">
              <div className="mbr-figure">
                <img src="/assets/temp3/assets/images/01.png" alt="Mobirise" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
