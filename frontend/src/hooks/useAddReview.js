import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useAddReview = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {user} = useAuthContext()
    const { dispatch } = useAuthContext()

    const review = async (courseCode, comments) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:3001/api/comments/addComment', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
              },
            body: JSON.stringify({courseCode, comments})
        })
        const json = await response.json()

        if(!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok) {
            setIsLoading(false)
        }

    }
    return { review, isLoading, error}
}