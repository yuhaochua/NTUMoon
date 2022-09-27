import { useEffect }from 'react'
import { useAuthContext } from "../hooks/useAuthContext"

const Home = () => {

  const {user} = useAuthContext()

useEffect(() => {

})

  return (
    <div className="home">
      home pageeeeeee
    </div>
  )
}

export default Home