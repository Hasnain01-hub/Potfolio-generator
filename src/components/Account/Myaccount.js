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
import { GridLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { db } from "../../helpers/Firebase";
import Footer from "../Footer";
import Header from "../Header";
import { Link } from "react-router-dom";

const Myaccount = () => {
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  var randomColor = "#000000".replace(/0/g, function () {
    return (~~(Math.random() * 16)).toString(16);
  });
  const { user } = useSelector((state) => ({ ...state }));
  const [userDetails, setUserDetails] = React.useState(null);
  const [loading, setloading] = React.useState(true);
  React.useEffect(() => {
    if (user && user.auth_email) {
      loaduser().then((res) => {
        setUserDetails(res.data());
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
          <h2>Loading Your Template! Please Be Patient</h2>
        </div>
      ) : (
        <div>
          <Header />
          <div
            style={{ background: "white", paddingBottom: "15px" }}
            className="new-app-main-banner-wrap-area"
          >
            <div className="d-table">
              <div className="d-table-cell">
                <div className="container">
                  <div
                    className="signin-form"
                    style={{ background: "#f6f9fb", borderRadius: "10px" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                      className="flex-row"
                    >
                      <span>
                        <h2
                          style={{ fontWeight: "bold", marginBottom: "10px" }}
                        >
                          {userDetails.prof_name == null
                            ? userDetails.auth_name
                            : userDetails.prof_name}
                        </h2>
                        <h4 style={{ fontWeight: "500", fontSize: "15px" }}>
                          {userDetails.prof_email == null
                            ? userDetails.auth_email
                            : userDetails.prof_email}
                        </h4>
                      </span>
                      <img
                        referrerpolicy="no-referrer"
                        src={
                          (user && user.profile_url) ||
                          "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                        }
                        alt="user pic"
                        style={{
                          borderRadius: "50%",

                          width: "100px",
                          height: "100px",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {userDetails.prof_email != null && userDetails.location != null ? (
            <div
              className="new-app-main-banner-wrap-area"
              style={{
                padding: "0",
                marginBottom: "10px",
                background: "white",
              }}
            >
              <div className="d-table">
                <div className="d-table-cell">
                  <div className="container">
                    <div className="signin-form">
                      <h2 style={{ fontWeight: "bold" }}>Profile Info</h2>

                      <form
                        style={{
                          display: "grid",
                          gridTemplateColumns: "auto auto",
                        }}
                      >
                        <div className="form-group">
                          <div className="col-md-7 d-flex flex-column gaps">
                            <label for="name">
                              <User size={18} /> Name
                            </label>
                            <p
                              style={{
                                fontSize: "16px",
                                fontWeight: "400",
                                textTransform: "capitalize",
                              }}
                            >
                              {userDetails.prof_name ?? "dummy"}
                            </p>
                            {/* <input
                            type="name"
                            style={{backgroundColor: "white"}}
                            name="name"
                            id="name"
                            value={userDetails.prof_name}
                            className="form-control"
                            placeholder="Name"
                            required
                          /> */}
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="col-md-12 d-flex flex-column gaps">
                            <label for="location">
                              <MapPin size={18} /> Location
                            </label>
                            <p
                              style={{
                                fontSize: "16px",
                                fontWeight: "400",
                                textTransform: "capitalize",
                              }}
                            >
                              {userDetails.location ?? "dummy"}
                            </p>
                            {/* <input
                            type="name"
                            id="location"
                            style={{ backgroundColor: "white" }}
                            name="location"
                            value={userDetails.location ?? ""}
                            className="form-control"
                            required
                            placeholder="Enter Your Location"
                          /> */}
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="col-md-4 d-flex flex-column gaps">
                            <label for="name">
                              <AddressBook size={18} /> About Me
                            </label>
                            <p
                              style={{
                                fontSize: "16px",
                                fontWeight: "400",
                                textTransform: "capitalize",
                              }}
                            >
                              {userDetails.aboutme ?? "dummy"}
                            </p>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="col-md-12 d-flex flex-column gaps">
                            <label for="profession">
                              <ShareNetwork size={18} weight="duotone" />{" "}
                              Profession
                            </label>
                            <p
                              style={{
                                fontSize: "16px",
                                fontWeight: "400",
                                textTransform: "capitalize",
                              }}
                            >
                              {userDetails.profession ?? "dummy"}
                            </p>
                          </div>
                        </div>

                        <div className="action">
                          <Link to="/profilecomplete">
                            <button
                              style={{ width: "150px" }}
                              // onClick={handleSubmit}
                              className="action-button"
                            >
                              Edit
                            </button>
                          </Link>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="signin-form">
              <form>
                <div className="action">
                  <Link to="/profilecomplete">
                    <button
                      style={{
                        width: "205px",
                        display: "block",
                        margin: "auto",
                      }}
                      // onClick={handleSubmit}
                      className="action-button"
                    >
                      Add Personal Details
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          )}
          <Footer />
        </div>
      )}
    </>
  );
};

export default Myaccount;
