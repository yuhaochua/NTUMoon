import { Link } from "react-router-dom";
import  '../styles/sideNavBar.css';

function SideNavBar() {
    return (
        <div className="nav-cont">
            <ul >
                <li> <Link to="/timetable"><span>Timetable</span></Link></li>
                <li><Link to="/account"><span> Account</span></Link></li>
                <li> <Link to="/settings"><span>Settings</span></Link></li>
            </ul>

        </div>
    );
}

export default SideNavBar;