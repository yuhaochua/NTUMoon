import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useDeleteFromTimetable = () => {
    const [delError, setError] = useState(null)
    const [delSuccess, setSuccess] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {user} = useAuthContext()

    const dmod = async (courseCode, index) => {
        setIsLoading(true)
        setError(null)
        setSuccess(null)

        const response = await fetch('http://localhost:3001/api/courses/deleteCourse', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
              },
            body: JSON.stringify({courseCode, index})
        })
        const json = await response.json()

        if(!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok) {
            setIsLoading(false)
            setSuccess("Course removed successfully!")
        }

    }
    return { dmod, isLoading, delError, delSuccess}
}