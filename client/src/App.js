import logo from './logo.svg';
import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import ShopCategory from './Pages/ShopCategory';
import { Shop } from './Pages/Shop';
import { Product } from './Pages/Product';
import { Cart } from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/cat1' element={<ShopCategory category="cat1"/>}/>
        <Route path='/cat2' element={<ShopCategory category="cat2"/>}/>
        <Route path='/cat3' element={<ShopCategory category="cat3"/>}/>
        <Route path='/product' element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
      

    </div>
  );
}

export default App;
