import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import Page from "./asset/pagenotfound.json";

import "./errorpage.css";
import { Link, useHistory } from "react-router-dom";
const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  let history = useHistory();
  const style = {
    errorpage: {
      maxWidth: "80%",
      marginLeft: "auto",
      marginRight: "auto",
    },
    topsp: {
      marginTop: "21vh",
    },
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    //redirect when count is equal to 0
    count === 0 && history.push("/");
    //clean
    return () => clearInterval(interval);
  }, [count, history]);
  return (
    <div className="container p-5 text-center" style={style.topsp}>
      <p>Redirecting you in {count} seconds</p>
      <Lottie animationData={Page} loop={true} style={style.errorpage} />
    </div>
  );
};

export default LoadingToRedirect;
