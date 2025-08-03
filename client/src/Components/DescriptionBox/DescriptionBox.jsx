import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='description-box'>
        <div className="description-box-navigator">
            <div className="description-box-nav-box">Description</div>
            <div className="description-box-nav-box fade">Reviews (122)</div>
        </div>
        <div className="description-box-description">
            <p>Sed efficitur turpis et urna gravida facilisis. Nullam massa mi, commodo eu sem non,
                hendrerit aliquet quam. Maecenas eleifend sed ante et malesuada. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit. Integer porttitor et orci in blandit. Quisque
                a accumsan orci, quis pharetra odio. Nulla nulla velit, ultrices ac nisi tristique,
                lobortis tempor nibh.</p>
            <p>Nulla pharetra eleifend orci accumsan porttitor. Donec bibendum ligula nec nulla ultrices,
                in mattis mauris pellentesque.</p>
        </div>
    </div>
  )
}

export default DescriptionBox