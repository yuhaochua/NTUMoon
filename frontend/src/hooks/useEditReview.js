import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useEditReview = () => {
    const [errorEdit, setErrorEdit] = useState(null)
    const [isLoadingEdit, setIsLoadingEdit] = useState(null)
    const {user} = useAuthContext()
    const { dispatch } = useAuthContext()
    // const {courseCode, _id, comments} = req.body

    const reviewEdit = async (courseCode, _id, comments) => {
        setIsLoadingEdit(true)
        setErrorEdit(null)

        const response = await fetch('http://localhost:3001/api/comments/editComment', {
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
            setIsLoadingEdit(false)
        }

    }
    return { reviewEdit, isLoadingEdit, errorEdit}
}