import React, { useState } from "react";
import img from "../../images/istockphoto-1214428300-170667a.jpg"
import Modal from "./Modal";
import CreateAvatar from "./CreateAvatar";

const ProfilePhoto = ({ getData, imageSrc }) => {
    const [modal, setModal] = useState(false)
    const handleToggleClick = () => {
        getData( imageSrc);
        setModal(true)
    };

    return (
        <div className="avatarIcon">
            <button
                type="button"
                onClick={handleToggleClick}
                className="avatarIcon"
            >
                    <img
                        alt="preview"
                        src={imageSrc? imageSrc: img}
                        className="rounded-circle"
                    />

            </button>

            <div>
                <Modal active={modal}
                       setActive={setModal}>

                        <div>
                        <CreateAvatar getData={getData} />
                        </div>

                </Modal>
            </div>
        </div>

    );
};

export default ProfilePhoto;
