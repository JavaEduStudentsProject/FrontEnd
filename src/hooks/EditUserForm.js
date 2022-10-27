import React, {useEffect, useState, useMemo} from 'react'
import AuthService from "../forAuthorization/services/auth.service";
import {useNavigate} from "react-router-dom";


const EditUserForm = props => {
    const navigate =useNavigate();

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
        console.log(user)
            return {
                user
            }
        }, [lastname, firstname,phone]
    )

    localStorage.setItem("user", JSON.stringify(user))

    const handleSubmit = e => {
        e.preventDefault()
        if (!user.lastname || !user.firstname || !user.phone) return
        {
            AuthService.updateUser(lastname, firstname,phone, props.currentUser.id).then(
                () => {
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
            <label>FirstName</label>
            <input
                type="text"
                name="firstname"
                value={firstname}
                onChange= {(e)=> setFirstname(e.target.value)}
            />
            <label>Phone</label>
            <input
                type="tel"
                data-tel-input
                maxLength={18}
                name="firstname"
                value={phone}
                onChange= {(e)=> setPhone(e.target.value)}
            />
            <br/>
            <button className="btn-update"
                   onClick={(e)=> {
                        handleSubmit(e)

                    }}
            >
               Обновить юзера</button>
            <button
                className="button muted-button"
            >
                <a href="/profile">Отменить изменения</a>

            </button>
        </form>
    )
}

export { EditUserForm }
