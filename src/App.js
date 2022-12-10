import { React, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { auth, db } from "./Firebase";
import Home from "./Home/Home";
import Login from "./Home/Login";
import Signup from "./Home/Signup";
import Register from "./Home/userDashboard/Register";
import Portfolio1 from "./Portfolios/Portfolio1";

function App() {
  const dispatch = useDispatch();

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
              var separatedString1 = doc.data();

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
                        id: profiledata.id,
                        name: profiledata.name,
                        instagram: profiledata.instagram,
                        email: user.email,
                        youtube: profiledata.youtube,
                        phone: profiledata.phone,
                        location: profiledata.location,
                        images: profiledata.images,
                        achievenemt: profiledata.achievenemt,
                        profession: profiledata.profession,
                        whychooseme: profiledata.whychooseme,
                        aboutme: profiledata.aboutme,
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
        <Route exact path="/first-portfolio/:id" component={Portfolio1} />
      </Switch>
      <div className="go-top">
        <i className="ri-arrow-up-s-line" />
      </div>
    </>
  );
}

export default App;
