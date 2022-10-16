import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useUserCoursesContext } from "./useUserCoursesContext";

export const useAddUserCourse = () => {
    const { dispatchCourses } = useUserCoursesContext()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {user} = useAuthContext()

    const userCourse = async () => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:3001/api/courses/getUserCourses', {
        method: 'GET',
        Accept: 'application/json',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      })
      const json = await response.json()

        if(!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok) {
            dispatchCourses({type: 'FETCH_COURSES', payload: json})
            setIsLoading(false)
        }

    }
    return { userCourse, isLoading, error}
}