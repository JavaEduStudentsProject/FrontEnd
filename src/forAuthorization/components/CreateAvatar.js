import React, { useState,useMemo } from "react";
import Avatar from "react-avatar-edit";
import {useNavigate} from "react-router-dom";
import AuthService from "../services/auth.service";

const CreateAvatar = ({ getData }) => {
    const [preview, setPreview] = useState("");
    const navigate =useNavigate();
    const user = JSON.parse(localStorage.getItem('user'))
    console.log(user)
    const {userUpdate} = useMemo(() => {
            let userUpdate = ({
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "roles": user.roles,
                "lastname": user.lastname,
                "firstname": user.firstname,
                "phone": user.phone,
                "image": preview,
                "country": user.country,
                "dateOfBirth": user.dateOfBirth
            })
            return {
                userUpdate
            }
        }, [preview]
    )


    const onCrop = preview => {
        setPreview(preview);
    };

    const onClose = () => {
        setPreview("");
    };

    const onBeforeFileLoad = () => {

    };

    const onSelectPic = (e) => {
        e.preventDefault()

        getData( preview);
        console.log(userUpdate)

        AuthService.imageUser(preview.toString(), user.id).then(
            () => {
                console.log(user.id)

                localStorage.setItem("user", JSON.stringify(userUpdate))
                window.location.reload();
            }).catch(error => {
            console.log(error)
        })

    }

    return (
        <div className="createAvatarDiv_content m-auto">
        <div className="container">
            <div className="row mx-auto my-3">
                <div className="col-md-6 m-auto">
                    <div
                        className="mx-auto my-4 choose-file"
                        // style={{ overflow: "scroll" }}
                    >
                        <Avatar
                            imageWidth={270}
                            width={"100%"}
                            height={180}
                            onCrop={onCrop}
                            onClose={onClose}
                            onBeforeFileLoad={onBeforeFileLoad}
                        />
                    </div>
                </div>
                <div className="col-md-6 m-auto">
                    <div className="previewDiv rounded-circle m-auto">
                        {/*{preview && (*/}
                            <img
                                alt="preview"
                                src={preview}
                                width="100%"
                                height="100%"
                                className="rounded-circle"
                            />
                        {/*)}*/}
                    </div>
                </div>
            </div>
            <div className="row">

                <div className="col-6">
                    <button
                        type="button"
                        className="btn btn-success btn-md float-right mr-2 mb-3 text-center"
                        onClick={onSelectPic}
                        disabled={!preview}
                        style={{ minWidth: "100px" }}
                    >
                        Ok
                    </button>
                </div>
            </div>
        </div>
    </div>

);
};

export default CreateAvatar;
