import firebase from "firebase/compat/app";
import { Link, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import "./login.css";
import { auth, db } from "../Firebase";
import Header from "./Header";
import Footer from "./Footer";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  var separatedString;

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  let history = useHistory();
  const { user } = useSelector((state) => ({ ...state }));
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
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  const signInWithGoogle = async () => {
    try {
      const res = await auth.signInWithPopup(googleProvider);
      const user = res.user;
      const idTokenResult = await user.getIdTokenResult();

      await db
        .collection("users")
        .doc(user.email)
        .get()
        .then(async (doc) => {
          if (doc.exists) {
            separatedString = doc.data();
            console.log("already hee", separatedString);
          } else {
            await db
              .collection("users")
              .doc(user.email)
              .set({
                name: user.email.split("@")[0],
                email: user.email,
                role: "user",
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .then(() => {
          // window.location.reload();
          toast.success("Login Successful");
          //   alert("successfully login");
        });
      await db
        .collection("users")
        .doc(user.email)
        .get()
        .then(async (doc) => {
          if (doc.exists) {
            var separatedString1 = doc.data();
          }
          dispatch({
            type: "USERS_LOGGED",
            payload: {
              name: user.email.split("@")[0],
              email: user.email,
              token: idTokenResult.token,
              role: await separatedString1.role,
              id: user.email,
            },
          });
        });
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };
  const signInWithEmailAndPassword = async () => {
    try {
      await db
        .collection("users")
        // .where('uid', '==', user.email)
        .doc(email)
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
      var obj = JSON.stringify(separatedString.role);
      console.log("obj us hee", obj);
      const ad = "";

      console.log("ad is here", ad);

      await auth.signInWithEmailAndPassword(email, password).then((res) => {
        dispatch({
          type: "USERS_LOGGED",
          payload: {
            name: email.split("@")[0],
            email: email,
            // token: idTokenResult.token,
            role: obj,
            id: email,
          },
        });
      });
      toast.success("Login Successful");
      history.push("/");
    } catch (err) {
      console.error(err);
      toast.error("Invalid Credentials");
    }
  };

  const LoginForm = () => (
    <div className="profile-authentication-area">
      <div className="d-table">
        <div className="d-table-cell">
          <div className="container">
            <div className="signin-form">
              <h2 style={{ fontWeight: "bold" }}>Sign In</h2>
              <form onSubmit={signInWithEmailAndPassword}>
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
                    onChange={(e) => setPassword(e.target.value)}
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
                <div className="row align-items-center">
                  {/* <div className="col-lg-6 col-md-6 col-sm-6 remember-me-wrap">
                    <p>
                      <input type="checkbox" id="test" />
                      <label htmlFor="test">Remember me</label>
                    </p>
                  </div> */}
                  {/* <div className="col-lg-6 col-md-6 col-sm-6 lost-your-password-wrap">
                    <a
                      href="forget-password.html"
                      className="lost-your-password"
                    >
                      Lost your password?
                    </a>
                  </div> */}
                </div>
                <button type="submit" onClick={signInWithEmailAndPassword}>
                  Sign In
                </button>
                <span className="dont-account">
                  Don't have an account? <Link to="/signup">Sign Up Now!</Link>
                </span>
              </form>
              <div className="sign-in-with-button">
                <button type="button" onClick={signInWithGoogle}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={18}
                    height={18}
                    viewBox="0 0 18 18"
                    aria-hidden="true"
                  >
                    <title>Google</title>
                    <g fill="none" fillRule="evenodd">
                      <path
                        fill="#4285F4"
                        d="M17.64 9.2045c0-.6381-.0573-1.2518-.1636-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087c1.7018-1.5668 2.6836-3.874 2.6836-6.615z"
                      />
                      <path
                        fill="#34A853"
                        d="M9 18c2.43 0 4.4673-.806 5.9564-2.1805l-2.9087-2.2581c-.8059.54-1.8368.859-3.0477.859-2.344 0-4.3282-1.5831-5.036-3.7104H.9574v2.3318C2.4382 15.9832 5.4818 18 9 18z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M3.964 10.71c-.18-.54-.2822-1.1168-.2822-1.71s.1023-1.17.2823-1.71V4.9582H.9573A8.9965 8.9965 0 0 0 0 9c0 1.4523.3477 2.8268.9573 4.0418L3.964 10.71z"
                      />
                      <path
                        fill="#EA4335"
                        d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C13.4632.8918 11.426 0 9 0 5.4818 0 2.4382 2.0168.9573 4.9582L3.964 7.29C4.6718 5.1627 6.6559 3.5795 9 3.5795z"
                      />
                    </g>
                  </svg>
                  Sign in with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <ul className="social-links d-flex align-items-center justify-content-center">
        <li>
          <span>Follow Us On:</span>
        </li>
        <li>
          <a href="#" className="facebook" target="_blank">
            <i className="ri-facebook-fill" />
          </a>
        </li>
        <li>
          <a href="#" className="twitter" target="_blank">
            <i className="ri-twitter-fill" />
          </a>
        </li>
        <li>
          <a href="#" className="linkedin" target="_blank">
            <i className="ri-linkedin-fill" />
          </a>
        </li>
        <li>
          <a href="#" className="instagram" target="_blank">
            <i className="ri-instagram-line" />
          </a>
        </li>
      </ul> */}
    </div>
  );

  return (
    <>
      <Header />
      {LoginForm()}

      <Toaster />
      <Footer />
    </>
  );
};
export default Login;
