import "./register.css";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import React, { useState } from "react";
import Uploadfile from "./Upload";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../Firebase";
import Header from "../Header";
import Footer from "../Footer";
const Register = () => {
  const initialState = {
    name: "",
    instagram: "",
    youtube: "",
    location: "",
    images: [],
    phone: "",
    achievenemt: "",
    profession: "",
    whychooseme: "",
    aboutme: "",
  };
  const [loading, setLoading] = useState(false);
  var id = uuidv4();
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState(initialState);
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  let dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      values.name !== "" &&
      values.profession !== "" &&
      values.aboutme !== "" &&
      values.instagram !== "" &&
      values.whychooseme !== ""
    ) {
      if (values.images.length < 2) {
        return toast.error("Please add 6 images");
      }
      await db
        .collection("user-profile")
        .doc(user.email)
        .set({
          id: id,
          name: values.name,
          instagram: values.instagram,
          email: user.email,
          youtube: values.youtube,
          location: values.location,
          images: values.images,
          phone: values.phone,
          achievenemt: values.achievenemt,
          profession: values.profession,
          whychooseme: values.whychooseme,
          aboutme: values.aboutme,
        })
        .then((res) => {
          console.log(res);
          // alert(`"${values.event}" is added`);
          toast.success(`Added ${values.name} to the database`);
          dispatch({
            type: "REGISTER_INFO",
            payload: {
              id: id,
              name: values.name,
              instagram: values.instagram,
              email: user.email,
              youtube: values.youtube,
              location: values.location,
              phone: values.phone,
              images: values.images,
              achievenemt: values.achievenemt,
              profession: values.profession,
              whychooseme: values.whychooseme,
              aboutme: values.aboutme,
            },
          });
          setValues(initialState);
          // window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          // alert("Event added");
          window.location.reload();
          // alert(err.response.data.err);
        });
    } else {
      toast.error("Please fill all the fields");
    }
  };

  return (
    <>
      <Header />
      <div className="new-app-main-banner-wrap-area">
        <div className="d-table">
          <div className="d-table-cell">
            <div className="container">
              <div className="signin-form">
                <h2 style={{ fontWeight: "bold" }}>Register</h2>
                <form>
                  <div className="form-group">
                    <input
                      type="name"
                      name="name"
                      value={values.name}
                      className="form-control"
                      placeholder="Name"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="url"
                      name="instagram"
                      value={values.instagram}
                      onChange={handleChange}
                      class="form-control"
                      placeholder="Instagram Link"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="url"
                      value={values.youtube}
                      name="youtube"
                      onChange={handleChange}
                      class="form-control"
                      placeholder="Youtube Channel Link"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="name"
                      maxLength={10}
                      value={values.phone}
                      name="phone"
                      onChange={handleChange}
                      class="form-control"
                      placeholder="Youtube Channel Link"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="name"
                      name="location"
                      onChange={handleChange}
                      value={values.location}
                      class="form-control"
                      required
                      placeholder="Enter Your Location"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="aboutme"
                      name="aboutme"
                      onChange={handleChange}
                      value={values.aboutme}
                      class="form-control"
                      required
                      placeholder="About Me"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="whychooseme"
                      name="whychooseme"
                      onChange={handleChange}
                      value={values.whychooseme}
                      class="form-control"
                      required
                      placeholder="Why choose me"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="achievenemt"
                      name="achievenemt"
                      onChange={handleChange}
                      value={values.achievenemt}
                      class="form-control"
                      required
                      placeholder="Your Achievenemt"
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="profession"
                      name="profession"
                      onChange={handleChange}
                      value={values.profession}
                      class="form-control"
                      required
                      placeholder="Short Description about your Profession"
                    />
                  </div>

                  <Uploadfile
                    values={values}
                    loading={loading}
                    setValues={setValues}
                    setLoading={setLoading}
                  />

                  <div class="action">
                    <button onClick={handleSubmit} class="action-button">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              <Toaster />
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <Footer />
    </>
  );
};

export default Register;
