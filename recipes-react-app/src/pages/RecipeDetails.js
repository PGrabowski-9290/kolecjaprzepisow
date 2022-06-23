import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from '../api/axios';
import Back from '../components/Back';
import useAuth from '../hooks/useAuth'

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState(null);
  const [success, setSuccess] = useState(false)
  const [comment, setComment] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const { auth } = useAuth()
  const location = useLocation();
  const [error, setError] = useState('')

  const getData = async () => {
    const response = await axios.get(`/recipes/${id}`)
    if (response?.status === 200) {
      setRecipe(response.data)
      setSuccess(true)
      console.log(recipe)
    }
  }
  
  useEffect(() => {
    getData()
  },[success])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const response = await axios.post(`/recipes/${id}/comment`,
      {
        author: auth.name,
        text: comment
      },
      {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
          withCredentials: true
        }
      })
      if (response.status === 200) {
        getData()
      }
    }catch(err) {
      setError('Błąd dodawania komentarza')
      console.log(err)
    }
    console.log(e)
    document.querySelector('#comment').value=''
    setComment()
  }

  const handleRemove = async (comId) => {
    try{
      const response = await axios.delete(`/recipes/${id}/comment/${comId}`,
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
            withCredentials: true
          }
        }
      )
      
      if (response.status === 200){
        getData()
      } 
    }catch(err){
      setError('Błąd usuwania komentarza')
      console.log(err)
    }
    getData()
  }

  const { id } = location.state || null;

  return (
    <div className='container'>
      {success ?<>
        <div className='recipe-details card'>
          <div className='image'>
            <img src={recipe.photo}></img>
            <h3>{recipe.title}</h3>
            <h5 className='text-muted'><b>Typ dania:</b> {recipe.dish_type} | <b>Trudność przygotowania:</b> {recipe.difficulty}/5 | <b>Czas przygotowania:</b> {recipe.prepare_time}min </h5>
          </div>
          <div className='ingredients'>
            <h4>Składniki:</h4>
            <ul>
              {recipe.ingredients.map(el => {
                return (
                  <li key={el._id}><span>{el.name}</span> <span>{el.amount}</span> <span>{el.unit}</span></li>
                )
              })}
            </ul>
          </div>
          <div className='body'>
              <h3>Przygotowanie</h3>
              <div>
                <p>{recipe.body}</p>
              </div>
          </div>
        </div>

        <div className='recipe-comments card'>
          
          <div className='controls'>
            <div className='expand'> 
              <button className={isOpen ? 'btn btn-details btn-expand active' : 'btn btn-details btn-expand'} onClick={() => {setIsOpen(!isOpen)}}>^</button>
            </div>
            <div className='form'>
              <h4>Komentarze:</h4>
              {auth?._id ? 
              <form>
                <input type='text'
                  name="comment"
                  id="comment"
                  className={comment ? 'expand' : ''}
                  placeholder='Komentarz'
                  onChange={(e) => {setComment(e.target.value)}}
                />
                <input type='button'
                  className='btn-add'
                  value='Dodaj'
                  onClick={(e) => handleSubmit(e)}
                />
              </form>: <span className='text-muted'>Aby dodać komentarz wymagane jest zalogowanie</span>}
            </div>           
            
          </div>
          <section className={isOpen? 'comment-section active':'comment-section'}>
            {recipe?.comments?.map(com => {
              const date = new Intl.DateTimeFormat('pl-PL', { dateStyle: 'short', timeStyle: 'short'}).format(new Date(com.date))
              return(
                <div className='comment col' key={com._id}>
                  <div className='header row'>
                    <div className='col text-small'>
                      <span className=''>{com.author}</span><br/>
                      <span className='text-muted'> {date}</span>
                    </div>
                    <div className='comment-controls row '>
                      {auth?.roles?.includes(5001) && <button onClick={() => handleRemove(com._id)} className='btn btn-details small'>Remove</button>}
                    </div>
                  </div>
                  <div>
                    <p>{com.text}</p>
                  </div>
                </div>
              )
            })}
          </section>
        </div>
      </> :
      <h1>Loading...</h1>}
      <Back to={'/recipes'}/>
    </div>
  )
}

export default RecipeDetails