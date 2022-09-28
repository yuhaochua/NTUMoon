import { useEffect,useState }from 'react'
import { useAuthContext } from "../hooks/useAuthContext"
import CourseList from '../components/courseList'

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
      {courses && courses.map(course => (
        <CourseList course={course} key={course._id} />
      ))}
    </div>
  )
}

export default Home