import React, { useState, useEffect } from "react";
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
          name: user.email.split("@")[0],
          role: "user",
          email: user.email,
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
      toast.success("Registration Successful");
      history.push("/");
    } catch (err) {
      toast.error("Registration Failed");
    }
  };

  return (
    <>
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
    </>
  );
}

export default Register;
