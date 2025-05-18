import { useState, useEffect } from 'react'
import { URL_POKEMON, URL_SPECIES } from '../api/apiRest'

export function usePokemon ({ pokemon }) {
  const [pokemonInfo, setPokemonInfo] = useState()
  const [pokemonSpecies, setPokemonSpecies] = useState()
  const [pokemonEvolutions, setPokemonEvolutions] = useState([])

  const getPokemonImage = async (url) => {
    const id = url.split('/')[6]
    const res = await fetch(`${URL_POKEMON}/${id}`)
    const data = await res.json()
    return data.sprites.front_default
  }

  useEffect(() => {
    async function getPokemonInfo () {
      // const id = pokemon.url.split('/')[6]
      const res = await fetch(`${URL_POKEMON}/${pokemon.name}`)
      const data = await res.json()
      // console.log(data)
      setPokemonInfo(data)
    }

    getPokemonInfo()
  }, [pokemon])

  useEffect(() => {
    async function getPokemonSpecies () {
      const url = pokemon.url.split('/')
      const res = await fetch(`${URL_SPECIES}/${url[6]}`)
      const data = await res.json()
      // console.log(data)
      setPokemonSpecies(data)
    }

    getPokemonSpecies()
  }, [pokemon])

  useEffect(() => {
    async function getPokemonEvolutions () {
      if (!pokemonSpecies) return

      const evolutionsArr = []

      const url = pokemonSpecies.evolution_chain.url
      const res = await fetch(url)
      const data = await res.json()
      const { chain } = data

      // console.log(chain)

      let name = chain.species.name
      let evolutionUrl = chain.species.url
      let img = await getPokemonImage(evolutionUrl)

      evolutionsArr.push({ img, name })

      if (chain.evolves_to.length !== 0) {
        name = chain.evolves_to[0].species.name
        evolutionUrl = chain.evolves_to[0].species.url
        img = await getPokemonImage(evolutionUrl)

        evolutionsArr.push({ img, name })

        if (chain.evolves_to[0].evolves_to.length !== 0) {
          name = chain.evolves_to[0].evolves_to[0].species.name
          evolutionUrl = chain.evolves_to[0].evolves_to[0].species.url
          img = await getPokemonImage(evolutionUrl)

          evolutionsArr.push({ img, name })
        }
      }

      setPokemonEvolutions(evolutionsArr)
    }

    getPokemonEvolutions()
  }, [pokemonSpecies])

  return { pokemonInfo, pokemonSpecies, pokemonEvolutions }
}
