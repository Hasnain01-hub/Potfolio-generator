import { React, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { auth, db } from "./helpers/Firebase";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ProfileComplete from "./pages/Profile/ProfileComplete";
import Template1 from "./pages/Templates/Template1";
import { toast } from "react-hot-toast";

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
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profilecomplete" component={ProfileComplete} />
        <Route exact path="/template1/:id" component={Template1} />
      </Switch>
      <div className="go-top">
        <i className="ri-arrow-up-s-line" />
      </div>
    </>
  );
}

export default App;
