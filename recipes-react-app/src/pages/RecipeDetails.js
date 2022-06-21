import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from '../api/axios';

const RecipeDetails = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const { id } = location.state || null;

  return (
    <div className='container'>
      <div className='recipe-details'>
        {id}
      </div>
    </div>
  )
}

export default RecipeDetails