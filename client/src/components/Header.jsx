import '../styles/header.css'
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className='flex-row-spacebtw header'>
      <div className='website-name'>
        <Link to="/">Narrative</Link>
      </div>
      <div className='flex-row-center'>
        <Link to='/all' className='header-link'>All</Link>
        <Link to='/culture' className='header-link'>Culture</Link>
        <Link to='/lifestyle' className='header-link'>Lifestyle</Link>
        <Link to='/technology' className='header-link'>Technology</Link>
        <Link to='/people' className='header-link'>People</Link>
      </div>
      <div className='flex-row-center'>
      <Link to='/addpost' className='header-button'>Create Post</Link>
        <Link to='/signup' className='header-button'>Sign up</Link>
      </div>
    </div>
  )
}

export default Header