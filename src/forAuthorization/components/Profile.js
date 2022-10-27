import React, {useState} from "react";
import Modal from "./Modal";
import AuthService from "../services/auth.service";
import {EditUserForm} from "../../hooks/EditUserForm";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

const Profile = () => {
    const [user] = useState(AuthService.getCurrentUser())

    const [modalActive, setModalActive] = useState(false)

  return (
      <div>
          <div>
              <header className="jumbotron">
                  <h2>
                      Profile   <strong>{user.username}</strong>
                  </h2>
                  <br></br>
              </header>
              <Stack className="avatarIcon">
                  <Avatar alt="Пользователь" src={user.image} />
              </Stack>
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
