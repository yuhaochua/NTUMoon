import SideNavBar from "../components/sideNavBar"
import React, { Component } from "react"
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react"
import "../styles/timetable.css"
import Calendar from "../components/Calendar"
import { useParams } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"
const Timetable = () => {
  const { user } = useAuthContext()
  let { type, timeStart, timeEnd, day, venue, id } = useParams()
  // const fetchMods = async () => {
  //   const response = await fetch(
  //     "http://localhost:3001/api/courses/getUserCourses",
  //     {
  //       method: "GET",
  //       Accept: "application/json",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //       // body: JSON.stringify({
  //       //   type: type,
  //       //   timeStart: timeStart,
  //       //   timeEnd: timeEnd,
  //       //   day: day,
  //       //   venue: venue,
  //       //   _id: id,
  //       // }),
  //     }
  //   )
  //   const json = await response.json()
  //   console.log(json)

  //   if (response.ok) {
  //     console.log(json)
  //   } else {
  //     console.log("error")
  //   }
  // }
  // fetchMods()

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
  ]

  const addedMods = []
  events.map((obj) => {
    if (!addedMods.includes(obj.text)) {
      addedMods.push(obj.text)
    }
  })

  // const clickEvent = async () => {
  //   console.log(events.id)
  //   console.log("hello")
  // }

  return (
    <div className="timetable">
      <SideNavBar></SideNavBar>
      <div className="timetable-cont">
        <div className="col-10">
          <Calendar
            events={events}
            onEventClick={(args) => {
              console.log(args.e.text())
            }}
          ></Calendar>
        </div>
        <div className="col-2 timetable-courses">
          <ul>
            <label className="pb-3">Courses Registered: </label>
            {addedMods.map((mod) => (
              <li key={mod}>{mod}</li>
            ))}
          </ul>
          <div style={{ background: "black" }}></div>
        </div>
      </div>
    </div>
  )
}

export default Timetable
