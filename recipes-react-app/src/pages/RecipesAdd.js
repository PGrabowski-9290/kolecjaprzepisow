import { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import axios from '../api/axios'
import Back from '../components/Back'
import { useNavigate } from 'react-router-dom'

const RecipesAdd = () => {
  const {auth} = useAuth()
  const [dishType, setDishType] = useState('')
  const [title,setTitle] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [photo, setPhoto] = useState('')
  const [prepTime, setPrepTime] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [body, setBody] = useState('')
  const [error, setError] = useState('')

  const [ingredientName, setIngredientName] = useState('')
  const [ingredientAmount, setIngredientAmount] = useState('')
  const [ingredientUnit, setIngredientUnit] = useState('')

  const navigate = useNavigate()

  useEffect(()=> {
    setIngredientAmount('')
    setIngredientName('')
    setIngredientUnit('')
  },[ingredients])

  const changeName = (e) => {
    setIngredientName(e.target.value)
  }

  const changeAmount = (e) => {
    setIngredientAmount(e.target.value)
  }

  const addIngredient = (e) => {
    e.preventDefault()

    if (!ingredientName || !ingredientAmount || !ingredientUnit){
      setError('Należy uzupełnić skałdniki')
      return
    }

    let obj = {}
    obj.name = ingredientName
    
    obj.amount = ingredientAmount
    
    obj.unit = ingredientUnit
    
    setIngredientAmount("")
    setIngredientName("")
    setIngredientUnit("")
    ingredients.push(obj)
  }

  const removeIngredient = (e, name) => {
    e.preventDefault()
    console.log(name)
    setIngredients(ingredients.filter((_,index) => index !== name))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const response = await axios.post('/recipes',
        {
          author_name: auth.name,
          user_id: auth._id,
          dish_type: dishType,
          difficulty: difficulty,
          prepare_time: prepTime,
          photo: photo,
          title: title,
          body: body,
          ingredients: ingredients
        },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
            withCredentials: true
          }
        }
      )

      if (response.status === 200) {
        console.log('success')
        navigate('/recipes', {replace: true})
      }
    }catch(err){
      setError(err)
    }
  }

  return (
    <div className='container'>
      <section className='add-recipe card'>
        <form className='col'>
          <input type='text' 
            name='title'
            id='title'
            placeholder='Tytuł'
            onChange={(e) => {setTitle(e.target.value)}}
          />
          <input type='text'
            name='photo'
            id='photo'
            placeholder='Link do zdjęcia'
            onChange={(e) => {setPhoto(e.target.value)}}
          />
          <input type="number"
            name="difficulty"
            max={5}
            min={1}
            placeholder='Trudność'
            onChange={(e) => {setDifficulty(e.target.value)}}
          />
          <input type='number'
            name='prepare_time'
            id='prepare_time'
            placeholder='Czas przygotowania'
            onChange={(e) => {setPrepTime(e.target.value)}}
          />
          <select name='dish_type' className='form-control' onChange={(e) => {setDishType(e.target.value)}}>
            <option>Wybierz</option>
            <option value='Obiad'>Obiad</option>
            <option value='Zupa'>Zupa</option>
            <option value='Deser'>Deser</option>
          </select>
          <div className='ingredients col' >
            <h3>Składniki:</h3>
            {ingredients.map((el,index) => {
              return (
                <div key={index}  className='row'>
                  <input disabled type='text' placeholder='Składnik' defaultValue={el.name}/>
                  <input disabled type='number' placeholder='Ilość' defaultValue={el.amount}/>
                  <select disabled className='form-control' defaultValue={el.unit}>
                    <option>{el.unit}</option>
                  </select>
                  <button type="submit" className='btn btn-details' onClick={(e) => {removeIngredient(e, index)}}><b>-</b></button>
                </div>
              )
            })}
            <div className='row'>
              <input type='text' placeholder='Składnik' id='ingredientName' value={ingredientName} onChange={(e) => changeName(e)}/>
              <input type='number' placeholder='Ilość' id='ingredientAmount' value={ingredientAmount} onChange={(e) => changeAmount(e)}/>
              <label>
                <select className='form-control' id='ingredientUnit' value={ingredientUnit} onChange={(e) => setIngredientUnit(e.target.value)}>
                  <option >Wybierz</option>
                  <option value='Kg'>Kg</option>
                  <option value='gram'>gram</option>
                  <option value='op'>op</option>
                  <option value='szt'>szt</option>
                </select>
              </label>
              
              <button className='btn btn-details' onClick={(e) => {addIngredient(e)}}><b>+</b></button>
            </div>
          </div>
          <textarea
            className='form-control'
            name="body"
            id="body"
            onChange={(e) => {setBody(e.target.value)}}
          />
          <div>
            <button className='btn-add btn' onClick={(e) => handleSubmit(e)}>Dodaj</button>
          </div>
        </form>
      </section>
      <Back to={'/recipes'} />
    </div>
  )
}

export default RecipesAdd