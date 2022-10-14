import { useEffect, useState } from "react";
import SideNavBar from "../components/sideNavBar";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import "../styles/timetable.css";

import Paper from "@mui/material/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
    Scheduler,
    DayView,
    WeekView,
    Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";

const Timetable = () => {
    const currentDate = "2018-11-01";
    const schedulerData = [
        {
            startDate: "2018-11-01T09:45",
            endDate: "2018-11-01T11:00",
            title: "Meeting",
        },
        {
            startDate: "2018-11-01T12:00",
            endDate: "2018-11-01T13:30",
            title: "Go to a gym",
        },
        {
            startDate: "2018-11-02T14:00",
            endDate: "2018-11-02T15:30",
            title: "CZ3002",
        },
    ];
    const [date, setDate] = useState(new Date());
    return (
        <div className="timetable">
            <SideNavBar></SideNavBar>
            <div className="timetable-cont">
                <Paper>
                    <Scheduler data={schedulerData}>
                        <ViewState
                            currentDate={currentDate}
                            defaultCurrentViewName="Week"
                        />
                        <DayView startDayHour={9} endDayHour={17} />
                        <WeekView startDayHour={10} endDayHour={19} />
                        <Appointments />
                    </Scheduler>
                </Paper>
            </div>
        </div>
    );
};

export default Timetable;
