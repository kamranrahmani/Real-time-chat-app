import React from 'react'

function Message({classes,text, userId, date, time}) {
    const styles = 'flex flex-col space-y-1 w-96 px-2 rounded-md ' + classes
  return (
    <div className={styles}>
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
