import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { GridLoader } from "react-spinners";
import dummyData from "../../assets/data.json";
import Footer from "../../components/Template3/Footer";
import Hero from "../../components/Template3/Hero";
import MainSection from "../../components/Template3/MainSection";
import { db } from "../../helpers/Firebase";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

var randomColor = "#000000".replace(/0/g, function () {
  return (~~(Math.random() * 16)).toString(16);
});

const userData = dummyData.userData;

const Template3 = () => {
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
      {loading === false ? (
        <>
          <Helmet>
            <link
              rel="stylesheet"
              href="/assets/temp3/assets/web/assets/mobirise-icons-bold/mobirise-icons-bold.css"
            />
            <link
              rel="stylesheet"
              href="/assets/temp3/assets/web/assets/mobirise-icons2/mobirise2.css"
            />
            <link
              rel="stylesheet"
              href="/assets/temp3/assets/web/assets/mobirise-icons/mobirise-icons.css"
            />
            <link
              rel="stylesheet"
              href="/assets/temp3/assets/tether/tether.min.css"
            />
            <link
              rel="stylesheet"
              href="/assets/temp3/assets/bootstrap/css/bootstrap.min.css"
            />
            <link
              rel="stylesheet"
              href="/assets/temp3/assets/bootstrap/css/bootstrap-grid.min.css"
            />
            <link
              rel="stylesheet"
              href="/assets/temp3/assets/bootstrap/css/bootstrap-reboot.min.css"
            />
            <link
              rel="stylesheet"
              href="/assets/temp3/assets/as-pie-progress/css/progress.min.css"
            />
            <link
              rel="stylesheet"
              href="/assets/temp3/assets/dropdown/css/style.css"
            />
            <link
              rel="stylesheet"
              href="/assets/temp3/assets/formstyler/jquery.formstyler.css"
            />
            <link
              rel="stylesheet"
              href="/assets/temp3/assets/formstyler/jquery.formstyler.theme.css"
            />
            <link
              rel="stylesheet"
              href="/assets/temp3/assets/datepicker/jquery.datetimepicker.min.css"
            />
            <link
              rel="stylesheet"
              href="/assets/temp3/assets/socicon/css/styles.css"
            />
            <link
              rel="stylesheet"
              href="/assets/temp3/assets/theme/css/style.css"
            />
            <link
              rel="stylesheet"
              href="/assets/temp3/assets/formoid-css/recaptcha.css"
            />
            <link
              rel="preload"
              as="style"
              href="/assets/temp3/assets/mobirise/css/mbr-additional.css"
            />
            <link
              rel="stylesheet"
              href="/assets/temp3/assets/mobirise/css/mbr-additional.css"
              type="text/css"
            />
          </Helmet>
          <Hero data={data} />
          <MainSection data={data} />
          <Footer data={data} />
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
    </>
  );
};

export default Template3;
