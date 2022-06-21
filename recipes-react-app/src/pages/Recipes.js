import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import Filter from '../components/Filter'

export const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState(null);

  const navigate = useNavigate();
  const getData = async () => {
    const response = await axios.get('/recipes');
    const success = response?.status === 200;
    if (success) {
      setLoading(false);
      setRecipes(response.data)
    }
  }
  useEffect( () => {
    getData()
  }, [loading]);

  useEffect( () => {
    console.log(filter)
  }, [filter])

  const addRecipe = () => {
    navigate('/recipes/add')
  }

  const selectRecipe = (id) => {
    navigate('/recipes/details', {replace: true, state: {id: id}});
    console.log(id);
  }

  return (
    <> 
      <div className="container">
        <div className='recipe-menu card'>
          <Filter setFilter={setFilter} />
          <button className='btn btn-add' onClick={() => {addRecipe()}}>Dodaj przepis</button>
        </div>
        {loading ? 
          <h1>Loading...</h1> 
        :
          <div className='recipe-list card'>
           { recipes?.map(recipe => {
              return (
              <div key={recipe._id} className='recipe-list-item' onClick={() => selectRecipe(recipe._id)}>
                <div className='image'>
                  <img src={recipe.photo} alt='Recipe small img' />
                </div>
                <button>Szczegóły</button>
              </div>)
            })}
          </div>
        }
      </div>
    </>
  )
}

export default Recipes;