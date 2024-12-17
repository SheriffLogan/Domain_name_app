import React from "react";
import header_icon from "../assets/header_icon.jpg"

const Header = () => {
    return(
        <div className="flex flex-col h-32 justify-center items-center">
            <div className="flex mr-24">
                <img 
                    src={header_icon}
                    alt="header-image"
                    className="h-24 mt-3"
                />
                <span className="font-bold mt-6 text-6xl">SYD</span>
            </div>
            <span className="text-base tracking-normal hover:tracking-wide hover:font-bold">Search Your Domain</span>
        </div>
    )
}

export default Header;