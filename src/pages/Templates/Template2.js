import React, { useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import dummyData from "../../assets/data.json";
import Hero from "../../components/Template2/Hero";
import MainSection from "../../components/Template2/MainSection";
import NavBar from "../../components/Template2/Navbar";
import { db } from "../../helpers/Firebase";

const userData = dummyData.userData;

const Template2 = () => {
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
      {loading ? (
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
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <i class="ri-refresh-line rotate"></i>
        </div>
      )}
    </>
  );
};

export default Template2;
