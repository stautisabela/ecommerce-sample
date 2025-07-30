import React from 'react'
import './Hero.css'
import sparkle_icon from '../Assets/sparkle_icon.png'
import arrow_icon from '../Assets/arrow_icon.png'
import hero_image from '../Assets/hero_image.png'

export const Hero = () => {
  return (
    <div className='hero'>
        <div className="hero-left">
            <h2>NEW ARRIVALS ONLY</h2>
            <div>
                <div className="hero-sparkle-icon">
                    <p>new</p>
                    <img src={sparkle_icon} width="50px" alt=''/>
                </div>
                <p>collections</p>
                <p>for everyone</p>
            </div>
             <div className="hero-latest-btn">
                <div>Latest Collection</div>
                <img src={arrow_icon} width="50px" alt=''/>
            </div>
        </div>
        <div className="hero-right">
            <img src={hero_image} alt=''/>
        </div>

    </div>
  )
}

export default Hero