import React from 'react'

function Message({classes,text, userId, date, time}) {
  return (
    <div className={classes}>
        <p className='text-rose-500'>{userId}</p>
        <p className='break-words'>{text}</p>
        <div className='text-end'>
            <span className='mr-2 text-xs'>{date}</span>
            <span className='text-xs text-center'>{time}</span>
        </div>
    </div>
  )
}

export default Message
