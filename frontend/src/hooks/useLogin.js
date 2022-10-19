import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (username, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('https://ntumoon-api.onrender.com/api/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})
        })
        const json = await response.json()

        if(!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok) {
            //save user to local storage
            localStorage.setItem('user', JSON.stringify(json)) //store string in local storage, json is an object with jwt and username property
            
            //update auth context
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
        }

    }
    return { login, isLoading, error}
}