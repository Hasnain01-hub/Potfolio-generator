import {
  AddressBook,
  InstagramLogo,
  EnvelopeSimple,
  MapPin,
  Phone,
  ShareNetwork,
  User,
  YoutubeLogo,
} from "phosphor-react";
import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { GridLoader } from "react-spinners";
import { db } from "../../helpers/Firebase";
import UploadFile from "../UploadFile";
import "./profiles.css";

const ProfileCompleteForm = ({
  values,
  handleChange,
  handleSubmit,
  // loading,
  // filesetLoading,
  setValues,
  // achievement,
  // handleAchievement,
  // handleRemoveForm,
  // handleForm,
}) => {
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  var randomColor = "#000000".replace(/0/g, function () {
    return (~~(Math.random() * 16)).toString(16);
  });
  const [userDetails, setUserDetails] = React.useState({});
  const { user } = useSelector((state) => ({ ...state }));
  const [loading, setloading] = React.useState(true);
  React.useEffect(() => {
    if (user && user.auth_email) {
      loaduser().then((res) => {
        setUserDetails(res.data());
        setValues({
          ...values,
          prof_email: res.data().prof_email ?? user.auth_email,
          prof_name: res.data().prof_name ?? user.auth_name,
          past_email: res.data().past_email,
          location: res.data().location,
          phone: res.data().phone,
          profession: res.data().profession,
          aboutme: res.data().aboutme,
        });
        setloading(false);
      });
    }
  }, [user]);
  const loaduser = async () => {
    return await db.collection("users").doc(user.auth_email).get();
  };

  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <GridLoader
            color={randomColor}
            loading={loading}
            cssOverride={override}
            size={75}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <h2>Loading...</h2>
        </div>
      ) : (
        <div className="new-app-main-banner-wrap-area">
          <div className="d-table">
            <div className="d-table-cell">
              <div className="container">
                <div className="signin-form">
                  <h2 style={{ fontWeight: "bold" }}>Personal Details</h2>
                  <form>
                    <div className="form-group row">
                      <div className="col-md-12 d-flex flex-column gaps">
                        <label for="name">
                          <User size={18} /> Name
                        </label>
                        <input
                          type="name"
                          name="prof_name"
                          id="name"
                          value={values.prof_name}
                          className="form-control"
                          placeholder="Name"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      {/* <div className="col-md-6 d-flex flex-column gaps">
          <label for="instagram">
            Instagram Link <InstagramLogo size={18} />
          </label>
          <input
            type="url"
            name="instagram"
            id="instagram"
            value={values.instagram}
            onChange={handleChange}
            className="form-control"
            placeholder="Instagram Link"
            required
          />
        </div> */}
                    </div>
                    <div className="form-group">
                      <label for="prof_email">
                        <EnvelopeSimple size={18} /> Email
                      </label>
                      <input
                        type="name"
                        name="prof_email"
                        id="prof_email"
                        value={values.prof_email}
                        className="form-control"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group row">
                      {/* <div className="col-md-6 d-flex flex-column gaps">
          <label for="youtube">
            Youtube link <YoutubeLogo size={18} />
          </label>
          <input
            type="url"
            value={values.youtube}
            name="youtube"
            id="youtube"
            onChange={handleChange}
            className="form-control"
            placeholder="Youtube Channel Link"
            required
          />
        </div> */}
                      <div className="col-md-12 d-flex flex-column gaps">
                        <label for="phone">
                          Phone <Phone size={18} />
                        </label>
                        <input
                          type="name"
                          id="phone"
                          maxLength={10}
                          value={values.phone}
                          name="phone"
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Phone"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-md-12 d-flex flex-column gaps">
                        <label for="location">
                          <MapPin size={18} /> Location
                        </label>
                        <input
                          type="name"
                          id="location"
                          name="location"
                          onChange={handleChange}
                          value={values.location}
                          className="form-control"
                          required
                          placeholder="Location"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-md-12 d-flex flex-column gaps">
                        <label for="name">
                          <AddressBook size={18} /> About Me
                        </label>
                        <textarea
                          type="aboutme"
                          name="aboutme"
                          onChange={handleChange}
                          value={values.aboutme}
                          className="form-control"
                          required
                          placeholder="About Me"
                          rows={3}
                        />
                      </div>
                    </div>
                    {/* <div className="form-group">
        <input
          type="whychooseme"
          name="whychooseme"
          onChange={handleChange}
          value={values.whychooseme}
          className="form-control"
          required
          placeholder="Why choose me"
        />
      </div> */}
                    {/* achievement */}
                    {/* <div className="form-group">
        <label for="achievenemt">Achievenemts About You</label>
        <div className="d-flex">
          <button style={{ width: "120px" }} onClick={handleAchievement}>
            Add
          </button>
          &nbsp;
          <button style={{ width: "120px" }} onClick={handleRemoveForm}>
            Remove
          </button>
        </div>

        {achievement.map((input, index) => (
          <>
            <br />
            <div
              className="p-2 d-flex"
              style={{
                flexDirection: "column",
                gap: "10px",
                boxShadow: "1px 1px 10px rgba(0,0,0,0.1)",
                borderRadius: "10px",
              }}
            >
              <input
                type="achievement"
                name="AchievementName"
                id="achievenemt"
                onChange={(event) => handleForm(event, index)}
                className="form-control"
                required
                placeholder="Your Achievenemt"
              />
              <textarea
                placeholder="Enter Details About Your Achievements"
                className="form-control"
                name="About"
                id="About"
                onChange={(event) => handleForm(event, index)}
                rows={5}
              ></textarea>
            </div>
          </>
        ))}
      </div> */}

                    <div className="form-group">
                      <div className="col-md-12 d-flex flex-column gaps">
                        <label for="profession">
                          <ShareNetwork size={18} weight="duotone" /> Profession
                        </label>
                        <input
                          type="profession"
                          id="profession"
                          name="profession"
                          onChange={handleChange}
                          value={values.profession}
                          className="form-control"
                          required
                          placeholder="Short Description about your Profession"
                        />
                      </div>
                    </div>

                    {/* Upload Images */}
                    {/* <UploadFile
        values={values}
        loading={loading}
        setValues={setValues}
        setLoading={setLoading}
      /> */}

                    <div className="action">
                      <button onClick={handleSubmit} className="action-button">
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
      )}
    </>
  );
};

export default ProfileCompleteForm;
