import React from 'react'
import axios from '../api/axios'
import Back from '../components/Back'

const RecipesAdd = () => {
  return (
    <div className='container'>
      <section className='add-recipe'>
        <form>
          <input type='text' 
            name='title'
            id='title'

          />
          <input type='text'
            name='photo'
            id='photo'
            placeholder='Link do zdjęcia'
            
          />
          <input type="number"
            name="difficulty"
            max={5}
            min={1}

          />
          <input type='number'
            name='prepare_time'
            id='prepare_time'
          />
          <select name='dish_type'>
            <option value='Obiad'>Obiad</option>
            <option value='Zupa'>Zupa</option>
            <option value='Deser'>Deser</option>
          </select>
          <textarea 
            name="body"
            id="body"
          />
        </form>
      </section>
      <Back to={'/recipes'} />
    </div>
  )
}

export default RecipesAdd