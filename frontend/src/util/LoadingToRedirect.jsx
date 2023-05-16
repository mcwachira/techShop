import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const LoadingToRedirect = () => {
    const navigate = useNavigate()

    const [count, setCount] = useState(5)

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount)
        }, 1000)

        count === 0 && navigate('/login')

        return () => clearInterval(interval)
}, [count, navigate])
  return (
    <div>{count && (<h1 className='text-danger text-center'> We are redirecting you in {count} seconds </h1>)}</div>
    )
}

export default LoadingToRedirect