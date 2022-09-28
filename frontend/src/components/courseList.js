const CourseList = ({ course }) => {
  return (
    <div className="course-detail">
      <h4>{course.courseCode}</h4>
      <p>{course.courseTitle}</p>
      <p>{course.prerequisites}</p>
      <p><strong>Au: </strong>{course.au}</p>
      <p>{course.description}</p>
      {/* need a button here to see the indexes, maybe go new page? */}
    </div>
  )
}

export default CourseList