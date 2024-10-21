import React from 'react'
import './GenreCard.css'


function GenreCard({genre}) {

  return (
    <div  className='genre-card'>
        <p>{genre.name}</p>
    </div>
  )
}

export { GenreCard };