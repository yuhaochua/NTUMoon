import SideNavBar from "../components/sideNavBar"
import React, { useState, useEffect } from "react"
import "../styles/timetable.css"
import Calendar from "../components/Calendar"
import { useAuthContext } from "../hooks/useAuthContext"
const Timetable = () => {
  const { user } = useAuthContext()
  const [courses, setCourses] = useState(null)
  const [allCourses, setAllCourses] = useState(null)
  const [events, setEvents] = useState("")
  // const [idEvent , setId] = useState("")
  var idEvent
  var totalAu = 0
  const backColor = [
    "#f37021",
    "#f37021",
    "#6aa84f",
    "#f1c232",
    "#cc4125",
    "#cc4125",
  ]
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
        setEvents(createEvent(json)) // I JUST MOVED line 67 and 68 here and it works
        // console.log(json)
        // console.log(events)
      } else {
        console.log("error")
      }
    }
    fetchMods()

    const fetchIndex = async () => {
      const response = await fetch('http://localhost:3001/api/courses/') /* will eventually want to fetch specific course id */
      const json1 = await response.json()

      if (response.ok) {
        setAllCourses(json1)
      }
    }
    fetchIndex()
    var i = 0
    const createEvent = (courses) => {
      var module = []
      {
        courses &&
          courses.map((course) => {
            // const id = i
            const text = course.courseCode
            const courseIndex = course.index
            i = i + 1
            course.details.map((obj) => {
              var event = {}
              event.id = parseInt(obj._id)
              event.text =
                text +
                "\n" +
                obj.timeStart +
                "-" +
                obj.timeEnd +
                "\n" +
                obj.venue
              event.start = convertText(obj.timeStart)
              event.end = convertText(obj.timeEnd)
              event.resource = obj.day
              event.backColor = backColor[i]
              event.index = text + "  |  " + courseIndex
              module.push(event)
            })
          })
      }
      return module
    }
    // console.log(createEvent(courses))
    // setEvents(createEvent(courses))
  }, [])

  {
    courses &&
      courses.map((course) => {
        // console.log(course.details[0].day)
        totalAu += course.au
      })
  }
  const convertText = (x) => {
    var intX = parseInt(x)
    intX = intX - 800
    var minutes = intX % 100
    var hours = Math.floor(intX / 100)
    var strMin = minutes.toString()
    var strHours = hours.toString()
    if (strMin === "0") {
      strMin = strMin.concat("0")
    }
    if (strHours.length === 1) {
      strHours = "0" + strHours
    }
    var actualTime = "2000-01-01T" + strHours + ":" + strMin + ":00"
    return actualTime
  }

  const addedMods = []
  {
    events &&
      events.map((obj) => {
        var temp = obj.index

        var temp2 = obj.index.substring(0,6)
        if (!addedMods.includes(temp)) {
          addedMods.push(temp)
        }
      })
  }

  const getIndexClicked = (courses) => {
    var idEvent2 = idEvent.substring(0,6)
    for (var i=0;i<courses.length;i++) {
      if(courses[i].courseCode === idEvent2) {
        return courses[i].index
      }
    }
  }

  const eventExists = (events, indexNotClicked) => {
    var bool = false
    events &&
    events.map((obj) => {
      var temp2 = obj.index.substring(11,16)
      var notClicked = indexNotClicked.toString()
      console.log("enter")
      console.log(temp2)
      console.log(notClicked)
      if(notClicked == temp2) {
        console.log("true")
        bool = true
      }
    })
    return bool
  }

  const onIndexClick = (courses, allCourses, events) => {
    var idEvent2 = idEvent.substring(0,6)
    var indexClicked = getIndexClicked(courses)
    var indexArray = []
    for (var i=0;i<allCourses.length;i++) {
      if(allCourses[i].courseCode == idEvent2) {
        for (var j=0;j<allCourses[i].indexes.length;j++) {
          if(allCourses[i].indexes[j].index != indexClicked && !eventExists(events, allCourses[i].indexes[j].index)) { //this if statement is buggy because it does not consider if a course has been added to an event after clicking the same mod a few times
            console.log("enter if")
            var coursetemp = allCourses[i]
            var event = {}
            event.id = parseInt(coursetemp._id)
            event.text = 
              coursetemp.courseCode + 
              "\n" + 
              coursetemp.indexes[j].details[0].timeStart + 
              "-" + 
              coursetemp.indexes[j].details[0].timeEnd + 
              "\n" + 
              coursetemp.indexes[j].details[0].venue
            event.start = convertText(coursetemp.indexes[j].details[0].timeStart)
            event.end = convertText(coursetemp.indexes[j].details[0].timeEnd)
            event.resource = coursetemp.indexes[j].details[0].day
            event.backColor = backColor[0]
            event.index = coursetemp.courseCode + "  |  " + coursetemp.indexes[j].index

            indexArray.push(event)
            events.push(event)
            console.log(events)
            // console.log(event)
            // console.log(typeof event)
            // setEvents((pre) => {
            //   return [...pre, event]
            // })
          }
        }
      }
    }
  
    // console.log(indexArray)
    // console.log(events)
    // console.log(typeof events[0])
  }

  const callbackHandler = (data) => {
    idEvent = data
    console.log(idEvent)
    console.log(events)
    onIndexClick(courses, allCourses, events)
  }


  return (
    <div className="timetable">
      <SideNavBar></SideNavBar>
      <div className="timetable-cont">
        <div className="col-10">
          {events && (
            <Calendar
              events={events}
              timetableCallBack = {callbackHandler}
            ></Calendar>
          )}
        </div>
        <div className="timetable-courses">
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
