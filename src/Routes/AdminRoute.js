import React, { useEffect, useState } from "react";
import { Outlet, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import { db } from "../Firebase";


const AdminRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);
  var separatedString;
  useEffect(async () => {
    if (user && user.email) {
      await db
        .collection("users")
        .doc(user.email)
        .get()
        .then((doc) => {
          if (doc && doc.exists) {
            separatedString = doc.data();
            //use separatedString
          }
          if (separatedString.role == "admin") {
            setOk(true);
          }
        })
        .catch((err) => {
          alert("admin access denied");
          console.log(err);
          setOk(false);
        });
    }
  }, [user]);

  return ok ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default AdminRoute;
