import SideNavBar from "../components/sideNavBar";
import React, { Component } from "react";
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import "../styles/timetable.css";
import Calendar from "../components/Calendar";
const Timetable = () => {
    const events = [
        {
            id: 1,
            text: "CZ4031",
            start: "2000-01-01T03:30:00",
            end: "2000-01-01T05:30:00",
            backColor: "#fcb711",
            resource: "mon",
        },
        {
            id: 2,
            text: "CZ3002",
            start: "2000-01-01T02:00:00",
            end: "2000-01-01T04:00:00",
            backColor: "#f37021",
            resource: "tue",
        },
        {
            id: 3,
            text: "MDP",
            start: "2000-01-01T00:30:00",
            end: "2000-01-01T02:30:00",
            backColor: "#f37021",
            resource: "fri",
        },
    ];



    return (
        <div className="timetable">
            <SideNavBar></SideNavBar>
            <div className="timetable-cont">
                <div className = "col-10">
                    <Calendar events = {events}></Calendar>
                </div>
                <div className = "col-2 timetable-courses">
                    <ul>
                        <label className="pb-3">Courses Registered: </label>
                        <li>
                            CZ3004
                        </li>
                        <li>
                            CZ3002
                        </li>
                        <li>
                            CZ4062
                        </li>
                    </ul>
                    <div style = {{background: 'black',}}>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default Timetable;
