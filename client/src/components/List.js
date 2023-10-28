import React from 'react'

function List({ listActive }) {
  return (
    <div className={!listActive ? "list" : "list list-show"}>
        List
    </div>
  )
}

export default List