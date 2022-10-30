import React, {useState} from "react";
import Modal from "./Modal";
import AuthService from "../services/auth.service";
import {EditUserForm} from "../../hooks/EditUserForm";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import axios from "axios";
import {NavLink} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    const [user] = useState(AuthService.getCurrentUser())
    const navigate =useNavigate();

    const [modalActive, setModalActive] = useState(false)

    const [file, setFile] = useState()

    function handleChange(event) {
        setFile(event.target.files[0])
    }

    function handleSubmit(event) {
        event.preventDefault()
        const url = 'http://localhost:8085/api/auth/image';
        const formData = new FormData();
        formData.append('file', file);
        // formData.append('fileName', file.name);
        // const config = {
        //     headers: {
        //         'content-type': 'multipart/form-data',
        //     },
        // };
        axios.post(url, formData, user.id).then((response) => {
            localStorage.setItem("user", JSON.stringify(user))
            navigate("/profile")
            window.location.reload();
        });

    }

    return (
      <div>
          <div>
              <header className="jumbotron">
                  <h2>
                      Profile   <strong>{user.username}</strong>
                  </h2>
                  <br></br>
              </header>

              {/*    <h1>React File Upload</h1>*/}
              {/*    <input type="file" onChange={handleChange}/>*/}
              {/*    <button type="submit">Upload</button>*/}


              <NavLink className="avatarIcon">
                  <Avatar alt="Пользователь" src={`/img/${user.image}`} onChange={handleChange}/>
              </NavLink>

              <br></br>

              <h3>
                  <strong>Email:</strong> {user.email}
              </h3>
              <br></br>
              <h3>
                  <strong>LastName:</strong> {user.lastname}
              </h3>
              <br></br>
              <h3>
                  <strong>FirstName:</strong> {user.firstname}
              </h3>
              <br></br>
              <h3>
                  <strong>Phone:</strong> {user.phone}
              </h3>
              <br></br>
              <h3>
                  <strong>Country:</strong> {user.country}
              </h3>
              <br></br>
              <h3>
                  <strong>Date of Birth:</strong> {user.dateOfBirth}
              </h3>
              <br></br>

              <button className='open-btn' onClick={() => setModalActive(true)}
              >Редактировать юзера</button>

      </div>
    <div>
        <Modal active={modalActive}
               setActive={setModalActive}>
            <div>
                <EditUserForm
                    currentUser={user}
                />
            </div>
            </Modal>
    </div>

</div>
  );
};

export default Profile;
