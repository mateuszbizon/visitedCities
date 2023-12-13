import React, { useState, useEffect } from 'react';
import SearchCities from './SearchCities';
import VisitedCities from './VisitedCities';
import { useUser } from '../context/UserContext';

function List({ 
  listActive, 
  setListActive, 
  allUserLocations, 
  setAllUserLocations, 
  userLocationsFiltered, 
  setUserLocationsFiltered, 
  clickedPlace, 
  setClickedPlace 
}) {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (window.innerWidth >= 992) {
      setListActive(true);
    }
  }, [])

  return (
    <div className={!listActive ? "list" : "list list-show"}>
        {user ? (
          <>
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
              clickedPlace={clickedPlace}
              setClickedPlace={setClickedPlace}
              />
            )}
          </>
        ) : (
          <p className='list__no-user-message'>Zaloguj się aby dodawać, przeglądać oraz usuwać miejsca.</p>
        )}
    </div>
  )
}

export default List