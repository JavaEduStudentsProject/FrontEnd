import React, {useState} from 'react';
import "./modal.css"
import {EditUserForm} from "../../hooks/EditUserForm";
import AuthService from "../services/auth.service";
import {useNavigate} from "react-router-dom";



const Modal = ({active, setActive, children}) => {
    const navigation =useNavigate();
    const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser())
    const initialFormState = {id: "", name: '', email: '', password: "", roles: []}

    const [newUser, setNewUser] = useState(initialFormState)

    const updateUser = (id, currentUser) => {
        setCurrentUser(newUser.map(newUser => (newUser.id === id ? currentUser : newUser)))
    }
    const editRow = newUser => {
        setNewUser({ id: newUser.id, name: newUser.name, email: newUser.email, password: newUser.password, roles: newUser.roles})
        console.log(newUser)
        AuthService.updateUser(newUser).then((response)=>{
            navigation('/profile')
        }).catch(error=>{
            console.log(error)
        })
    }
    return (
        <div className={active? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className={active? "modal__content active" : "modal__content"} onClick={event => event.stopPropagation()}>
                {children}
                <div>
                    <EditUserForm
                        currentUser={currentUser}
                        updateUser={updateUser}
                        editRaw={editRow}
                    />
                </div>
            </div>

        </div>

    );
};

export default Modal;

