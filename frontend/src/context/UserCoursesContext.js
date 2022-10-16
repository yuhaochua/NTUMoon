import { createContext, useReducer } from 'react'

export const UserCoursesContext = createContext()

export const userCoursesReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_COURSES':
            return {
                userCourses: [action.payload]
            }
        default:
            return state
    }
}

export const UserCoursesContextProvider = ({ children }) => {
    const [state, dispatchCourses] = useReducer(userCoursesReducer, {
        comments: null
    })

    return (
        <UserCoursesContext.Provider value={{...state, dispatchCourses}} >
            { children }
        </UserCoursesContext.Provider>
    )
}