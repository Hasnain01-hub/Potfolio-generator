import React, { useState, useEffect } from "react";
import { motion } from "framer-motion/dist/framer-motion";

import toast, { Toaster } from "react-hot-toast";
import "./Login.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../../helpers/Firebase";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import RegisterForm from "../../components/Forms/RegisterForm";

function Register() {
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
          auth_name: user.displayName ?? user.email.split("@")[0],
          profile_url: user.photoURL,
          role: "user",
          auth_email: user.email,
          prof_email: null,
          prof_name: null,
          past_email: [user.email],
        })
        .then(async () => {
          await db
            .collection("users")
            .doc(user.email)
            .get()
            .then((doc) => {
              if (doc && doc.exists) {
                separatedString = doc.data();
              }
            })
            .catch((error) => {
              toast.error(error.message);
            });
          dispatch({
            type: "USERS_LOGGED",
            payload: {
              auth_name: user.displayName ?? user.email.split("@")[0],
              profile_url: user.photoURL,
              auth_email: user.email,
              token: idTokenResult.token,
              role: separatedString.role,
              id: user.email,
              // id: res.data.id,
            },
          });
        })
        .catch();
      toast.success("Registration Successful");
      history.push("/");
    } catch (err) {
      toast.error("Registration Failed");
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
        <RegisterForm
          email={email}
          setEmail={setEmail}
          password={password}
          setpassword={setpassword}
          registerWithEmailAndPassword={registerWithEmailAndPassword}
          togglePasswordVisiblity={togglePasswordVisiblity}
          passwordShown={passwordShown}
        />
        <Toaster />
        <Footer />
      </motion.div>
    </>
  );
}

export default Register;
