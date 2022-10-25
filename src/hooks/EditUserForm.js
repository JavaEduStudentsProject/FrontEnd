import React, {useEffect, useState, useMemo} from 'react'
import AuthService from "../forAuthorization/services/auth.service";
import {useNavigate} from "react-router-dom";


const EditUserForm = props => {
    const navigate =useNavigate();

    const [username, setUsername] = useState(props.currentUser.username);
    const [email, setEmail] = useState(props.currentUser.email);

    const {user} = useMemo(() => {
        let user = ({
            "id": props.currentUser.id,
            "username": username,
            "email": email,
            "roles": props.currentUser.roles
        })
        console.log(user)
            return {
                user
            }
        }, [username, email]
    )

    localStorage.setItem("user", JSON.stringify(user))

    const handleSubmit = e => {
        e.preventDefault()
        if (!user.username || !user.email) return
        {
            AuthService.updateUser(username, email, props.currentUser.id).then(
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
            <label>Name</label>
            <input
                type="text"
                name="username"
                value={username}
                onChange= {(e)=> setUsername(e.target.value)}
            />
            <label>Email</label>
            <input
                type="text"
                name="email"
                value={email}
                onChange= {(e)=> setEmail(e.target.value)}
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
