import React from "react";
import { Link } from "react-router-dom";

const RegisterForm = ({
  email,
  setEmail,
  password,
  setpassword,
  passwordShown,
  togglePasswordVisiblity,
  registerWithEmailAndPassword,
}) => {
  return (
    <div className="profile-authentication-area">
      <div className="d-table">
        <div className="d-table-cell">
          <div
            className="signin-form"
            style={{ width: "50vw", margin: "0 auto" }}
          >
            <h2 style={{ fontWeight: "bold" }}>Sign Up</h2>
            <form>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type={passwordShown ? "text" : "password"}
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
                {passwordShown ? (
                  <i
                    style={{
                      float: "right",
                      marginTop: "-35px",
                      paddingRight: "12px",
                    }}
                    onClick={togglePasswordVisiblity}
                    class="ri-eye-line"
                  >
                    {" "}
                  </i>
                ) : (
                  <i
                    style={{
                      float: "right",
                      marginTop: "-35px",
                      paddingRight: "12px",
                    }}
                    onClick={togglePasswordVisiblity}
                    class="ri-eye-off-line"
                  ></i>
                )}
              </div>

              <button
                style={{ width: "40%", margin: "0 auto" }}
                type="submit"
                onClick={registerWithEmailAndPassword}
              >
                Sign Up
              </button>
              <span className="dont-account">
                Already have an account? <Link to="/login">Login Up Now!</Link>
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
