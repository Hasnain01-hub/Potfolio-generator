import React from 'react'
import UploadFile from '../UploadFile'

const ProfileCompleteForm = ({ values, handleChange, handleSubmit, loading, setLoading, setValues }) => {
    return (
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

            <UploadFile
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
    )
}

export default ProfileCompleteForm