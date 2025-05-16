import '../styles/header.css'
import * as FaIcons from 'react-icons/fa'
import logo from '../assets/pokemon_logo.png'

export const Header = ({ getSearch }) => {
  return (
    <nav className='header'>
      <div className='div-header'>
        <div className='logo'>
          <img src={logo} alt='logo' />
        </div>
        <div className='search-container'>
          <div>
            <FaIcons.FaSearch />
          </div>
          <input type='search' onChange={(e) => getSearch(e.target.value)} />
        </div>
      </div>
    </nav>
  )
}
