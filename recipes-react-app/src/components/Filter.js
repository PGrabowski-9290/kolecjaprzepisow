import { useState } from 'react'

const Filter = ({ setFilter }) => {
  const [dishType, setDishType] = useState([]);
  const [difficulty, setDifficulty] = useState([]);
  const [author, setAuthor] = useState('')

  const handleType = (e, value) => {
    if (dishType.includes(value)){
      dishType.splice(dishType.indexOf(value),1)
    } else {
      dishType.push(value)
    }
    console.log(dishType)
  }

  const handleDiff = (e, value) => {
    if (difficulty.includes(value)){
      difficulty.splice(difficulty.indexOf(value),1)
    } else {
      difficulty.push(value)
    }
    console.log(difficulty)
  }

  const handleSearch = () => {
    let filterString = ""
    dishType.forEach(el => {
      let tmp = `&dishType[]=${el}`
      filterString += tmp
    })

    difficulty.forEach(el => {
      let tmp = `&diff[]=${el}`
      filterString += tmp
    })

    if (author){
      filterString += `&author=${author}`
    }


    setFilter(filterString)
  }

  return (
    <div className='recipe-filter'>
      <section className='filter-section'>
        <header>
          <span>Rodzaj</span>
        </header>
        <div>
          <label>
            <input type='checkbox' onChange={(e) => {handleType(e, 1)}}/>
            <span>Obiady</span>
          </label>
          <label>
            <input type='checkbox' onChange={(e) => {handleType(e, 2)}}/>
            <span>Zupy</span>
          </label>
          <label>
            <input type='checkbox' onChange={(e) => {handleType(e, 3)}}/>
            <span>Desery</span>
          </label>
        </div>
      </section>
      <section className='filter-section'>
      <header>
          <span>Trudność przygotowania</span>
        </header>
        <div>
          <label>
            <input type='checkbox' onChange={(e) => {handleDiff(e, 1)}}/>
            <span>Łatwa</span>
          </label>
          <label>
            <input type='checkbox' onChange={(e) => {handleDiff(e, 2)}}/>
            <span>Śrenia</span>
          </label>
          <label>
            <input type='checkbox' onChange={(e) => {handleDiff(e, 3)}}/>
            <span>Trudna</span>
          </label>
        </div>
      </section>
      <section className='filter-section'>
        <header>Autor</header>
        <div>
          <label>
            <input type="text" onChange={(e) => {setAuthor(e.target.value)}}/>
          </label>
        </div>
      </section>
      <button onClick={handleSearch}>Szukaj</button>
    </div>
  )
}

export default Filter