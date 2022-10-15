import React, { Component } from "react";
import { DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import "../styles/calendarStyles.css";

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.calendarRef = React.createRef();
        this.state = {
            viewType: "Resources",
            businessBeginsHour: 8,
            businessEndsHour: 20,
            heightSpec: "BusinessHoursNoScroll",
            durationBarVisible: false,
        };
    }

    loadCalendarData() {
        const startDate = "2000-01-01";
        const columns = [
            { name: "Monday", id: "mon" },
            { name: "Tuesday", id: "tue" },
            { name: "Wednesday", id: "wed" },
            { name: "Thursday", id: "thu" },
            { name: "Friday", id: "fri" },
            { name: "Saturday", id: "sat" },
            { name: "Sunday", id: "sun" },
        ];
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
        this.calendar.update({ startDate, columns, events });
        // this.time_converter(events);
    }
    // time_converter(array) {
    //     array.map((obj) => (
    //         var tempArray = obj.start.str.split("T");
    //         console.log(tempArray);
    //         ));
    // }

    componentDidMount() {
        this.loadCalendarData();
    }
    get calendar() {
        return this.calendarRef.current.control;
    }
    render() {
        return <DayPilotCalendar {...this.state} ref={this.calendarRef} />;
    }
}

export default Calendar;
