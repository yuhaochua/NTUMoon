import React, { Component } from "react"
import { DayPilotCalendar } from "@daypilot/daypilot-lite-react"
import "../styles/calendarStyles.css"

class Calendar extends Component {
  constructor(props) {
    super(props)
    this.calendarRef = React.createRef()
    this.first_click = true
    this.state = {
      viewType: "Resources",
      businessBeginsHour: 8,
      businessEndsHour: 20,
      heightSpec: "BusinessHoursNoScroll",
      durationBarVisible: false,
      onEventClick: async (args) => {
        if (this.first_click) {
          this.props.timetableCallBack(args.e.text())
          console.log(this.props.events)
          this.loadCalendarData()
          this.first_click = !this.first_click
        } else {
          this.props.timetableCallBack(args.e.text())
          //console.log(this.props.events)
          //this.loadCalendarData()
          this.first_click = !this.first_click
        }
      },

      autoRefreshInterval: 0.3,
      autoRefreshMaxCount: 0.2,
      autoRefreshEnabled: true,
    }
  }
  loadCalendarData() {
    const startDate = "2000-01-01"
    const columns = [
      { name: "Monday", id: "mon" },
      { name: "Tuesday", id: "tue" },
      { name: "Wednesday", id: "wed" },
      { name: "Thursday", id: "thu" },
      { name: "Friday", id: "fri" },
      { name: "Saturday", id: "sat" },
      { name: "Sunday", id: "sun" },
    ]

    const events = this.props.events
    console.log("hello")
    this.calendar.update({ startDate, columns, events })
  }

  componentDidMount() {
    this.loadCalendarData()
  }
  get calendar() {
    return this.calendarRef.current.control
  }
  render() {
    return <DayPilotCalendar {...this.state} ref={this.calendarRef} />
  }
}

export default Calendar
