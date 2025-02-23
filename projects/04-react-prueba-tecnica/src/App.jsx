import { useEffect } from 'react'
import './App.css'
import { useCatImage } from './hooks/useCatImage'
import { useCatFact } from './hooks/useCatFact'

// const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}?fontSize=50&fontColor=red&json=true

export const App = () => {
  const { fact, refreshFact } = useCatFact()
  const { imageUrl } = useCatImage({ fact })
  useEffect(refreshFact, [])

  const handleClick = async () => {
    refreshFact()
  }

  // fetch with async await

  // useEffect(() => {
  //   async function getRandomFact () {
  //     const res = await fetch(CAT_ENDPOINT_RANDOM_FACT)
  //     const data = await res.json()
  //     setFact(data.fact)
  //   }

  //   getRandomFact()
  // }, [])

  // useEffect(() => {
  //   if (!fact) return

  //   const firstWord = fact.split(' ')[0]

  //   async function getImage (firstWord) {
  //     const res = await fetch(`https://cataas.com/cat/says/${firstWord}?json=true`)
  //     const data = await res.json()
  //     setImageUrl(data.url)
  //   }

  //   getImage(firstWord)
  // }, [fact])

  return (
    <main>
      <h1>App de gatitos :3</h1>

      <button onClick={handleClick}>Get new fact</button>
      {fact && <p>{fact}</p>}
      {imageUrl && <img src={imageUrl} alt={`Image extracted using the first word from ${fact}`} />}
    </main>
  )
}
