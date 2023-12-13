import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import MapContainer from '../components/MapContainer';
import List from '../components/List';
import Shadow from '../components/Shadow';
import LoginModal from '../components/LoginModal';
import { getAllUserLocations } from '../api';
import { useNotification } from '../context/NotifiactionContext';
import * as messages from "../constants/messages";
import { useUser } from '../context/UserContext';

function Map() {
    const [listActive, setListActive] = useState(false);
    const [allUserLocations, setAllUserLocations] = useState([]);
    const [userLocationsFiltered, setUserLocationsFiltered] = useState([]);
    const [clickedPlace, setClickedPlace] = useState(null);
    const [loginModalActive, setLoginModalActive] = useState(false);
    const { showErrorNotification } = useNotification();
    const { user } = useUser();

    function handleGetAllUserLocations() {
      getAllUserLocations()
        .then(data => {
          setAllUserLocations([...data.content]);
          setUserLocationsFiltered([...data.content])
          console.log(data.content)
        })
        .catch(() => {
          showErrorNotification(messages.getAllUserLocationsFailMessage);
        })
    }

    useEffect(() => {
      console.log(user)
      setAllUserLocations([]);
      setUserLocationsFiltered([]);
      
      if (user) {
        handleGetAllUserLocations();
      }
    }, [user])

  return (
    <div className='map'>
        <Shadow loginModalActive={loginModalActive} setLoginModalActive={setLoginModalActive} />
        <LoginModal loginModalActive={loginModalActive} setLoginModalActive={setLoginModalActive} />
        <Header listActive={listActive} setListActive={setListActive} setLoginModalActive={setLoginModalActive} />
        <div className='map-main-box'>
            <List
             listActive={listActive} 
             setListActive={setListActive} 
             allUserLocations={allUserLocations} 
             setAllUserLocations={setAllUserLocations} 
             userLocationsFiltered={userLocationsFiltered}
             setUserLocationsFiltered={setUserLocationsFiltered}
             clickedPlace={clickedPlace}
             setClickedPlace={setClickedPlace}
             />
            <MapContainer userLocationsFiltered={userLocationsFiltered} setClickedPlace={setClickedPlace} />
        </div>
    </div>
  )
}

export default Map