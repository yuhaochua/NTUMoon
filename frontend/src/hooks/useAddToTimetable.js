import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useAddToTimetable = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {user} = useAuthContext()

    const mod = async (courseCode, index) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:3001/api/courses/addCourse', {
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
        }

    }
    return { mod, isLoading, error}
}