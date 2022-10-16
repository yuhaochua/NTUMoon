import { UserCoursesContext } from "../context/UserCoursesContext"
import { useContext } from "react"

export const useUserCoursesContext = () => {
    const context = useContext(UserCoursesContext)

     if (!context) {
        throw Error('useUserCoursesContext must be used inside a UserCoursesContextProvider')
     }

    return context
}