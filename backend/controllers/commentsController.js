const Comments = require('../models/commentsModel')

//get all courses
const getAllComments = async (req, res) => { //get all comments for a single course code
    const comments = await Comments.find//(need to find course code here, return the array of details, then loop through the whole thing to get comments created...)
    // .sort({createdAt: -1}) //sort comments by time created
    res.status(200).json(comments) //send back (response) as json
}

// delete a workout
// const deleteWorkout = async (req, res) => {
//     const { id } = req.params
  
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(404).json({error: 'No such workout'})
//     }
  
//     const workout = await Workout.findOneAndDelete({_id: id})
  
//     if (!workout) {
//       return res.status(400).json({error: 'No such workout'})
//     }
  
//     res.status(200).json(workout)
//   }

//here to delete comments, we will use the same logic, somehow pass in the _id of the comment in the req.params