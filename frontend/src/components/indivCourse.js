import { useAddToTimetable } from "../hooks/useAddToTimetable"

const IndivCourse = ({ course }) => {
    const {mod, error, isLoading, success} = useAddToTimetable()
  
    const handleSubmit = async(e) => {
      e.preventDefault()
      await mod(course.courseCode, course.indexes[0].index)
      if(!error){
        var elem = document.getElementById("addTT")
        elem.value = "Added!"
      }
    }
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
          <input type="button" id="addTT" className="add-to-tt" value="Add to Timetable" onClick={handleSubmit} disabled={isLoading}></input>
          {error && <div className="error">{error}</div>}  
          {success && <div className="success">{success}</div>}
        </div>
      </div>
      <hr class="solid"></hr>
    </div>
  )
}

export default IndivCourse