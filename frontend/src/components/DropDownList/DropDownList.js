import React from "react";
import { Link } from "react-router-dom";
import "./DropDownList.css";
const DropDownList = () => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };

    return (

        <div className="dropDown">
            <button className="DropDownButton" onClick={handleOpen}>Dropdown</button>
            {open ? (
                <ul className="menu">
                    <li className="menu-item">
                        <Link onClick={handleOpen} to="/MyProfile"> MyProfile </Link>
                    </li>
                    <li className="menu-item">
                        <Link onClick={handleOpen} to="/MyCampaign"> MyCampaign </Link>
                    </li>
                    <li className="menu-item">
                        <Link onClick={handleOpen} to="/MyContribution"> MyContribution </Link>
                    </li>
                </ul>
            ) : null}
        </div>

    )
}

export default DropDownList


