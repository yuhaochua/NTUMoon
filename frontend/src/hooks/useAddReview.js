import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useCommentsContext } from "./useCommentsContext";

export const useAddReview = () => {
    const { dispatch } = useCommentsContext()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {user} = useAuthContext()

    const review = async (courseCode, username, comments) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('https://ntumoon-api.onrender.com/api/comments/addComment', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
              },
            body: JSON.stringify({courseCode, username, comments})
        })
        const json = await response.json()

        if(!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok) {
            dispatch({type: 'ADD_COMMENT', payload: json})
            setIsLoading(false)
        }

    }
    return { review, isLoading, error}
}