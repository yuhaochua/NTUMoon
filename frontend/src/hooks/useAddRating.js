import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useAddRating = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {user} = useAuthContext()

    const rating = async (courseCode, review) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:3001/api/comments/addReview', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
              },
            body: JSON.stringify({courseCode, review})
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
    return { rating, isLoading, error}
}