import React from "react";
import { useSelector } from "react-redux";
import dummyData from '../../assets/data.json'
import About from "../../components/Template1/About";
import Contact from "../../components/Template1/Contact";
import Footer from "../../components/Template1/Footer";
import Hero from "../../components/Template1/Hero";
import NavBar from "../../components/Template1/NavBar";

const userData = dummyData.userData;

const Template1 = () => {
  const { portfolio } = useSelector((state) => ({ ...state }));
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    if (portfolio && portfolio.id) {
      setData(portfolio);
      setLoading(true);
    } else {
      setData(userData);
      setLoading(true);
    }
  }, [portfolio]);
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

export default Template1
