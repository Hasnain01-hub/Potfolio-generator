import React, { useEffect } from "react";
import { motion } from "framer-motion/dist/framer-motion";

import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import GridLoader from "react-spinners/GridLoader";
import dummyData from "../../assets/data.json";
import Hero from "../../components/Template2/Hero";
import MainSection from "../../components/Template2/MainSection";
import NavBar from "../../components/Template2/Navbar";
import { db } from "../../helpers/Firebase";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
const userData = dummyData.userData;

var randomColor = "#000000".replace(/0/g, function () {
  return (~~(Math.random() * 16)).toString(16);
});

const Template2 = () => {
  const [instagram, setinstagram] = React.useState({});
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
          querySnapshot.forEach(async (doc) => {
            setData(doc.data());
            let headersList = {
              Accept: "application/json",
              "Content-Type": "application/json;charset=UTF-8",
            };
            const insta = await fetch(
              `https://www.instagram.com/${
                doc.data().instagram
              }/?__a=1&__d=dis`,
              { method: "GET", headers: headersList }
            );
            setinstagram(insta.json());
            console.log();
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
          <>
            <div>
              <section
                data-bs-version="5.1"
                className="menu menu1 cid-tdxNLfJYL6"
                once="menu"
                id="menu01-1"
              >
                <NavBar data={data} />
              </section>
              <section
                data-bs-version="5.1"
                className="header3 cid-tdxNMUdm2F"
                id="header03-2"
              >
                <Hero data={data} />
              </section>
              <MainSection data={data} />
            </div>
          </>
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

export default Template2;
