import "./ProfileComplete.css";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../helpers/Firebase";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProfileCompleteForm from "../../components//Forms/ProfileCompleteForm";

const ProfileComplete = () => {
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
          toast.success(`Added ${values.name} to the database`);
          dispatch({
            type: "PORTFOLIO_INFO",
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
        })
        .catch((err) => {
          window.location.reload();
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
                <ProfileCompleteForm
                  loading={loading}
                  values={values}
                  setValues={setValues}
                  setLoading={setLoading}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                />
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

export default ProfileComplete;
