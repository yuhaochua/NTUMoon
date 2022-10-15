import {DeleteOutlined} from '@ant-design/icons';
import { Modal } from 'antd';
import { useEffect,useState }from 'react'
import { useAuthContext } from "../hooks/useAuthContext";
import { useDeleteReview } from '../hooks/useDeleteReview';

const CourseReview = ({ comment, courseCode }) => {
    const { user } = useAuthContext();
    const[userComment, setUserComment] = useState('')
    const[userRating, setUserRating] = useState('')
    const {review, error, isLoading} = useDeleteReview()
  
    const handleSubmit = async(e) => {
      e.preventDefault()
      await review(courseCode, comment._id)
    }
    if (user.username === comment.user_id) {
        return (
            <div className="indiv-review row">
                <h5 className="comment-user">{comment.user_id}</h5>
                <div className="col-9 row">
                    <div className="col-7">
                        <p>{comment.comments}</p>
                    </div>
                    <div className="col-3">
                        <p className="user-rating">4.5</p>
                    </div>
                    <div className="col-2">
                        <DeleteOutlined
                            onClick={handleSubmit}
                            style={{color: "red"}}
                        />
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="indiv-review row">
            <h5 className="comment-user">{comment.user_id}</h5>
            <div className="col-9 row">
                <div className="col-7">
                    <p>{comment.comments}</p>
                </div>
                <div className="col-3">
                    <p className="user-rating">4.5</p>
                </div>
                <div className="col-2">
                </div>
            </div>
        </div>
    )
  }
  
  export default CourseReview