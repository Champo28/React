import { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { PokemonCard } from '../components/PokemonCard'
import { URL_POKEMON } from '../api/apiRest'
import * as FaIcons from 'react-icons/fa'
import '../styles/home.css'

export const Home = () => {
  const [arrayPokemon, setArrayPokemon] = useState([])
  const [allPokemon, setAllPokemon] = useState([])
  const [xPage, setxPage] = useState(1)
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function getAllPokemon () {
      const res = await fetch(`${URL_POKEMON}/?offset=0&limit=1030`)
      const data = await res.json()

      // const promises = data.results.map(pokemon => {
      //   return pokemon
      // })

      // const results = await Promise.all(promises)
      // setAllPokemon(results)

      // const { results } = data

      setAllPokemon(data.results)
    }

    getAllPokemon()
  }, [])

  useEffect(() => {
    async function getArrayPokemon () {
      const limit = 20
      const x = (xPage - 1) * limit

      const res = await fetch(`${URL_POKEMON}?offset=${x}&limit=${limit}`)
      const data = await res.json()
      console.log(data.results)
      setArrayPokemon(data.results)
    }

    getArrayPokemon()
  }, [xPage])

  const getSearch = (text) => {
    console.log(text)
    setSearch(text.toLowerCase())
    setxPage(1)
  }

  const filterPokemon = search.length > 0
    ? allPokemon.filter(pokemon => pokemon?.name?.includes(search))
    : arrayPokemon

  return (
    <div>
      <Header getSearch={getSearch} />

      <section className='pagination'>
        <div>
          <span
            style={{ cursor: 'pointer' }} onClick={() => {
              if (xPage > 1) setxPage(xPage - 1)
            }}
          >
            <FaIcons.FaAngleLeft />
          </span>
          <span> {xPage} </span>
          <span> Of </span>
          <span> {Math.round(allPokemon?.length / 20)} </span>
          <span
            style={{ cursor: 'pointer' }} onClick={() => {
              if (xPage < 52) setxPage(xPage + 1)
            }}
          >
            <FaIcons.FaAngleRight />
          </span>
        </div>
      </section>

      <div className='card-container'>
        {filterPokemon && filterPokemon.map(pokemon => {
          return <PokemonCard key={pokemon.name} pokemon={pokemon} />
        })}
      </div>
    </div>
  )
}
