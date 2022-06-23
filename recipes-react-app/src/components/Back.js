import React from 'react'
import { useNavigate } from 'react-router-dom'

const Back = ({ to }) => {
  const navigate = useNavigate()
  const locationTo = to
  const handleBack = () => {
    navigate(locationTo,{replace: true})
  }

  return (
    <div className='back'>
      <button onClick={handleBack} className="btn btn-details">BACK</button>
    </div>
  )
}

export default Back