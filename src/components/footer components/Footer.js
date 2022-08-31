import {React, useContext, useState} from "react"
import SocialNetworkIcons from "./SocialNetworkIcons";
import {useParams} from 'react-router-dom'
import {
    FilterArrayContext,
    ImmutableProductListContext,
    PriceFilterArrayContext,
    ProductListContext
} from "../../services/Context";

export default function Footer() {
    let c = "\u00A9";





    return (
        <footer className="footer">
            <h4 className="copyright">{c} 2022 Elisey K Team development. All rights reserved.</h4>
            <SocialNetworkIcons/>
        </footer>
    )
}