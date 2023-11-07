import React, { useState, useEffect } from 'react';
import SearchCities from './SearchCities';

function List({ listActive, setListActive }) {
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    if (window.innerWidth >= 992) {
      setListActive(true);
    }
  }, [])

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