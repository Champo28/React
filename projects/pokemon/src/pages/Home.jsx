import { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { PokemonCard } from '../components/PokemonCard'
import { URL_POKEMON } from '../api/apiRest'
import '../styles/home.css'

export const Home = () => {
  const [allPokemon, setAllPokemon] = useState([])

  console.log(allPokemon)

  useEffect(() => {
    async function getAllPokemon () {
      const res = await fetch(URL_POKEMON)
      const data = await res.json()
      setAllPokemon(data.results)
    }

    getAllPokemon()
  }, [])

  return (
    <div>
      <Header />

      <div className='card-container'>
        {allPokemon && allPokemon.map(pokemon => {
          return <PokemonCard key={pokemon.name} pokemon={pokemon} />
        })}
      </div>
    </div>
  )
}
