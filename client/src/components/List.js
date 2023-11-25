import React, { useState, useEffect } from 'react';
import SearchCities from './SearchCities';
import VisitedCities from './VisitedCities';

function List({ listActive, setListActive, allUserLocations, setAllUserLocations, userLocationsFiltered, setUserLocationsFiltered }) {
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

        {isSearchActive ? <SearchCities allUserLocations={allUserLocations} setAllUserLocations={setAllUserLocations} /> : (
          <VisitedCities 
          allUserLocations={allUserLocations}
          setAllUserLocations={setAllUserLocations} 
          userLocationsFiltered={userLocationsFiltered} 
          setUserLocationsFiltered={setUserLocationsFiltered} 
          />
        )}
    </div>
  )
}

export default List