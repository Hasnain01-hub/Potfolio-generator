import React, { useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import dummyData from "../../assets/data.json";
import Contact from "../../components/Template3/Contact";
import Footer from "../../components/Template3/Footer";
import Hero from "../../components/Template3/Hero";
import MainSection from "../../components/Template3/MainSection";
import { db } from "../../helpers/Firebase";

const userData = dummyData.userData;

const Template3 = () => {
  const [data, setData] = React.useState();

  const id = useParams();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (id.id !== "1") {
      loaddata()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setData(doc.data());
            setLoading(true);
            // if (doc.data() == undefined) {
            //   setData(userData);
            // }
          });
          setLoading(true);
        })
        .catch(() => {});
    } else {
      setData(userData);
      setLoading(true);
    }
  }, []);
  const loaddata = async () => {
    return await db.collection("users").where("userid", "==", id.id).get();
  };
  return (
    <>
      <Hero data={data} />
      <MainSection data={data} />
      <Contact data={data} />
      <Footer data={data} />
    </>
  );
};

export default Template3;
