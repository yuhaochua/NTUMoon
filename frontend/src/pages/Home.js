import { useEffect,useState }from 'react'
import { useAuthContext } from "../hooks/useAuthContext"
import CourseList from '../components/courseList'
import SideNavBar from '../components/sideNavBar'

const Home = () => {
  const[courses, setCourses] = useState('')
  const {user} = useAuthContext()

useEffect(() => {
  const fetchCourses = async () => {
    console.log("enter useeffect")
    const response = await fetch('http://localhost:3001/api/courses/')
    const json = await response.json()

    if (response.ok) {
      setCourses(json)
    }
  }
  fetchCourses()
  
},[])

  return (
    <div className="home">
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            <SideNavBar></SideNavBar>
          </div>
          <div className="col-10">
           <div className="course-detail">
              {courses && courses.map(course => (
                  <CourseList course={course} key={course._id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home