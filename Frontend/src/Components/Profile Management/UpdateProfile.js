import React from "react";
import "./UpdateProfile.css";
import { useState, useEffect } from "react";
import axios from "axios";
import "react-dropdown/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";

/* Author : Faiza Umatiya */

const UpdateProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [bio, setBio] = useState("");
  const loggedinEmail = localStorage.getItem("email");
  console.log("printing logged in email");
  console.log(loggedinEmail);

  const photoUpload = async (event) => {
    const selectedFile = event.target.files[0];
    const base64 = await convertToBase64(selectedFile);
    console.log("printing base64 ");
    console.log(base64);
    setPhoto(base64);
  };

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  // Fetch user data from the backend
  useEffect(() => {
    axios
      .get(
        `https://cook-with-dal-final.onrender.com/api/users/getUser/${loggedinEmail}`
      )
      .then((response) => {
        console.log(response);
        setFirstName(response.data.user.firstName);
        setLastName(response.data.user.lastName);
        setEmail(response.data.user.email);
        setPhoto(response.data.user.photo);
        setBio(response.data.user.bio);

        const photoPath = response.data.user.photo;
        console.log(photoPath);
        const image = photoPath.replace("uploads\\", "");
      })
      .catch((error) => console.log(error));
  }, [loggedinEmail]);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a new FormData object
    const formData = new FormData();

    // Append the updated user details to the FormData object
    console.log(firstName);
    // console.log("==", photo, "===", photo.name);
    // formData.append('photo', photo, photo.name);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    // formData.append('email', email);
    formData.append("bio", bio);
    // if (photo instanceof File) {
    formData.append("photo", photo);
    // }

    // const userData = {firstName,lastName,bio,photo}

    console.log(formData);
    console.log(loggedinEmail);

    // Send a PUT request to the backend API to update the user details
    await axios
      .put(
        `https://cook-with-dal-final.onrender.com/api/users/updateUser/${loggedinEmail}`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        console.log("User updated successfully:", response.data);
        navigate("/profilepage");
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  const navigate = useNavigate();

  //https://blog.logrocket.com/react-onclick-event-handlers-guide/

  function deactivatemsg() {
    alert("Profile deactivated successfully");
    navigate("/feed");
  }
  function activatemsg() {
    alert("Profile activated successfully");
    navigate("/profilepage");
  }

  return (
    <MDBContainer className="py-5 h-100">
      <MDBRow className="justify-content-center align-items-center h-100">
        <MDBCol lg="10" xl="10">
          <div className="update-profile">
            <form onSubmit={handleSubmit} id="update-details-form">
              <h2 className="text-dark">User Information</h2>

              <div className="form-group row mt-2">
                <div className="logo mb-4">
                  <img
                    src={photo}
                    width="150"
                    height="160"
                    alt="displaypicture"
                  />
                </div>
              </div>

              <div className="form-group row mt-2">
                <label
                  className="text-dark fw-bold col-sm-4 col-form-label"
                  htmlFor="First Name"
                >
                  First Name:
                </label>
                <div className="col-sm-8">
                  <input
                    className="form-control"
                    type="text"
                    id="title"
                    value={firstName}
                    defaultValue="Abby"
                    onChange={(event) => setFirstName(event.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group row mt-2">
                <label
                  className="text-dark fw-bold col-sm-4 col-form-label"
                  htmlFor="lastname"
                >
                  Last Name:
                </label>
                <div className="col-sm-8">
                  <input
                    className="form-control"
                    type="text"
                    id="lastname"
                    value={lastName}
                    defaultValue="Johns"
                    onChange={(event) => setLastName(event.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group row mt-2">
                <label
                  className="text-dark fw-bold col-sm-4 col-form-label"
                  htmlFor="emailid"
                >
                  Email id:
                </label>
                <div className="col-sm-8">
                  <input
                    className="form-control"
                    type="email"
                    value={loggedinEmail}
                    id="emailid"
                    disabled={true}
                    // defaultValue="abby.johns@gmail.com"
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group row mt-2">
                <label
                  className="text-dark fw-bold col-sm-4 col-form-label"
                  htmlFor="preference"
                >
                  Bio:
                </label>
                <div className="col-sm-8">
                  <textarea
                    className="form-control"
                    // type="text"
                    value={bio}
                    id="bio"
                    onChange={(event) => setBio(event.target.value)}
                    // defaultValue="Johns"
                  />
                </div>

                {/* <div className="col-sm-8">
                  <Dropdown
                    options={options}
                    value={defaultOption}
                    placeholder="Select an option"
                  />
                </div> */}
              </div>

              <div className="form-group row mt-2">
                <label
                  className="text-dark fw-bold col-sm-4 col-form-label"
                  htmlFor="profile picture"
                >
                  Profile Picture:
                </label>
                <div className="col-sm-8">
                  <input
                    className="form-control"
                    type="file"
                    id="upload-image"
                    // value={photo}
                    onChange={photoUpload}
                  />
                </div>
              </div>

              <div className="mt-4 mb-4">
                <button
                  className="btn btn-light mt-2"
                  // onClick={activatemsg}
                  type="submit"
                >
                  Save
                </button>
                &nbsp; &nbsp; &nbsp;
                {/* <button
                  className="btn btn-dark mt-2"
                  // onClick={deactivatemsg}
                  type="submit"
                >
                  Deactivate Account
                </button> */}
              </div>
              {/* {error && <p>{error}</p>}
              {success && <p>{success}</p>} */}
            </form>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default UpdateProfile;
