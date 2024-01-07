import React from 'react';
import { render, waitFor, cleanup } from '@testing-library/react';
import MapContainer from '../components/MapContainer';

describe('MapContainer Component', () => {
  afterEach(cleanup); 

  it('renders map with markers correctly', async () => {
    const userLocationsFiltered = [
      { latitude: 52, longitude: 21, name: 'Location 1' },
      { latitude: 53, longitude: 22, name: 'Location 2' },
    ];

    const setClickedPlace = jest.fn(); 

    const { getByText, getByTestId, queryByText } = render(
      <MapContainer userLocationsFiltered={userLocationsFiltered} setClickedPlace={setClickedPlace} />
    );

    const loadingText = queryByText('Loading Map...');
    expect(loadingText).toBeTruthy();

    setTimeout(() => {
      const updatedLoadingText = queryByText('Loading Map...');
      expect(updatedLoadingText).toBeNull();

      const mapElement = getByTestId('map-container');
      expect(mapElement).toBeTruthy();

      const markers = mapElement.querySelectorAll('.marker-class');
      expect(markers.length).toBe(userLocationsFiltered.length);
    }, 3000); 
  });
});
