import "./ProfileComplete.css";
import { useSelector } from "react-redux";
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
    profession: "",
    // whychooseme: "",
    aboutme: "",
  };

  /* Creating a state for the form. */
  const [achievement, setachievement] = useState([
    { AchievementName: "", About: "" },
  ]);

  //Adding of Dynamic Forms
  const handleAddForm = (e) => {
    e.preventDefault();
    setachievement([...achievement, { AchievementName: "", About: "" }]);
  };

  //Removing of form from dynamic Forms
  const handleRemoveForm = (e, index) => {
    e.preventDefault();
    if (achievement.length === 1) {
    } else {
      const values = [...achievement];
      values.splice(index, 1);
      setachievement(values);
    }
  };

  const handleForm = (e, index) => {
    const values = [...achievement];
    values[index][e.target.name] = e.target.value;
    setachievement(values);
  };
  const [loading, setLoading] = useState(false);
  var id = uuidv4();
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState(initialState);
  const random = Math.floor(Math.random() * (999 - 100 + 1) + 100);
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      values.name !== "" &&
      values.profession !== "" &&
      values.aboutme !== "" &&
      values.instagram !== "" &&
      values.achievenemt !== ""
    ) {
      if (values.images.length < 2) {
        return toast.error("Please add 6 images");
      }
      const userid = `${user.email.substring(0, 4)}${random}`;
      await db
        .collection("users")
        .doc(user.email)
        .update({
          id: id,
          name: values.name,
          instagram: values.instagram,
          email: user.email,
          youtube: values.youtube,
          userid: userid,
          location: values.location,
          images: values.images,
          phone: values.phone,
          achievenemt: achievement,
          profession: values.profession,
          // whychooseme: values.whychooseme,
          aboutme: values.aboutme,
        })
        .then((res) => {
          toast.success(`Added ${values.name} to the database`);

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
                <h2 style={{ fontWeight: "bold" }}>Create Portfolio</h2>
                <ProfileCompleteForm
                  loading={loading}
                  values={values}
                  setValues={setValues}
                  setLoading={setLoading}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  handleAddForm={handleAddForm}
                  handleRemoveForm={handleRemoveForm}
                  handleForm={handleForm}
                  achievement={achievement}
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
