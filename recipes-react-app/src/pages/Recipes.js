import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import Filter from '../components/Filter'
import useAuth from '../hooks/useAuth'

export const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState(null);
  const { auth } = useAuth();

  const navigate = useNavigate();
  const getData = async () => {
    const response = await axios.get('/recipes');
    const success = response?.status === 200;
    if (success) {
      setLoading(false);
      setRecipes(response.data)
    }
  }

  const getFiltered = async () => {
    const response = await axios.get(`/recipes/filter?${filter}`);
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
    if (filter){
      getFiltered()
    }else {
      getData()
      console.log("all")
    }
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
          <div>
            {auth?.roles?.includes(1001) && <button className='btn btn-add' onClick={() => {addRecipe()}}>Dodaj</button>}
          </div>
        </div>
        {loading ? 
          <h1>Loading...</h1> 
        :
          <div className='recipe-list card'>
           { recipes?.map(recipe => {
              return (
              <div key={recipe._id} className='recipe-list-item' >
                <div className='header'>
                  <img src={recipe.photo} alt='Recipe small img' />
                </div>
                <div className='body'>
                  <h4>{recipe.title}</h4>
                  <span className='author'>{recipe.author_name}</span>
                </div>
                <div className='footer'>
                  <button className='btn btn-details' onClick={() => selectRecipe(recipe._id)}>Szczegóły</button>
                </div>
                
              </div>)
            })}
          </div>
        }
      </div>
    </>
  )
}

export default Recipes;