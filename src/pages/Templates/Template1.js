import React, { useEffect } from "react";
import { motion } from "framer-motion/dist/framer-motion";

import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { GridLoader } from "react-spinners";
import dummyData from "../../assets/data.json";
import About from "../../components/Template1/About";
import Contact from "../../components/Template1/Contact";
import Footer from "../../components/Template1/Footer";
import Hero from "../../components/Template1/Hero";
import NavBar from "../../components/Template1/NavBar";
import { db } from "../../helpers/Firebase";

const userData = dummyData.userData;

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

var randomColor = "#000000".replace(/0/g, function () {
  return (~~(Math.random() * 16)).toString(16);
});

const Template1 = () => {
  const [data, setData] = React.useState();

  const id = useParams();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    if (id.id !== "1") {
      const loaddata = async () => {
        return await db.collection("users").where("userid", "==", id.id).get();
      };
      loaddata()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setData(doc.data());
            setLoading(true);
            // if (doc.data() == undefined) {
            //   setData(userData);
            // }
          });
          setLoading(false);
        })
        .catch(() => {});
    } else {
      setData(userData);
      setLoading(false);
    }
  }, [id.id]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {loading === false ? (
          <div>
            <Helmet>
              <link
                rel="stylesheet"
                type="text/css"
                href="/assets/css/bootstrap.min.css"
              />
              <link
                rel="stylesheet"
                type="text/css"
                href="/assets/css/plugins.css"
              />
              <link
                rel="stylesheet"
                type="text/css"
                href="/assets/revolution/css/settings.css"
              />
              <link
                rel="stylesheet"
                type="text/css"
                href="/assets/revolution/css/layers.css"
              />
              <link
                rel="stylesheet"
                type="text/css"
                href="/assets/revolution/css/navigation.css"
              />
              <link
                rel="stylesheet"
                type="text/css"
                href="/assets/type/icons.css"
              />
              <link rel="stylesheet" type="text/css" href="/style.css" />
              <link
                rel="stylesheet"
                type="text/css"
                href="/assets/css/color/green.css"
              />
              <link
                href="https://fonts.googleapis.com/css?family=Rubik:300,300i,400,400i,500,500i,700,700i"
                rel="stylesheet"
              />
            </Helmet>
            <div className="content-wrapper">
              <NavBar data={data} />
              <Hero data={data} />
              <About data={data} />
              <Contact data={data} />
            </div>
            <Footer data={data} />
          </div>
        ) : (
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
              loading={loading}
              cssOverride={override}
              size={75}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            <h2>Loading Your Template! Please Be Patient</h2>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default Template1;
