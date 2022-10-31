import React, {useState, useMemo} from 'react'
import AuthService from "../forAuthorization/services/auth.service";
import {useNavigate} from "react-router-dom";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import CountryDropdown from 'country-dropdown-with-flags-for-react';
import {TextField} from "@mui/material";

const EditUserForm = props => {
    const navigate =useNavigate();
    const [lastname, setLastname] = useState(props.currentUser.lastname);
    const [firstname, setFirstname] = useState(props.currentUser.firstname);
    const [phone, setPhone] = useState(props.currentUser.phone);
    const [country, setCountry] = useState(props.currentUser.country);
    const [dateOfBirth, setDateOfBirth] = useState(props.currentUser.dateOfBirth);
    // registerLocale('ru',ru);
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
            "country": country,
            "dateOfBirth": dateOfBirth
        })
            return {
                user
            }
        }, [lastname, firstname,phone, country, dateOfBirth]
    )

    const handleSubmit = e => {
        e.preventDefault()

        if (!user.lastname || !user.firstname || !user.phone || !user.country || !user.dateOfBirth) return
        {
            AuthService.updateUser(lastname, firstname,phone, country, dateOfBirth,  props.currentUser.id).then(
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
            <label>Фамилия</label>
            <input
                type="text"
                name="lastname"
                value={lastname}
                onChange= {(e)=> setLastname(e.target.value.replace(/[^A-Za-z]/g, ''))}
            />
            <br></br>
            <label>Имя</label>
            <input
                type="text"
                name="firstname"
                value={firstname}
                onChange= {(e)=> setFirstname(e.target.value.replace(/[^A-Za-z]/g, ''))}
            />
            <br></br>
            <label>Номер телефона</label>
            <div>
                <PhoneInput
                    country={'ru'}
                    value={phone}
                    onChange={phone => setPhone( "+" + phone )}
                />

            </div>

            <br/>
            <label>Страна</label>
            <br/>
            <CountryDropdown
                value={country}
                handleChange={e => setCountry(e.target.value)}/>
            <br/>
            <label>Дата рождения</label>

            <br/>
            <TextField
                id="date"
                label="Birthday"
                type="date"
                defaultValue={dateOfBirth ? dateOfBirth : "2017-05-24"}
                onChange={e => setDateOfBirth(e.target.value)}/>
            <br/>
            <button className="btn-update"
                   onClick={(e)=> {
                        handleSubmit(e)
                    }}
            >
               Обновить юзера</button>
        </form>
    )
}

export { EditUserForm }
