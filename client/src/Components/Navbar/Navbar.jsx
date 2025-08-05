import React, { useContext, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'

export const Navbar = () => {

    const [menu,setMenu] = useState("shop");
    const {getTotalCartItems} = useContext(ShopContext);

  return (
    <div className='navbar'>
        <div className='nav-logo'>
            <img src={logo} width="50px" alt="" />
            <p>SHOP NAME</p>
        </div>
        <ul className="nav-menu">
            <li onClick={()=>{setMenu("shop")}}><Link style={{ textDecoration: 'none' }} to='/'>SHOP</Link>{menu==="shop"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("cat1")}}><Link style={{ textDecoration: 'none' }} to='/cat1'>CATEGORY 1</Link>{menu==="cat1"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("cat2")}}><Link style={{ textDecoration: 'none' }} to='/cat2'>CATEGORY 2</Link>{menu==="cat2"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("cat3")}}><Link style={{ textDecoration: 'none' }} to='/cat3'>CATEGORY 3</Link>{menu==="cat3"?<hr/>:<></>}</li>
        </ul>
        <div className='nav-login-cart'>
            <Link to='/login'><button>Login</button></Link>
            <Link to='/cart'><img src={cart_icon} width="50px" alt=''/></Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
    </div>
  )
}
