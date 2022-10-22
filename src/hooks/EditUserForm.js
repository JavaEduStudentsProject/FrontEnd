import React, {useEffect, useState} from 'react'
import AuthService from "../forAuthorization/services/auth.service";
import {useNavigate} from "react-router-dom";

const EditUserForm = props => {
    const navigation =useNavigate();
    const [user, setUser] = useState(props.currentUser);

    // useEffect(
    //     () => {
    //         // вызывай данную функцию
    //         setUser(props.currentUser)
    //     },
    //     [props] // всегда, если изменились props
    // )

    const handleInputChange = event => {
        const { name, value } = event.target

        setUser({ ...user, [name]: value })
    }

    const handleSubmit = event => {
        event.preventDefault()
        if (!user.username || !user.email) return
        props.updateUser(user.id, user)
    }
    return (
        <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleInputChange}
            />
            <label>Email</label>
            <input
                type="text"
                name="email"
                value={user.email}
                onChange={handleInputChange}
            />
            <br/>
            <button className="btn-update"
                    onClick={() => {
                        console.log(user)
                        props.editRaw(user)
                    //     AuthService.updateUser(user).then((response)=>{
                    //        navigation('/profile')
                    //    }).catch(error=>{
                    //        console.log(error)
                    //    })
                    }}
            >Обновить юзера</button>
            <button
                className="button muted-button"
            >
                Отменить изменения
            </button>
        </form>
    )
}

export { EditUserForm }
