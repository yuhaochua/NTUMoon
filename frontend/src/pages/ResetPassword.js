import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { Link } from "react-router-dom"

const ResetPassword = () => {
    const[password, setPassword] = useState('')
    const[email, setEmail] = useState('')
    const[isLoading, setIsLoading] = useState(null)
    const[error, setError] = useState(null)
    const[success, setSuccess] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("enter send email")
    
        const signup = async () => {
            setIsLoading(true)
            setError(null)
            setSuccess(null)
    
            const response = await fetch('http://localhost:3001/api/user/resetPassword', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password})
            })
            const json = await response.json()
    
            if(!response.ok) {
                setIsLoading(false)
                setError(json.error)
            }
    
            if(response.ok) {
                setIsLoading(false)
                setSuccess("Password reset successful!")
            }
        }

        signup()
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Reset Password</h3>

            <label>Email:</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} value={email}/>

            <label>Password:</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
            <button disabled={isLoading}>Reset Password</button>
            
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}
        </form>
    )
}

export default ResetPassword