import { useState } from "react"

const ResetPassword = () => {
    const[email, setEmail] = useState('')
    const[isLoading, setIsLoading] = useState(null)
    const[error, setError] = useState(null)
    const[success, setSuccess] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
    
        const signup = async () => {
            setIsLoading(true)
            setError(null)
            setSuccess(null)
    
            const response = await fetch('https://ntumoon-api.onrender.com/api/user/sendEmail', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email})
            })
            const json = await response.json()
    
            if(!response.ok) {
                setIsLoading(false)
                setError(json.error)
            }
    
            if(response.ok) {
                setIsLoading(false)
                setSuccess("Password reset link sent!")
            }
        }

        signup()
    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Reset Password</h3>

            <label>Email:</label>
            <input type="text" onChange={(e) => setEmail(e.target.value)} value={email}/>
            <button disabled={isLoading}>Send Password Reset Link</button>
            {error && <div className="error">{error}</div>}
            {success &&  <div className="success">{success}</div>}
        </form>
    )
}

export default ResetPassword