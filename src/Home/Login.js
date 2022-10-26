import firebase from "firebase/compat/app";
import { Link, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import "./login.css";
import { auth, db } from "../Firebase";
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
    <form onSubmit={signInWithEmailAndPassword} class="form">
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
      <label for="user-password" style={{ paddingTop: "22px" }}>
        &nbsp;Password
      </label>
      <div className="flex">
        <input
          id="user-password"
          class="form-content"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={passwordShown ? "text" : "password"}
        />{" "}
        
        <i
        style={{
            marginLeft: "auto",
          }}
          class={passwordShown ? "ri-eye-line" : "ri-eye-off-line"}
          onClick={togglePasswordVisiblity}
        />
      </div>
      <div class="form-border"></div>
      {/* <Link to="/forgot/password" id="signup" >
  
          <legend id="forgot-pass">Forgot password?</legend>
        </Link> */}
      <button
        id="submit-btn"
        onClick={signInWithEmailAndPassword}
        className="mb-3"
        style={styles.Login}
      >
        <i class="ri-login-circle-fill"></i>&nbsp;Login
      </button>
      <div>
        <span className="sig">Don't have an account? </span> &nbsp;
        <Link to="/signup" id="signup">
          Register
        </Link>
      </div>
    </form>
  );
  const styles = {
    Google: {
      background: "red",
      padding: "11px",

      marginLeft: "14px",
      fontWeight: "bold",
      color: "white",
      borderRadius: "15px",
      marginBottom: "10px",
      marginTop: "10px",
      height: "auto",
      border: "none",
      boxShadow: "0px 0px 10px 0px red",
      cursor: "pointer",
      fontSize: "20px",
    },
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
  return (
    <>
      <div id="card">
        <div id="card-content">
          <div id="card-title">
            <h3>Login</h3>
            <div class="underline-title"></div>
          </div>
          {LoginForm()}

          <button
            onClick={signInWithGoogle}
            type="danger"
            style={styles.Google}
            // icon={<GoogleOutlined />}
            size="large"
          >
            <i className="ri-google-fill" />
            &nbsp;Login with Google
          </button>
        </div>
        <Toaster />
      </div>
    </>
  );
};
export default Login;
