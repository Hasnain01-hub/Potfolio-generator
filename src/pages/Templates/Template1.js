import React, { useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import dummyData from "../../assets/data.json";
import About from "../../components/Template1/About";
import Contact from "../../components/Template1/Contact";
import Footer from "../../components/Template1/Footer";
import Hero from "../../components/Template1/Hero";
import NavBar from "../../components/Template1/NavBar";
import { db } from "../../helpers/Firebase";

const userData = dummyData.userData;

const Template1 = () => {
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
          })
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
      {loading ? (
        <div>
          <div className="content-wrapper">
            <NavBar data={data} />
            <Hero data={data} />
            <About data={data} />
            <Contact data={data} />
          </div>
          <Footer data={data} />
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <i class="ri-refresh-line rotate"></i>
        </div>
      )}
    </>
  );
};

export default Template1;
