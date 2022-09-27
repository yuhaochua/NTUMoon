import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import Lottie from "lottie-react"
import moonAnimation from "../icons/moon.json"
// import { FiMoon } from "react-icons/fi";

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  const defaultOptions = {
    loop: true,
    animationData: moonAnimation,
    renderSettings: {
      preserveAspectRatio: 'xMidYMid Meet'
    }
  }

  return (
    <header>
      <div className="container">
        <Link to="/">
          {/* <h1>NTUMoon   <FiMoon /></h1> */}
          <h1>
            <div><Lottie animationData={moonAnimation} loop={true} /></div>
            <div>NTUMoon</div>
          </h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar