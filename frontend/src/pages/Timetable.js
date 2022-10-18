import SideNavBar from "../components/sideNavBar"
import React, { useState, useEffect } from "react"
import "../styles/timetable.css"
import Calendar from "../components/Calendar"
import { useAuthContext } from "../hooks/useAuthContext"
import { useAddToTimetable } from "../hooks/useAddToTimetable"
import { useDeleteFromTimetable } from "../hooks/useDeleteFromTimetable"
import { useUserCoursesContext } from "../hooks/useUserCoursesContext"

const Timetable = () => {
  const { user } = useAuthContext()
  const { mod, error, isLoading, success } = useAddToTimetable()
  const { dmod, delError, isLoadingDel, delSuccess } = useDeleteFromTimetable()
  const { userCourses, dispatchCourses } = useUserCoursesContext()

  // const [courses, setCourses] = useState(null) // courses that the user has registered
  const [allCourses, setAllCourses] = useState(null) // all courses in database, to look for index
  const [events, setEvents] = useState("")
  const [addedMods, setAddedMods] = useState(null)
  // const [idEvent , setId] = useState("")
  var idEvent
  var totalAu = 0
  const backColor = {
    CZ4031: "#f37021",
    CZ3002: "#6aa84f",
    CZ4062: "#f1c232",
    CZ3004: "#cc4125",
    CZ3005: "#FFB6C1",
  }
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
        dispatchCourses({ type: "FETCH_COURSES", payload: json })
        // setCourses(json)
        setEvents(createEvent(json)) // I JUST MOVED line 67 and 68 here and it works
        // console.log(json)
        // console.log(events)
      } else {
        console.log("error")
      }
    }
    fetchMods()

    const fetchIndex = async () => {
      const response = await fetch(
        "http://localhost:3001/api/courses/"
      ) /* will eventually want to fetch specific course id */
      const json1 = await response.json()

      if (response.ok) {
        setAllCourses(json1)
      }
    }
    fetchIndex()
    var i = 0
    const createEvent = (courses) => {
      // convert the fetched userCourses into correct format for Calendar component
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
                obj.venue +
                "\n" +
                courseIndex
              if (obj.type === "lec") {
                event.text =
                  text +
                  "\n" +
                  obj.timeStart +
                  "-" +
                  obj.timeEnd +
                  "\n" +
                  obj.venue +
                  "\n" +
                  "LECTR"
              }
              event.start = convertText(obj.timeStart)
              event.end = convertText(obj.timeEnd)
              event.resource = obj.day
              event.backColor = backColor[text]
              event.index = text + "  |  " + courseIndex
              event.type = obj.type
              module.push(event)
            })
          })
      }
      return module
    }
  }, [])

  useEffect(() => {
    let addedMods1 = [] // stores the added mods
    events &&
      events.map((obj) => {
        var temp = obj.index

        if (!addedMods1.includes(temp)) {
          addedMods1.push(temp)
        }
      })
    setAddedMods(addedMods1)
  }, [events])

  {
    userCourses &&
      userCourses.map((obj) => {
        obj.map((course) => {
          totalAu += course.au
        })
      })
  }
  const convertText = (x) => {
    // converting timing from backend to match calendar format
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

  // const getIndexClicked = (courses) => { // returns index of whichever mod(registered by user) was clicked
  //   var idEvent2 = idEvent.substring(0, 6) // course code, e.g. CZ4031
  //   for (var i = 0; i < courses.length; i++) {
  //     if (courses[i].courseCode === idEvent2) {
  //       return courses[i].index
  //     }
  //   }
  // }

  const eventExists = (events, indexNotClicked) => {
    var bool = false
    events &&
      events.map((obj) => {
        if (obj.type !== "lec") {
          var temp2 = obj.index.substring(11, 16) // to retrieve index
          var notClicked = indexNotClicked.toString()
          console.log("enter")
          console.log(temp2)
          console.log(notClicked)
          if (notClicked == temp2) {
            console.log("true")
            bool = true
          }
        }
      })
    return bool
  }

  const onIndexClick = (courses, allCourses, events, indexClicked) => {
    // updates the events to be displayed on calendar
    var idEvent2 = idEvent.substring(0, 6) // course code
    // var indexClicked = getIndexClicked(courses) // all index of what was being clicked
    var indexArray = []
    for (var i = 0; i < allCourses.length; i++) {
      if (allCourses[i].courseCode == idEvent2) {
        // check for match between all courses and what was being clicked
        for (var j = 0; j < allCourses[i].indexes.length; j++) {
          // go through all indexes of the clicked course
          if (
            allCourses[i].indexes[j].index != indexClicked && // check for index that is different from what was clicked
            !eventExists(events, allCourses[i].indexes[j].index) // check if the calendar already has the index
          ) {
            //this if statement is buggy because it does not consider if a course has been added to an event after clicking the same mod a few times. ***SOLVED***
            console.log("enter if")
            for (
              var k = 0;
              k < allCourses[i].indexes[j].details.length - 1; // loops through the lab and tut
              k++
            ) {
              var coursetemp = allCourses[i] //specific course that was being clicked
              var event = {}
              event.id = parseInt(coursetemp._id) // this whole chunk until before indexArray.push(event) is formatting the event to be placed into calendar
              event.text =
                coursetemp.courseCode +
                "\n" +
                coursetemp.indexes[j].details[k].timeStart +
                "-" +
                coursetemp.indexes[j].details[k].timeEnd +
                "\n" +
                coursetemp.indexes[j].details[k].venue +
                "\n" +
                coursetemp.indexes[j].index
              event.start = convertText(
                coursetemp.indexes[j].details[k].timeStart
              )
              event.end = convertText(coursetemp.indexes[j].details[k].timeEnd)
              event.resource = coursetemp.indexes[j].details[k].day
              event.backColor = backColor[coursetemp.courseCode] // this line decides the color of the event
              event.index =
                coursetemp.courseCode + "  |  " + coursetemp.indexes[j].index
              event.type = coursetemp.indexes[j].details[k].type

              indexArray.push(event) // what is this for??
              events.push(event) // add the new(not exactly new but more like alternate) index into calendar
              console.log("events after FIRST CLICK", events)
            }
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

  const onIndexClick2 = async (courses, allCourses, events, indexClicked) => {
    // updates the events to be displayed on calendar
    var idEvent2 = idEvent.substring(0, 6) // course code
    // var indexClicked = getIndexClicked(courses) // all index of what was being clicked
    for (var i = 0; i < allCourses.length; i++) {
      if (allCourses[i].courseCode == idEvent2) {
        // check for match between all courses and what was being clicked
        for (var j = 0; j < allCourses[i].indexes.length; j++) {
          // go through all indexes of the clicked course
          if (allCourses[i].indexes[j].index != indexClicked) {
            // check for index that is different from what was clicked
            for (
              var k = 0;
              k < allCourses[i].indexes[j].details.length - 1;
              k++
            ) {
              // remove both tut and lab
              var coursetemp = allCourses[i] //specific course that was being clicked
              var event =
                coursetemp.courseCode + "  |  " + coursetemp.indexes[j].index // used to identify the event to be removed
              let x = 0
              let index = -1
              events.map((obj) => {
                //search through events to find even to be removed
                if (obj.index === event && obj.type !== "lec") {
                  // if the event to be removed matches
                  index = x
                }
                x++
              })
              // come up with something to remove the other indexes from events

              if (index > -1) {
                // only remove if there is something to remove
                events.splice(index, 1)
              }
              console.log("events after SECOND CLICK", events)
            }
          }
        }
      }
    }

    // DELETE AND ADD BACK IN BACKEND
    let registeredIndex
    courses.map((course) => {
      if (course.courseCode === coursetemp.courseCode) {
        registeredIndex = course.index
      }
    })
    await dmod(coursetemp.courseCode, registeredIndex)
    await mod(coursetemp.courseCode, indexClicked)

    // update addedMods
    let spliceIndex
    spliceIndex = addedMods.indexOf(event)
    if (spliceIndex > -1) {
      addedMods.splice(spliceIndex, 1)
    }

    if(!addedMods.includes(coursetemp.courseCode + "  |  " + indexClicked)){
      addedMods.push(coursetemp.courseCode + "  |  " + indexClicked)
    }

    // console.log(indexArray)
    // console.log(events)
    // console.log(typeof events[0])
  }

  var first_click = true
  const callbackHandler = (data) => {
    let indexClicked = data.substr(-5)
    if (indexClicked === "LECTR") {
      // to prevent clicking on lecture mess up things
      return
    }
    if (first_click) {
      idEvent = data
      console.log(idEvent)
      console.log(allCourses)
      onIndexClick(userCourses, allCourses, events, indexClicked)
      first_click = !first_click
    } else {
      if (data.substring(0, 6) != idEvent.substring(0, 6)) {
        // to prevent wrong mod getting clicked on second time
        return
      }
      idEvent = data
      // console.log("SECOND CLICK DATA", data.substr(-5))
      console.log("second click") //end point for second click
      onIndexClick2(userCourses, allCourses, events, indexClicked) // to remove other indexes from calendar
      first_click = !first_click
    }
  }

  return (
    <div className="timetable">
      <SideNavBar></SideNavBar>
      <div className="timetable-cont">
        <div className="col-10">
          {events && (
            <Calendar
              events={events}
              timetableCallBack={callbackHandler}
            ></Calendar>
          )}
        </div>
        <div className="timetable-courses">
          <ul>
            <label className="pb-3">Courses Registered: </label>
            {addedMods && addedMods.map((mod) => <li key={mod}>{mod}</li>)}
            <div className="timetable-line"></div>
            <div className="mt-3">Total AU: {totalAu}</div>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Timetable
