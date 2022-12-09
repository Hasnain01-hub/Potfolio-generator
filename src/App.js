import { React, Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { auth, db } from "./Firebase";
import Home from "./Home/Home";
import Login from "./Home/Login";
import Signup from "./Home/Signup";
import Register from "./Home/userDashboard/Register";
import Port1 from "./Portfolios/Port1";

function App() {
  const dispatch = useDispatch();
  var separatedString1;
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        await db
          .collection("users")
          // .where('uid', '==', user.email)
          .doc(user.email)
          .get()
          .then(async (doc) => {
            if (doc && doc.exists) {
              separatedString1 = doc.data();

              dispatch({
                type: "USERS_LOGGED",
                payload: {
                  name: separatedString1.name,
                  email: separatedString1.email,
                  token: idTokenResult.token,
                  role: separatedString1.role,
                  id: separatedString1.email,
                },
              });
              await db
                .collection("user-profile")
                // .where('uid', '==', user.email)
                .doc(user.email)
                .get()
                .then((doc) => {
                  if (doc && doc.exists) {
                    var profiledata = doc.data();
                    //use separatedString
                    dispatch({
                      type: "REGISTER_INFO",
                      payload: {
                        name: profiledata.name,
                        email: profiledata.email,
                        images: profiledata.images,
                        loaction: profiledata.loaction,
                        youtube: profiledata.youtube,
                        insta: profiledata.insta,
                        id: profiledata.id,
                      },
                      // REGISTER_INFO
                    });
                  }
                });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
      return () => unsubscribe();
    });
  }, [dispatch]);
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/first-portfolio" component={Port1} />
      </Switch>
      <div className="go-top">
        <i className="ri-arrow-up-s-line" />
      </div>
    </>
  );
}

export default App;
