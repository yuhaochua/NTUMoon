import SideNavBar from "../components/sideNavBar";
import React, { Component } from "react";
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import "../styles/timetable.css";
import Calendar from "../components/Calendar";
const Timetable = () => {
    const events = [
        {
            id: 1,
            text: "Event 1",
            start: "2023-03-07T10:30:00",
            end: "2023-03-07T13:00:00",
        },
        {
            id: 2,
            text: "Event 2",
            start: "2023-03-08T09:30:00",
            end: "2023-03-08T11:30:00",
            backColor: "#6aa84f",
        },
        {
            id: 3,
            text: "Event 3",
            start: "2023-03-08T12:00:00",
            end: "2023-03-08T15:00:00",
            backColor: "#f1c232",
        },
        {
            id: 4,
            text: "Event 4",
            start: "2023-03-06T11:30:00",
            end: "2023-03-06T14:30:00",
            backColor: "#cc4125",
        },
    ];

    const startDate = "2023-03-07";

    return (
        <div className="timetable">
            <SideNavBar></SideNavBar>
            <div className="timetable-cont">
                <Calendar></Calendar>
            </div>
        </div>
    );
};

export default Timetable;
