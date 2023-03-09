import React from "react";
import {  Link } from "react-router-dom";
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
                        <Link to="/MyProfile"> MyProfile </Link>
                    </li>
                    <li className="menu-item">
                        <Link to="/MyCampaign"> MyCampaign </Link>
                    </li>
                    <li className="menu-item">
                        <Link to="/MyContribution"> mycontribution </Link>
                    </li>
                </ul>
            ) : null}
        </div>

    )
}

export default DropDownList


