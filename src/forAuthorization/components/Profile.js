import React, {useState} from "react";
import Modal from "./Modal";
import AuthService from "../services/auth.service";
import {EditUserForm} from "../../hooks/EditUserForm";

const Profile = () => {
    const [user] = useState(AuthService.getCurrentUser())

    const [modalActive, setModalActive] = useState(false)

  return (
      <div>
          <div>
              <header className="jumbotron">
                  <h3>
                      <strong>{user.username}</strong> Profile
                  </h3>
              </header>
              <p>
                  <strong>Id:</strong> {user.id}
              </p>
              <p>
                  <strong>Email:</strong> {user.email}
              </p>
              <p>
                  <strong>LastName:</strong> {user.lastname}
              </p>
              <p>
                  <strong>FirstName:</strong> {user.firstname}
              </p>
              <p>
                  <strong>Phone:</strong> {user.phone}
              </p>
              <p>
                  <strong>Image:</strong> {user.image}
              </p>
              <strong>Authorities:</strong>
              <ul>
                  {user.roles &&
                      user.roles.map((role, index) => <li key={index}>{role}</li>)}
              </ul>
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
