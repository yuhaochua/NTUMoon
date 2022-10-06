import { useEffect,useState }from 'react'
import { useAuthContext } from "../hooks/useAuthContext"
import CourseList from '../components/courseList'
import SideNavBar from '../components/sideNavBar'
import  '../styles/account.css';


const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const Account = () => {
  const[courses, setCourses] = useState('')
  const {user} = useAuthContext()

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

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
    <div className="account">
        {/* <div className="course-detail">
            {courses && courses.map(course => (
                <CourseList course={course} key={course._id} />
            ))}
        </div> */}
        <div className='account-cont'>
            <SideNavBar></SideNavBar>
            <div className='content-cont'>
                <div className='header-cont'>
                    <h1 className='h1-cont'>You have 60/140 AUs remaining</h1>
                </div>
                <div>Cores Remaining: 41/84</div>
                {/* <accountCarousel></accountCarousel>
                <div className='carousel-cont'>
                    <Carousel afterChange={onChange}>
                        <div>
                            <div style={{color: "black"}}>Slide 1</div>
                        </div>
                        <div>
                            <div style={{color: "black", lineHeight: "300px"}}>Slide 2</div>
                        </div>
                    </Carousel>
                </div> */}

            </div>
        </div>
    </div>
  )
}

export default Account
