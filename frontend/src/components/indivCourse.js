import { useAddToTimetable } from "../hooks/useAddToTimetable"
import { useAddUserCourse } from "../hooks/useAddUserCourse"
import { useDeleteFromTimetable } from "../hooks/useDeleteFromTimetable"
import { useEffect, useState } from "react"

const IndivCourse = ({ course, userCourses }) => {
    const {mod, error, isLoading, success} = useAddToTimetable()
    const {dmod, delError, isLoadingDel, delSuccess} = useDeleteFromTimetable()
    const {userCourse, coursesError, isLoadingCourses} = useAddUserCourse()
    const [inUserCourses, setInUserCourses] = useState(false)
    const [userIndex, setUserIndex] = useState('')

    const handleSubmit = async(e) => {
      e.preventDefault()  
      inUserCourses ? await dmod(course.courseCode, userIndex) : await mod(course.courseCode, course.indexes[0].index)
      await userCourse()

      setInUserCourses(!inUserCourses)
      // if(!error){
      //   var elem = document.getElementById("addTT")
      //   elem.value = "Added!"
      // }
    }

    useEffect(() => {
      userCourses && userCourses.map(obj => (
        obj && obj.map(usrCourse => {
          if(course.courseCode === usrCourse.courseCode) {
            setInUserCourses(true)
            setUserIndex(usrCourse.index)
          }
        })
      ))
    },[])

  return (
    <div className="container-md mt-5">
      <div className="row">
        <h1 className="indv-course-code">{course.courseCode}</h1>
        <h2>{course.courseTitle}</h2>        
        <p>{course.au} AUs</p>    
        <hr class="solid"></hr>
      </div>
      <div className="row">
        <div className="col-9">
          <p>{course.description}</p>
          <p><strong>Prerequisites: </strong>
            {course.prerequisites && course.prerequisites.map(prereq => (
                <div className="prereq">{prereq}</div>
            ))} 
          </p>
                   
          {/* need a button here to see the indexes, maybe go new page? */}
        </div>
        <div className="col-3 test">
          <p><strong>Exam Date</strong></p>
          {/* <p>{course.examDate}</p> need backend to include examDate */}
          <p>26 November 2022</p>          
          {!inUserCourses && <input type="button" className="add-to-tt" value="Add to Timetable" onClick={handleSubmit} disabled={isLoading || isLoadingCourses || isLoadingDel}></input>}
          {inUserCourses && <input type="button" className="remove-from-tt" value="Remove from Timetable" onClick={handleSubmit} disabled={isLoading || isLoadingCourses || isLoadingDel}></input>}
          {error && <div className="error">{error}</div>}  
          {inUserCourses && success && <div className="success">{success}</div>}
          {delError && <div className="error">{delError}</div>}  
          {!inUserCourses && delSuccess && <div className="success">{delSuccess}</div>}
        </div>
      </div>
      <hr class="solid"></hr>
    </div>
  )
}

export default IndivCourse