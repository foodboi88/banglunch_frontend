import React from 'react'
import './styles.declare.scss'

interface MyProps{
    content: string;
    imageUrl: string
}

const CDeclare = (props: MyProps) => {
  return (
    <div className='container' style={{backgroundImage: `url(${props.imageUrl})`}}>
        <div className='content'>{props.content}</div>
       
    </div>
  )
}

export default CDeclare