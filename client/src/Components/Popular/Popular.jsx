import React, { useEffect } from 'react'
import './Popular.css'
import Item from '../Item/Item'

const Popular = () => {

  const [popularItems, setPopularItems] = React.useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/popularitems')
    .then((res)=>res.json())
    .then((data)=>setPopularItems(data));
  }, [])

  return (
    <div className='popular'>
        <h1>POPULAR IN WOMEN</h1>
        <hr />
        <div className='popular-item'>
            {popularItems.map((item, i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            })}
        </div>
    </div>
  )
}

export default Popular