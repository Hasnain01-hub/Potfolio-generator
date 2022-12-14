import React, { lazy } from "react";
import Resizer from "react-image-file-resizer";

const cloudinary = require("cloudinary/lib/cloudinary");
lazy(async () => await import(`${cloudinary}`));

cloudinary.config({
  cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
  api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
});

const UploadFile = ({ loading, values, setValues, setLoading }) => {
  var image_id;

  //to upload images to cloudinary
  const upload = async (uri) => {
    var result = await cloudinary.uploader.upload(uri, {
      public_id: `${Date.now()}`,
      resource_type: "auto",
    });
    return result;
  };
  //to remove uploaded images to cloudinary
  const remove = async (public_id) => {
    image_id = public_id;
    cloudinary.uploader.destroy(image_id, (err, result) => {
      if (err) return;
      // alert( err );
      alert("ok");
    });
  };

  const fileUploadAndResize = (e) => {
    let files = e.target.files;
    let allUploadedFiles = values.images;
    if (files) {
      console.log(files);
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            upload(uri)
              .then((res) => {
                setLoading(false);
                allUploadedFiles.push(res);
                setValues({ ...values, images: allUploadedFiles });
              })
              .catch((err) => {
                setLoading(false);
              });
          },
          "base64"
        );
      }
    }
  };
  const handleImageRemove = (public_id) => {
    setLoading(true);
    remove(public_id)
      .then((res) => {
        setLoading(false);
        const { images } = values;
        let filteredImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setValues({ ...values, images: filteredImages });
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <>
      {!loading ? (
        <div className="row">
          {values.images &&
            values.images.map((image) => (
              <>
                <div className="col-md-3">
                  <i
                    style={{
                      position: "relative",
                      left: "90%",
                      cursor: "pointer",
                    }}
                    onClick={() => handleImageRemove(image.public_id)}
                    className="ri-close-line"
                  ></i>
                  <img
                    src={image.url}
                    width={100}
                    // shape="square"
                    className="ml-3"
                    alt="images"
                  />
                </div>
              </>
              // <Badge
              //   count="X"
              //   key={image.public_id}
              //   onClick={() => handleImageRemove(image.public_id)}
              //   style={{ cursor: "pointer" }}
              // >
              //   <Avatar
              //     src={image.url}
              //     size={100}
              //     shape="square"
              //     className="ml-3"
              //   />
              // </Badge>
            ))}
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <i class="ri-refresh-line rotate"></i>
        </div>
      )}
      <br />
      <div className="row">
        <label
          style={{
            padding: "8px",
            borderRadius: "10px",
            transition: ".4s ease all",
            width: "200px",
            textAlign: "center",
          }}
          className=" btn-primary btn-raised"
        >
          Choose Files
          <input
            type="file"
            name="images"
            className="input-field"
            hidden
            multiple
            accept="images/*"
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </>
  );
};

export default UploadFile;
