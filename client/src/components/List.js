import React, { useState } from 'react';

function List({ listActive }) {
  const [isSearchActive, setIsSearchActive] = useState(false);

  function changeSearchActive() {
    setIsSearchActive(!isSearchActive);
  }

  return (
    <div className={!listActive ? "list" : "list list-show"}>
        <div className='list__main-btns'>
          <button className={isSearchActive ? "list__main-btn" : "list__main-btn list__main-btn--active"} onClick={changeSearchActive}>Miasta</button>
          <button className={!isSearchActive ? "list__main-btn" : "list__main-btn list__main-btn--active"} onClick={changeSearchActive}>Szukaj</button>
        </div>
    </div>
  )
}

export default List