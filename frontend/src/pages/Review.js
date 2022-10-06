import { useEffect,useState }from 'react'
import { useAuthContext } from "../hooks/useAuthContext"
import CourseList from '../components/courseList'
import SideNavBar from '../components/sideNavBar'
// import CourseReview from '../components/courseReview'

const Review = () => {
//   const[reviews, setReviews] = useState('')
  const[course, setCourse] = useState('')
  const {user} = useAuthContext()

useEffect(() => {
//   const fetchReviews = async () => {
//     const response = await fetch('http://localhost:3001/api/reviews/')
//     const json = await response.json()

//     if (response.ok) {
//       setReviews(json)
//     }
//   }
//   fetchReviews()
  
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
    <div className="course-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            <SideNavBar></SideNavBar>
          </div>
           <div className="col-10">
           <div className="course-detail">
              {course && course.map(course => (
                  <CourseList course={course} key={course._id} />
              ))}
          </div>
          {/* <div className="review">
            {reviews && reviews.map(review => (
              <CourseReview review={review} key={review._id} />
            ))}
          </div> need backend to add reviews */}
          <div className="course-reviews container-fluid">
              <div className="row">
                  <pre className="mod-reviews"> <strong>Module Reviews           4.5/5.0 </strong></pre>
                  <hr class="solid"></hr>
              </div>
              <div className="row">
                  <div className="col-9">
                      <form className="row">
                          <input className="add-comment-field col-9" name="comment" type="text" placeholder='Add your comments here'/>
                          <input className="add-rating-field col-3" name="rating" type="number" min="0" max="5" step="0.1" placeholder='Rating:'/>
                      </form>
                  </div>                
              </div>

              <div className="indiv-review row">
                  <h5 className="comment-user">Alexander Ng</h5>
                  <div className="col-9 row">
                      <div className="col-9">
                          <p>Module was great, had alot of fun doing documentation!</p>
                      </div>
                      <div className="col-3">
                          <p className="user-rating">4.5</p>
                      </div>
                  </div>
              </div>

              <div className="indiv-review row">
                  <h5 className="comment-user">Himari Ang</h5>
                  <div className="col-9 row">
                      <div className="col-9">
                          <p>Didn't even need to code!</p>
                      </div>
                      <div className="col-3">
                          <p className="user-rating">4.5</p>
                      </div>
                  </div>
              </div> 
           </div>

          </div>
        </div>
        
      </div>
 
    </div>
  )
}

export default Review