import Lottie from "lottie-react";
import "./register.css";
import formanimation from "./form.json";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import React, { useState } from "react";

import Uploadfile from "./Upload";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../Firebase";
const Register = () => {
  const initialState = {
    name: "",
    insta: "",
    youtube: "",
    location: "",
    images: [],
  };
  const [loading, setLoading] = useState(false);
  var id = uuidv4();
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState(initialState);
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (values.event !== "" && values.date !== "" && values.desc !== "") {
      if (values.images.length < 6) {
        return toast.error("Please add 6 images");
      }
      await db
        .collection("user-profile")
        .doc(id)
        .set({
          id: id,
          name: values.name,
          insta: values.insta,
          email: user.email,
          youtube: values.youtube,
          location: values.location,
          images: values.images,
        })
        .then((res) => {
          console.log(res);
          // alert(`"${values.event}" is added`);
          toast.success(`Added ${values.name} to the database`);
          window.location.reload();
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
      <div class="containerevent">
        <div class="cardevent">
          <div class="card-image">
            <Lottie
              className="eventgif"
              animationData={formanimation}
              loop={true}
            />
          </div>
          <form class="card-form" onSubmit={handleSubmit}>
            <div class="input">
              <input
                type="text"
                name="name"
                onChange={handleChange}
                class="input-field"
                required
              />
              <label class="input-label">Name</label>
            </div>
            <div class="input">
              <input
                type="text"
                name="insta"
                onChange={handleChange}
                class="input-field"
                required
              />
              <label class="input-label">Insta Handle</label>
            </div>
            <div class="input">
              <input
                type="text"
                name="youtube"
                onChange={handleChange}
                class="input-field"
                required
              />
              <label class="input-label">Youtube Handle</label>
            </div>
            <div class="input">
              <input
                type="text"
                name="location"
                onChange={handleChange}
                class="input-field"
                required
              />
              <label class="input-label">Location</label>
            </div>
            {/* <div class="input">
      <input
        type="file"
        onChange={handleChange}
        name="images"
        class="input-field"
        required
      />

      <label class="input-label">Image</label>
      </div> */}
            <Uploadfile
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />

            <div class="action">
              <button class="action-button">Submit</button>
            </div>
          </form>
        </div>
        <Toaster />
      </div>
    </>
  );
};

export default Register;
