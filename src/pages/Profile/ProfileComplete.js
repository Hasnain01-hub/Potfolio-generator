import "./ProfileComplete.css";
import { motion } from "framer-motion/dist/framer-motion";
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
    prof_name: "",
    prof_email: "",
    location: "",
    phone: "",
    profession: "",
    // whychooseme: "",
    aboutme: "",
    past_email: [],
  };

  /* Creating a state for the form. */
  const [achievement, setachievement] = useState([
    { AchievementName: "", About: "" },
  ]);
  // const [instagram, setinstagram] = useState([{ instagram: "" }]);

  //Adding of Dynamic Forms
  // const handleAchievement = (e) => {
  //   e.preventDefault();
  //   setachievement([...achievement, { AchievementName: "", About: "" }]);
  // };

  // const handleInstagram = (e) => {
  //   e.preventDefault();
  //   setachievement([...instagram, { instagram: "" }]);
  // };

  //Removing of form from dynamic Forms
  // const handleRemoveForm = (e, index) => {
  //   e.preventDefault();
  //   if (achievement.length === 1) {
  //   } else {
  //     const values = [...achievement];
  //     values.splice(index, 1);
  //     setachievement(values);
  //   }
  // };
  const { user } = useSelector((state) => ({ ...state }));
  const handleForm = (e, index) => {
    const values = [...achievement];
    values[index][e.target.name] = e.target.value;
    setachievement(values);
  };
  // const [fileloading, setfileLoading] = useState(false);
  var id = uuidv4();

  const [values, setValues] = useState(initialState);
  const random = Math.floor(Math.random() * (999 - 100 + 1) + 100);
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isNaN(values.phone)) return toast.error("Please numbers only");
    if (!values.past_email.find((email) => email == values.prof_email)) {
      values.past_email.push(values.prof_email);
    }
    if (
      values.profession !== undefined &&
      values.aboutme !== undefined &&
      values.profession !== undefined
    ) {
      // if (values.images.length < 2) {
      //   return toast.error("Please add 6 images");
      // }
      const userid = `${values.prof_email.substring(0, 4)}${random}`;
      await db
        .collection("users")
        .doc(user.auth_email)
        .update({
          id: id,
          prof_name: values.prof_name,
          prof_email: values.prof_email,
          // instagram: values.instagram,
          // youtube: values.youtube,
          userid: userid,
          location: values.location,
          // images: values.images,
          past_email: values.past_email,
          phone: values.phone,
          // achievenemt: achievement,
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div>
          <Header />

          <ProfileCompleteForm
            // fileloading={fileloading}
            values={values}
            setValues={setValues}
            // setfileLoading={setfileLoading}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            // handleAddForm={handleAchievement}
            // handleRemoveForm={handleRemoveForm}
            handleForm={handleForm}
            // achievement={achievement}
          />

          <br />
          <br />
          <Footer />
        </div>
      </motion.div>
    </>
  );
};

export default ProfileComplete;
