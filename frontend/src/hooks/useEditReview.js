import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useCommentsContext } from "./useCommentsContext";

export const useEditReview = () => {
    const [errorEdit, setErrorEdit] = useState(null)
    const [isLoadingEdit, setIsLoadingEdit] = useState(null)
    const {user} = useAuthContext()
    const { dispatch } = useCommentsContext()
    // const {courseCode, _id, comments} = req.body

    const reviewEdit = async (courseCode, _id, comments) => {
        setIsLoadingEdit(true)
        setErrorEdit(null)

        const response = await fetch('https://ntumoon-api.onrender.com/api/comments/editComment', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
              },
            body: JSON.stringify({courseCode, _id, comments})
        })
        const json = await response.json()

        if(!response.ok) {
            setIsLoadingEdit(false)
            setErrorEdit(json.error)
        }

        if(response.ok) {
            dispatch({type: 'EDIT_COMMENT', payload: json})
            setIsLoadingEdit(false)
        }

    }
    return { reviewEdit, isLoadingEdit, errorEdit}
}