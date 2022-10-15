import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import SideNavBar from "../components/sideNavBar";
import "../styles/settings.css";

const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
};

const Settings = () => {
    const [oldPassword, checkOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [cfmPassword, checkCfmPassword] = useState("");
    const { user } = useAuthContext();

    const onSubmit = (e) => {
        e.preventDefault();
        if (!newPassword) {
            alert("Please add a password");
            return;
        } else if (!cfmPassword) {
            alert("Please confirm password");
            return;
        } else if (newPassword === cfmPassword) {
            alert("Passwords dont match");
            return;
        }
    };

    return (
        <div className="settings">
            <SideNavBar></SideNavBar>

            <div className="settings-cont col-10 form">
                <div className="settings-title">Settings</div>
                {/* <div className="form form-control">Enter password here</div> */}
                <div className="settings-description">
                    Please Enter your current password to change your password.
                </div>
                <div className="settings-line"></div>

                <div className="settings-fields">
                    <label className="col-3">Current Password: </label>
                    <input
                        className="col-4"
                        type="text"
                        placeholder="Enter password here"
                        value={oldPassword}
                        onChange={(e) => checkOldPassword(e.target.value)}
                    />
                </div>
                <div className="settings-line"></div>
                <div className="settings-fields">
                    <label className="col-3">New Password: </label>
                    <input
                        className="col-4"
                        type="text"
                        placeholder="Enter password here"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div className="settings-line"></div>

                <div className="settings-fields">
                    <label className="col-3">Confirm Password: </label>
                    <input
                        className="col-4"
                        type="text"
                        placeholder="Enter password here"
                        value={cfmPassword}
                        onChange={(e) => checkCfmPassword(e.target.value)}
                    />
                </div>
                <div className="settings-line"></div>
            </div>
        </div>
    );
};

export default Settings;
