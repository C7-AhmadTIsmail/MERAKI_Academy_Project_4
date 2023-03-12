import NavDropdown from "react-bootstrap/NavDropdown";
import "./DropDownList.css";
import React from "react";

const DropDownList = () => {

    return (

        <div className="dropDown">
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/MyProfile">MyProfile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/MyCampaign">MyCampaign</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/MyContribution">MyContribution</NavDropdown.Item>
            </NavDropdown>
        </div>

    )
}

export default DropDownList








