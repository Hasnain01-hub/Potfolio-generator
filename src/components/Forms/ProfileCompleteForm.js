import {
  AddressBook,
  InstagramLogo,
  MapPin,
  Phone,
  ShareNetwork,
  User,
  YoutubeLogo,
} from "phosphor-react";
import React from "react";
import UploadFile from "../UploadFile";
import "./profiles.css";

const ProfileCompleteForm = ({
  values,
  handleChange,
  handleSubmit,
  loading,
  setLoading,
  setValues,
  achievement,
  handleAddForm,
  handleRemoveForm,
  handleForm,
}) => {
  return (
    <form>
      <div className="form-group row">
        <div className="col-md-6 d-flex flex-column gaps">
          <label for="name">
            Name <User size={18} />
          </label>
          <input
            type="name"
            name="name"
            id="name"
            value={values.name}
            className="form-control"
            placeholder="Name"
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6 d-flex flex-column gaps">
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
        </div>
      </div>
      {/* <div className="form-group">
        <label for="userid">User Id</label>
        <input
          type="name"
          name="userid"
          id="userid"
          value={values.userid}
          className="form-control"
          placeholder="User Id"
          onChange={handleChange}
          required
        />
      </div> */}

      <div className="form-group row">
        <div className="col-md-6 d-flex flex-column gaps">
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
        </div>
        <div className="col-md-6 d-flex flex-column gaps">
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
            Location <MapPin size={18} />
          </label>
          <input
            type="name"
            id="location"
            name="location"
            onChange={handleChange}
            value={values.location}
            className="form-control"
            required
            placeholder="Enter Your Location"
          />
        </div>
      </div>
      <div className="form-group">
        <div className="col-md-12 d-flex flex-column gaps">
          <label for="name">
            About Me <AddressBook size={18} />
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
      <div className="form-group">
        <label for="achievenemt">Achievenemts About You</label>
        <div className="d-flex">
          <button style={{ width: "120px" }} onClick={handleAddForm}>
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
      </div>

      <div className="form-group">
        <div className="col-md-12 d-flex flex-column gaps">
          <label for="profession">
            Profession <ShareNetwork size={18} weight="duotone" />
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

      <UploadFile
        values={values}
        loading={loading}
        setValues={setValues}
        setLoading={setLoading}
      />

      <div className="action">
        <button onClick={handleSubmit} className="action-button">
          Submit
        </button>
      </div>
    </form>
  );
};

export default ProfileCompleteForm;
