import React, { useRef, useState } from "react";
import "./UploadProfile.css";
import { IoIosImages } from "react-icons/io";
import { ImageCropper } from "./ImageCropper";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../../Feature/UserSlice/UserSlice";
import { getAuth, updateProfile } from "firebase/auth";

export const UploadProfile = ({ setOpen }) => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const user = useSelector((user) => user.logIn.login);
  const storage = getStorage();
  const storageRef = ref(storage, user.uid);
  const choosefile = useRef();
  const [image, setImage] = useState();
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setLoading(true);
      setCropData(cropper.getCroppedCanvas().toDataURL());
      const message4 = cropper.getCroppedCanvas().toDataURL();
      uploadString(storageRef, message4, "data_url").then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          }).then(() => {
            setOpen(false);
            dispatch(LoginUser({ ...user, photoURL: downloadURL }));
            localStorage.setItem(
              "users",
              JSON.stringify({ ...user, photoURL: downloadURL })
            );
            setLoading(false);
          });
        });
      });
    }
  };

  return (
    <div>
      <input type="file" hidden ref={choosefile} onChange={handleChange} />
      <div className="upload">
        <div className="upload-icon" onClick={() => choosefile.current.click()}>
          <IoIosImages />
        </div>
        {image && (
          <ImageCropper
            image={image}
            setCropper={setCropper}
            cropData={cropData}
            setImage={setImage}
            getCropData={getCropData}
            loading={loading}
          />
        )}

        <p>Upload Photo</p>
      </div>
    </div>
  );
};
