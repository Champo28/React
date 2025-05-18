import { useState } from 'react'
import { usePokemon } from '../hooks/usePokemon'
import '../styles/card.css'
import shinyIcon from '../assets/shiny.png'

export const PokemonCard = ({ pokemon }) => {
  const { pokemonInfo, pokemonSpecies, pokemonEvolutions } = usePokemon({ pokemon })
  const [shiny, setShiny] = useState(false)

  const formatId = (id) => {
    let res = '#'
    for (let i = id.toString().length; i < 3; i++) {
      res += '0'
    }
    return res + id
  }

  return (
    <>
      {pokemonInfo && pokemonSpecies && (
        <div className='card'>
          <img
            className='poke-img'
            src={shiny ? pokemonInfo.sprites.front_shiny : pokemonInfo.sprites.front_default} alt='pokemon'
          />
          <div className={`bg-${pokemonInfo.types[0].type.name} sub-card`}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong className='poke-id'>{formatId(pokemonInfo.id)}</strong>
              <button className='shiny-button' onClick={() => setShiny(!shiny)}>
                <img className='shiny-img' src={shinyIcon} />
              </button>
            </div>
            <strong className='poke-name'>{pokemonInfo.name}</strong>
            <h4 className='poke-height'>
              Height: {pokemonInfo.height / 10} m
            </h4>
            <h4 className='poke-weight'>
              Weight: {pokemonInfo.weight / 10} kg
            </h4>
            <h4 className='poke-habitat'>
              Habitat: {pokemonSpecies.habitat?.name}
            </h4>
            <div className='poke-stats'>
              {pokemonInfo?.stats.map((stat, index) => {
                return (
                  <h6 key={index} className='stats'>
                    <span className='stat-name'>{stat.stat.name} </span>
                    <progress value={stat.base_stat} max={160} />
                    <span className='stat-value'> {stat.base_stat} </span>
                  </h6>
                )
              })}
            </div>
            <div className='poke-type'>
              {pokemonInfo?.types.map((type, index) => {
                return <h6 key={index} className={`bg-${type.type.name} color-type`}>{type.type.name}</h6>
              })}
            </div>
            <div className='poke-evolutions'>
              {pokemonEvolutions?.map((evolution, index) => (
                <div key={index} className='evolution-container'>
                  <img src={evolution.img} alt='evolution' />
                  <h6>{evolution.name}</h6>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
