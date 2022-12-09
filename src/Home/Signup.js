import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./login.css";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../Firebase";
import Header from "./Header";
import Footer from "./Footer";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  let history = useHistory();
  useEffect(() => {
    let intended = history.location.state;
    if (intended) {
      return;
    } else {
      if (user && user.token) {
        history.push("/");
      }
    }
  }, [user, history]);

  let dispatch = useDispatch();
  const registerWithEmailAndPassword = async () => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, password);
      const user = res.user;
      const idTokenResult = await user.getIdTokenResult();
      var separatedString;

      await db
        .collection("users")
        .doc(user.email)
        .set({
          name: user.email.split("@")[0],
          role: "user",
          email: user.email,
        })
        .then(async () => {
          await db
            .collection("users")
            // .where('uid', '==', user.email)
            .doc(user.email)
            .get()
            .then((doc) => {
              if (doc && doc.exists) {
                separatedString = doc.data();
                //use separatedString
              }
            })
            .catch((error) => {
              console.log(error);
            });
          dispatch({
            type: "USERS_LOGGED",
            payload: {
              name: user.email.split("@")[0],
              email: user.email,
              token: idTokenResult.token,
              role: separatedString.role,
              id: user.email,
              // id: res.data.id,
            },
          });
        })
        .catch();
      // history.push("/");
      console.log("hello", user);
      toast.success("Registration Successful");
      history.push("/");
    } catch (err) {
      console.error(err);
      toast.error("Registration Failed");
    }
  };
  const style = {
    Login: {
      background: "#09ab1b",
      padding: "11px",
      fontSize: "20px",
      marginLeft: "44px",
      fontWeight: "bold",
      color: "white",
      borderRadius: "15px",
      marginBottom: "10px",
      height: "auto",
      border: "none",
      boxShadow: "0px 0px 10px 0px #09ab1b",
      cursor: "pointer",
    },
  };
  const Signupform = () => (
    <div className="profile-authentication-area">
      <div className="d-table">
        <div className="d-table-cell">
          <div className="container">
            <div className="signin-form">
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
                        position: "absolute",
                        marginTop: "7px",
                        marginLeft: "-20px",
                      }}
                      onClick={togglePasswordVisiblity}
                      class="ri-eye-line"
                    >
                      {" "}
                    </i>
                  ) : (
                    <i
                      style={{
                        position: "absolute",
                        marginTop: "7px",
                        marginLeft: "-20px",
                      }}
                      onClick={togglePasswordVisiblity}
                      class="ri-eye-off-line"
                    ></i>
                  )}
                </div>
                {/* <div className="row align-items-center">
              
            </div> */}
                <button type="submit" onClick={registerWithEmailAndPassword}>
                  Sign Up
                </button>
                <span className="dont-account">
                  Already have an account?{" "}
                  <Link to="/login">Login Up Now!</Link>
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <>
      {/* <div id="card">
        <div id="card-content">
          <div id="card-title">
            <span className="register">Register</span>
            <div class="underline-title1"></div>
          </div>
          <form onSubmit={registerWithEmailAndPassword} class="form">
            <label for="user-email" style={{ paddingTop: "13px" }}>
              &nbsp;Email
            </label>
            <input
              id="user-email"
              class="form-content"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            <div class="form-border"></div>
            <div class="form-border"></div>
            <label for="user-email1" style={{ paddingTop: "13px" }}>
              &nbsp;Password
            </label>
            <div className="flex">
              <input
                id="user-email1"
                class="form-content"
                name="email"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                autoFocus
                type={passwordShown ? "text" : "password"}
              />
              <i
                style={{
                  marginLeft: "auto",
                }}
                onClick={togglePasswordVisiblity}
              >
                {" "}
                <i
                  class={passwordShown ? "ri-eye-line" : "ri-eye-off-line"}
                  onClick={togglePasswordVisiblity}
                />
              </i>
            </div>
            <div class="form-border"></div>

            <div class="form-border"></div>
            <button
              id="submit-btn"
              onClick={registerWithEmailAndPassword}
              type="primary"
              className="mb-3"
              style={style.Login}
              disabled={!email || password.length < 6}
            >
              &nbsp;Register
            </button>
            <div>
              <span className="sig">Do you have an account? </span> &nbsp;
              <Link to="/login" id="signup">
                Login
              </Link>
            </div>
          </form>
        </div>
        <Toaster />
      </div> */}
      <Header />
      {Signupform()}

      <Toaster />
      <Footer />
    </>
  );
}

export default Signup;
