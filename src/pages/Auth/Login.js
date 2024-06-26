import firebase from "firebase/compat/app";
import { motion } from "framer-motion/dist/framer-motion";

import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import "./Login.css";
import { auth, db } from "../../helpers/Firebase";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import LoginForm from "../../components/Forms/LoginForm";

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
          } else {
            await db
              .collection("users")
              .doc(user.email)
              .set({
                auth_name: user.displayName ?? user.email.split("@")[0],
                auth_email: user.email,
                profile_url: user.photoURL,
                role: "user",
                prof_email: null,
                prof_name: null,
                past_email: [user.email],
              })
              .catch((error) => {
                toast.error(error.message);
              });
          }
        })
        .then(() => {
          toast.success("Login Successful");
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
              auth_name: user.displayName ?? user.email.split("@")[0],
              profile_url: user.photoURL,
              auth_email: user.email,
              token: idTokenResult.token,
              role: await separatedString1.role,
              id: user.email,
            },
          });
        });
    } catch (err) {
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

      await auth.signInWithEmailAndPassword(email, password).then((res) => {
        dispatch({
          type: "USERS_LOGGED",
          payload: {
            auth_name: email.split("@")[0],
            auth_email: email,
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

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Header />
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          signInWithEmailAndPassword={signInWithEmailAndPassword}
          signInWithGoogle={signInWithGoogle}
          passwordShown={passwordShown}
          togglePasswordVisiblity={togglePasswordVisiblity}
        />

        <Toaster />
        <Footer />
      </motion.div>
    </>
  );
};
export default Login;
