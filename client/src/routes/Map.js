import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import MapContainer from '../components/MapContainer';
import List from '../components/List';
import { getAllUserLocations } from '../api';
import { useNotification } from '../context/NotifiactionContext';
import * as messages from "../constants/messages";

function Map() {
    const [listActive, setListActive] = useState(false);
    const [allUserLocations, setAllUserLocations] = useState([]);
    const { showErrorNotification } = useNotification();

    function handleGetAllUserLocations() {
      getAllUserLocations()
        .then(data => {
          setAllUserLocations([...data.content]);
          console.log(data.content)
        })
        .catch(() => {
          showErrorNotification(messages.getAllUserLocationsFailMessage);
        })
    }

    useEffect(() => {
      handleGetAllUserLocations();
    }, [])

  return (
    <div className='map'>
        <Header listActive={listActive} setListActive={setListActive} />
        <div className='map-main-box'>
            <List listActive={listActive} setListActive={setListActive} />
            <MapContainer allUserLocations={allUserLocations} />
        </div>
    </div>
  )
}

export default Map