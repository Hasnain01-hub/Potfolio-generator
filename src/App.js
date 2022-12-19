import { GridLoader } from "react-spinners";
import { motion } from "framer-motion/dist/framer-motion";

import { React, Suspense, lazy, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { auth, db } from "./helpers/Firebase";

import { toast } from "react-hot-toast";

const Login = lazy(() => import("./pages/Auth/Login"));
const Template3 = lazy(() => import("./pages/Templates/Template3"));
const Template2 = lazy(() => import("./pages/Templates/Template2"));
const ProfileComplete = lazy(() => import("./pages/Profile/ProfileComplete"));
const Register = lazy(() => import("./pages/Auth/Register"));
const Template1 = lazy(() => import("./pages/Templates/Template1"));
const Home = lazy(() => import("./pages/Home/Home"));
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

var randomColor = "#000000".replace(/0/g, function () {
  return (~~(Math.random() * 16)).toString(16);
});

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        await db
          .collection("users")
          .doc(user.email)
          .get()
          .then(async (doc) => {
            if (doc && doc.exists) {
              var separatedString1 = doc.data();

              dispatch({
                type: "USERS_LOGGED",
                payload: {
                  name: separatedString1.name,
                  email: separatedString1.email,
                  token: idTokenResult.token,
                  userid: separatedString1.userid ?? false,
                  role: separatedString1.role,
                  id: separatedString1.email,
                },
              });
            }
          })
          .catch((error) => {
            toast.error(error.message);
          });
      }
      return () => unsubscribe();
    });
  }, [dispatch]);
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Suspense
          fallback={
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
                cssOverride={override}
                size={75}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              <h2>Loading...</h2>
            </div>
          }
        >
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profilecomplete" component={ProfileComplete} />
            <Route exact path="/template1/:id" component={Template1} />
            <Route exact path="/template2/:id" component={Template2} />
            <Route exact path="/template3/:id" component={Template3} />
          </Switch>
          <div className="go-top">
            <i className="ri-arrow-up-s-line" />
          </div>
        </Suspense>
      </motion.div>
    </>
  );
}

export default App;
