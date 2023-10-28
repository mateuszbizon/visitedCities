import React, { useState } from 'react';
import Header from '../components/Header';
import MapContainer from '../components/MapContainer';
import List from '../components/List';

function Map() {
    const [listActive, setListActive] = useState(false);

  return (
    <div className='map'>
        <Header listActive={listActive} setListActive={setListActive} />
        <div className='map-main-box'>
            <List listActive={listActive} />
            <MapContainer />
        </div>
    </div>
  )
}

export default Map