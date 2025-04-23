import '../styles/header.css'
import logo from '../assets/pokemon_logo.png'

export const Header = () => {
  return (
    <nav className='header'>
      <div className='div-header'>
        <div className='logo'>
          <img src={logo} alt='logo' />
        </div>
        <div className='div-search'>
          <input type='search' />
        </div>
      </div>
    </nav>
  )
}
