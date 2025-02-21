import { useEffect, useState } from 'react'
import './App.css'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
// const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}?fontSize=50&fontColor=red&json=true`

export const App = () => {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()

  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then(res => res.json())
      .then(data => {
        const { fact } = data
        setFact(fact)
      })
  }, [])

  useEffect(() => {
    if (!fact) return

    const firstWord = fact.split(' ')[0]

    fetch(`https://cataas.com/cat/says/${firstWord}?json=true`)
      .then(res => res.json())
      .then(data => {
        const { url } = data
        setImageUrl(url)
      })
  }, [fact])

  // fetch with async await

  // useEffect(() => {
  //   async function getRandomFact () {
  //     const res = await fetch(CAT_ENDPOINT_RANDOM_FACT)
  //     const json = await res.json()
  //     setFact(json.fact)
  //   }

  //   getRandomFact()
  // }, [])

  // useEffect(() => {
  //   if (!fact) return

  //   const firstWord = fact.split(' ')[0]

  //   async function getImage (firstWord) {
  //     const res = await fetch(`https://cataas.com/cat/says/${firstWord}?json=true`)
  //     const json = await res.json()
  //     setImageUrl(json.url)
  //   }

  //   getImage(firstWord)
  // }, [fact])

  return (
    <main>
      <h1>App de gatitos :3</h1>
      {fact && <p>{fact}</p>}
      {imageUrl && <img src={imageUrl} alt={`Image extracted using the first word from ${fact}`} />}
    </main>
  )
}
