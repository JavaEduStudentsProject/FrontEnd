import React from 'react';

function SocialNetworkIcons() {
    return (
        <div className="icon-container">
            <a href="#" onClick={() => console.log("Redirect to inst page")}><i className="fa-brands fa-instagram"></i></a>
            <a href="#" onClick={() => console.log("Redirect to youtube")}><i className="fa-brands fa-youtube"></i></a>
            <a href="#" onClick={() => console.log("Redirect to twitter")}><i className="fa-brands fa-twitter"></i></a>
            <a href="#" onClick={() => console.log("Redirect to vk page")}><i className="fa-brands fa-vk"></i></a>
            <a href="#" onClick={() => console.log("Redirect to whatsapp number")}><i className="fa-brands fa-whatsapp"></i></a>
            <a href="#" onClick={() => console.log("Redirect to telegram account")}><i className="fa-brands fa-telegram"></i></a>
        </div>
    );
};

export default SocialNetworkIcons;