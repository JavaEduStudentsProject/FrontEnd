import React, {useEffect, useState, useMemo, useRef} from 'react'
import AuthService from "../forAuthorization/services/auth.service";
import {useNavigate} from "react-router-dom";
import InputMask from "react-input-mask";
import {TextField} from "@mui/material";

const EditUserForm = props => {
    const navigate =useNavigate();
    const inputNameRef = useRef();
    const [lastname, setLastname] = useState(props.currentUser.lastname);
    const [firstname, setFirstname] = useState(props.currentUser.firstname);
    const [phone, setPhone] = useState(props.currentUser.phone);

    const {user} = useMemo(() => {
        let user = ({
            "id": props.currentUser.id,
            "username": props.currentUser.username,
            "email": props.currentUser.email,
            "roles": props.currentUser.roles,
            "lastname": lastname,
            "firstname": firstname,
            "phone": phone,
            "image": props.currentUser.image,

        })
            return {
                user
            }
        }, [lastname, firstname,phone]
    )

    const handleSubmit = e => {
        e.preventDefault()


        if (!user.lastname || !user.firstname || !user.phone) return
        {
            AuthService.updateUser(lastname, firstname,phone, props.currentUser.id).then(
                () => {
                    localStorage.setItem("user", JSON.stringify(user))
                    navigate("/profile")
                    window.location.reload();
                }).catch(error => {
                console.log(error)
            })
        }
    }

    return (
        <form >
            <label>LastName</label>
            <input
                type="text"
                name="lastname"
                value={lastname}
                onChange= {(e)=> setLastname(e.target.value)}
            />
            <br></br>
            <label>FirstName</label>
            <input
                type="text"
                name="firstname"
                value={firstname}
                onChange= {(e)=> setFirstname(e.target.value)}
            />
            <br></br>
            <label>Phone</label>
            <div>
                <InputMask
                    mask="+7 (999) 999 99 99"
                    value={phone}
                    disabled={false}
                    maskChar=" "
                    onChange= {(e)=> setPhone(e.target.value)}
                >
                </InputMask>
            </div>

            <br/>
            <button className="btn-update"
                   onClick={(e)=> {
                        handleSubmit(e)

                    }}
            >
               Обновить юзера</button>
            {/*<button*/}
            {/*    className="button muted-button"*/}
            {/*>*/}
            {/*    <a href="/profile">Отменить изменения</a>*/}

            {/*</button>*/}
        </form>
    )
}

export { EditUserForm }
