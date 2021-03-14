import { Link } from 'react-router-dom'
import styles from './Header.module.scss'

const Header = () => {
  return (
    <div className={styles.header}>
      <Link to='/'>
        <img src="https://i.pinimg.com/originals/3f/3d/d9/3f3dd9219f7bb1c9617cf4f154b70383.jpg" alt=""/>
        Shop</Link>
      </div>
  )
};

export default Header;