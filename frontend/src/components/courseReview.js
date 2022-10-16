import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import { Modal, Form, Input } from 'antd';
import { useEffect,useState }from 'react'
import { useAuthContext } from "../hooks/useAuthContext";
import { useDeleteRating } from '../hooks/useDeleteRating';
import { useDeleteReview } from '../hooks/useDeleteReview';
import { useEditReview } from '../hooks/useEditReview';

  
const CourseReview = ({ comment, courseCode, reviews }) => {
    const { user } = useAuthContext();
    const[userComment, setUserComment] = useState('')
    const[userRating, setUserRating] = useState('')
    const {review, error, isLoading} = useDeleteReview()
    const {rating, ratingError, isLoadingRating} = useDeleteRating()
    const {reviewEdit, errorEdit, isLoadingEdit} = useEditReview()
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
  
    const handleSubmit = async(e) => {
    //   e.preventDefault()
      await review(courseCode, comment._id)
      await rating(courseCode, userRating._id)
    }
    const handleSubmitEdit = async(e) => {
        // e.preventDefault()
        console.log(userComment)
        await reviewEdit(courseCode, comment._id, userComment)
      }

    const onDelete = () => {
        Modal.confirm({
            title: "Are you sure, you want to delete this comment?",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                handleSubmit();
                console.log("entered on delete")
            },
        });
    };

    useEffect(() => {
        const setRating = async () => {
            {reviews && reviews.map(rating => {
                if(rating.user_id === comment.user_id){
                    setUserRating(rating)
                }
            })}
        }
        setRating()
    }, [reviews, comment])

    if (user.username === comment.username) {
        return (
            <div className="indiv-review row">
                <h5 className="comment-user">{comment.username}</h5>
                <div className="col-9 row">
                    <div className="col-7">
                        <p>{comment.comments}</p>
                    </div>
                    <div className="col-3">
                        <p className="user-rating">{userRating.review}</p>
                    </div>
                    <div className="col-1">
                        <EditOutlined
                            onClick={() => {
                                setOpen(true);
                            }}
                            style={{color: "black"}}
                        />
                        <Modal
                            open={open}
                            title="Edit Comment"
                            okText="Edit"
                            cancelText="Cancel"
                            onCancel={() => {
                                setOpen(false);
                            }}
                            onOk={() => {
                                handleSubmitEdit();
                                console.log("entered onOK")
                                setOpen(false);
                            }}
                        >
                            <Form
                                form={form}
                                layout="vertical"
                                name="form_in_modal"
                                initialValues={{
                                    modifier: 'public',
                                }}
                            >
                                <Form.Item
                                    name="editComment"
                                    label="Edit Comment"
                                    className="collection-create-form_last-form-item"
                                    rules={[
                                    {
                                        required: true,
                                        message: 'Please input the your edited comment!',
                                    },
                                    ]}
                                >
                                    <input className="add-comment-field" name="comment" type="text" onChange={(e) => setUserComment(e.target.value)} placeholder='Add your comments here'/>
                                    {/* <Input.TextArea 
                                        allowClear
                                        onValuesChange={(e) => setUserComment(e.target.value)}
                                    /> */}
                                </Form.Item>
                            </Form>
                        </Modal>
                    </div>
                    <div className="col-1">
                        <DeleteOutlined
                            // onClick={handleSubmit}
                            onClick={() => {
                                console.log("hihi")
                                onDelete();
                              }}
                            style={{color: "red"}}
                        />
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="indiv-review row">
            <h5 className="comment-user">{comment.username}</h5>
            <div className="col-9 row">
                <div className="col-7">
                    <p>{comment.comments}</p>
                </div>
                <div className="col-3">
                    <p className="user-rating">{userRating.review}</p>
                </div>
                
                <div className="col-2">
                </div>
            </div>
        </div>
    )
  }
  
  export default CourseReview