import React from "react";
import UploadFile from "../UploadFile";

const ProfileCompleteForm = ({
  values,
  handleChange,
  handleSubmit,
  loading,
  setLoading,
  setValues,
}) => {
  return (
    <form>
      <div className="form-group">
        <label for="name">Name</label>
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
      <div className="form-group">
        <label for="instagram">Instagram Link</label>
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
      <div className="form-group">
        <label for="youtube">Youtube link</label>
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
      <div className="form-group">
        <label for="phone">Phone</label>
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
      <div className="form-group">
        <label for="location">Location</label>
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
      <div className="form-group">
        <label for="name">About Me</label>
        <input
          type="aboutme"
          name="aboutme"
          onChange={handleChange}
          value={values.aboutme}
          className="form-control"
          required
          placeholder="About Me"
        />
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
        <label for="achievenemt">Achievenemt</label>
        <input
          type="achievement"
          name="achievenemt"
          id="achievenemt"
          onChange={handleChange}
          value={values.achievenemt}
          className="form-control"
          required
          placeholder="Your Achievenemt"
        />
      </div>

      <div className="form-group">
        <label for="profession">Profession</label>
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
