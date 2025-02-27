import { Link } from './Link.jsx'

export default function AboutPage () {
  return (
    <>
      <h1>About</h1>
      <div>
        <img
          src='https://pbs.twimg.com/profile_images/1784774335632166912/HkiNseOM_400x400.jpg'
          alt='Fjad photo'
        />
        <p>Hi! my name is Francisco and I'm creating a React router clone.</p>
      </div>
      <Link to='/'>Go to homepage</Link>
    </>
  )
}
