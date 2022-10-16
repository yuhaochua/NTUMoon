import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useCommentsContext } from "./useCommentsContext";

export const useDeleteRating = () => {
    const { dispatch } = useCommentsContext()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {user} = useAuthContext()

    const rating = async (courseCode, _id) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:3001/api/comments/deleteReview', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
              },
            body: JSON.stringify({courseCode, _id})
        })
        const json = await response.json()

        if(!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok) {
            dispatch({type: 'DELETE_COMMENT', payload: json}) // for the dispatch here, using the same type as DELETE_COMMENT even though this is DELETE_RATING.
            setIsLoading(false)
        }

    }
    return { rating, isLoading, error}
}