import SideNavBar from "../components/sideNavBar"
import React, { useState, useEffect } from "react"
import "../styles/timetable.css"
import Calendar from "../components/Calendar"
import { useAuthContext } from "../hooks/useAuthContext"
const Timetable = () => {
  const { user } = useAuthContext()
  const [courses, setCourses] = useState("")
  var totalAu = 0
  useEffect(() => {
    const fetchMods = async () => {
      const response = await fetch(
        "http://localhost:3001/api/courses/getUserCourses",
        {
          method: "GET",
          Accept: "application/json",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      const json = await response.json()

      if (response.ok) {
        setCourses(json)
      } else {
        console.log("error")
      }
    }
    fetchMods()
  }, [])
  {
    courses &&
      courses.map((course) => {
        console.log(course.details[0].day)
        totalAu += course.au
      })
  }
  var i = 0
  // const createEvent = (courses) => {
  //   var event = {}
  //   {
  //     courses &&
  //       courses.map((course) => {
  //         event.id = i
  //         event.text = course.courseCode
  //       })
  //   }
  //   console.log(event)
  // }

  //console.log(courses)
  //console.log(courses[0].courseCode)
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
  //     }
  //   )
  //   const json = await response.json()

  //   if (response.ok) {
  //     setCourses(json)
  //   } else {
  //     console.log("error")
  //   }
  // }
  // fetchMods()
  // console.log(courses)
  // raw_json = fetchMods()
  // const printAddress = () => {
  //   fetchMods().then((a) => {
  //     raw_events.push(a)
  //   })
  // }
  // printAddress()
  // console.log(raw_json)

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
            <div className="timetable-line"></div>
            <div className="mt-3">Total AU: {totalAu}</div>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Timetable
