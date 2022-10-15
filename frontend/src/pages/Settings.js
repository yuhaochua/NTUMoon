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
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext();

    const handleSubmit = async(e) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)
        if (!newPassword) {
            alert("Please add a password")
            return;
        } else if (!cfmPassword) {
            alert("Please confirm password")
            return;
        } else if (newPassword !== cfmPassword) {
            alert("Passwords dont match")
            return;
        }
        
        const response = await fetch('http://localhost:3001/api/user/changePassword', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${dispatch.token}`
              },
            body: JSON.stringify({oldPassword, newPassword})

        })
        const json = await response.json()

        if(!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok) {
            // //save user to local storage
            // localStorage.setItem('user', JSON.stringify(json)) //store string in local storage, json is an object with jwt and username property
            
            // //update auth context
            // dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
        }


    };
    return (
        <form className="settings" onSubmit={handleSubmit}>
            <SideNavBar></SideNavBar>

            <div className="settings-cont col-10">
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

                <div className="settings-btn">
                    <button className="btn" onClick={handleSubmit}>
                        Update Password
                    </button>
                </div>
                {error && <div className="error">{error}</div>}
            </div>
        </form>
    );
};

export default Settings;
