import React, {useState} from 'react';
import "./modal.css"
import {EditUserForm} from "../../hooks/EditUserForm";
import AuthService from "../services/auth.service";



const Modal = ({active, setActive, children}) => {
    const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser())


    return (
        <div className={active? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className={active? "modal__content active" : "modal__content"} onClick={event => event.stopPropagation()}>
                {children}
                <div>
                    <EditUserForm
                        currentUser={currentUser}
                    />
                </div>
            </div>

        </div>

    );
};

export default Modal;

