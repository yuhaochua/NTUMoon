import { useEffect,useState }from 'react'
import { useAuthContext } from "../hooks/useAuthContext"
import CourseList from '../components/courseList'
import SideNavBar from '../components/sideNavBar'
import  '../styles/account.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Carousel from 'react-bootstrap/Carousel';
import { Carousel } from 'antd';
import AccountCarousel from '../components/accountCarousel';
import AccountCarousel2 from '../components/accountCarousel2';

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const Account = () => {
  const[course, setCourse] = useState('')
  const {user} = useAuthContext()

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  useEffect(() => {
      const fetchCourse = async () => {
        const response = await fetch('http://localhost:3001/api/courses/') /* will eventually want to fetch specific course id */
        const json = await response.json()
    
        if (response.ok) {
          setCourse(json)
        }
      }
      fetchCourse()
    
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
                <div className='mt-3 coresRemain-cont'>Cores Remaining: 41/84</div>
                <AccountCarousel course={course} ></AccountCarousel>
                <div className='pt-5 coresRemain-cont'>Electives Remaining: 19/56</div>
                <AccountCarousel2></AccountCarousel2>

            </div>
        </div>
    </div>
  )
}

export default Account
