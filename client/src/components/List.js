import React, { useState } from 'react';
import SearchCities from './SearchCities';

function List({ listActive }) {
  const [isSearchActive, setIsSearchActive] = useState(false);

  return (
    <div className={!listActive ? "list" : "list list-show"}>
        <div className='list__main-btns'>
          <button className={isSearchActive ? "list__main-btn" : "list__main-btn list__main-btn--active"} onClick={() => setIsSearchActive(false)}>Miasta</button>
          <button className={!isSearchActive ? "list__main-btn" : "list__main-btn list__main-btn--active"} onClick={() => setIsSearchActive(true)}>Szukaj</button>
        </div>

        {isSearchActive ? <SearchCities /> : (
          <div>
            miasta
          </div>
        )}
    </div>
  )
}

export default List