import React from "react"
import SocialNetworkIcons from "./SocialNetworkIcons";

export default function Footer() {
    let c = "\u00A9";
    return (
        <footer className="footer-items">
            <h4 className="copyright">{c} 2022 DevEducation Team development. All rights reserved.</h4>
            <SocialNetworkIcons/>
        </footer>
    )
}