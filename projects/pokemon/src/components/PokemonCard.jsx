import { useEffect, useState } from 'react'
import { URL_POKEMON, URL_SPECIES } from '../api/apiRest'
import '../styles/card.css'

export const PokemonCard = ({ pokemon }) => {
  const [pokemonInfo, setPokemonInfo] = useState(null)
  const [pokemonSpecies, setPokemonSpecies] = useState(null)

  useEffect(() => {
    async function getPokemonData () {
      const res = await fetch(`${URL_POKEMON}/${pokemon.name}`)
      const data = await res.json()
      console.log(data)
      setPokemonInfo(data)
    }

    getPokemonData()
  }, [pokemon.name])

  useEffect(() => {
    async function getPokemonSpecies () {
      const url = pokemon.url.split('/')
      const res = await fetch(`${URL_SPECIES}/${url[6]}`)
      const data = await res.json()
      console.log(data)
      setPokemonSpecies(data)
    }

    getPokemonSpecies()
  }, [pokemon.url])

  return (
    <>
      {pokemonInfo && (
        <div className='card'>
          <img className='poke-img' src={pokemonInfo.sprites?.other['official-artwork'].front_default} alt='pokemon' />
          <div className='sub-card'>
            <strong className='poke-id'>{pokemonInfo.id}</strong>
            <strong className='poke-name'>{pokemonInfo.name}</strong>
            <h4 className='poke-height'>
              {pokemonInfo.height / 10} m
            </h4>
            <h4 className='poke-weight'>
              {pokemonInfo.weight / 10} kg
            </h4>
            <h4 className='poke-habitat'>
              habitat
            </h4>
          </div>
        </div>
      )}
    </>
  )
}
