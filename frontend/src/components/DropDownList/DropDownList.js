import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { UserContext } from "../../App";
import "./DropDownList.css";
const DropDownList = () => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };

    return (

        <div className="dropdown">
            <button onClick={handleOpen}>Dropdown</button>
            {open ? (
                <ul className="menu">
                    <li className="menu-item">
                        <button>my profile</button>
                    </li>
                    <li className="menu-item">
                        <button>edite my profile</button>
                    </li>
                    <li className="menu-item">
                        <button>my campaign</button>
                    </li>
                    <li className="menu-item">
                        <button>my contribution</button>
                    </li>
                </ul>
            ) : null}
        </div>

    )
}

export default DropDownList