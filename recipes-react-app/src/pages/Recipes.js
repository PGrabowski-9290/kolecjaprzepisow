import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

export const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // useEffect(async () => {
  //   const response = await axios.get('/recipes');
  //   const success = response?.status === 200;
  //   if (success) {
  //     loading(false);
  //   }
  // }, [loading]);


  const addRecipe = () => {

  }

  const selectRecipe = (id) => {
    navigate('/recipes/details', {replace: true, state: {id: id}});
    console.log(id);
  }

  return (
    <> 
      <div className="container">
        <div className='recipe-menu'>
          <button className='btn btn-add' onClick={() => {addRecipe()}}>Dodaj przepis</button>
        </div>
        {loading ? 
          <h1>Loading...</h1> 
        :
          <div className='recipe-list'>
           { recipes?.map(recipe => {
              console.log(recipe)
              return (
              <div key={recipe._id} className='recipe-list-item' onClick={() => selectRecipe(recipe._id)}>
                <div className='image'>
                  <img src={'a'} alt='Recipe small img' />
                </div>
                <button>select</button>
              </div>)
            })}
          </div>
        }
      </div>
    </>
  )
}

export default Recipes;