import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SearchCities from '../components/SearchCities';
import * as api from '../api/index';
import { useNotification } from '../context/NotificationContext';
import * as messages from '../constants/messages';


jest.mock('../context/NotifiactionContext');


describe('SearchCities component', () => {
  beforeEach(() => {
    useNotification.mockReturnValue({
      showNotification: jest.fn(),
      showErrorNotification: jest.fn(),
    });
  });

  jest.mock('axios', () => ({
    create: jest.fn(() => ({
      get: jest.fn(() => Promise.resolve({})),
      post: jest.fn(() => Promise.resolve({})),
    })),
  }));
  
  jest.mock('../api/index', () => ({
    getLocationsBySearch: jest.fn(),
    addNewLocationById: jest.fn(),
  }));

  it('renders SearchCities component correctly', () => {
    const { container } = render(<SearchCities />);
    expect(container.innerHTML).toMatchSnapshot();
  });

  it('performs city search on button click', async () => {
    const { getByPlaceholderText, getByText, container } = render(<SearchCities />);
    const searchInput = getByPlaceholderText('Szukaj miasta');
    const searchButton = getByText('Szukaj');

    fireEvent.change(searchInput, { target: { value: 'Warsaw' } });
    fireEvent.click(searchButton);

    expect(api.getLocationsBySearch).toHaveBeenCalledWith('Warsaw', false);

    const mockCities = [{ id: 1, name: 'Warsaw', commune: 'XYZ', district: 'ABC', province: 'PQR' }];
    api.getLocationsBySearch.mockResolvedValue({ content: mockCities });

    await waitFor(() => {
      expect(container.innerHTML).toContain('Warsaw');
    });
  });

  it('adds a new location on button click', async () => {
    const { getByText, container } = render(<SearchCities />);

    const mockCities = [{ id: 1, name: 'Warsaw', commune: 'XYZ', district: 'ABC', province: 'PQR' }];
    api.getLocationsBySearch.mockResolvedValue({ content: mockCities });

    const addButton = getByText('Dodaj miasto');
    fireEvent.click(addButton);

    expect(api.addNewLocationById).toHaveBeenCalledWith(1);

    api.addNewLocationById.mockResolvedValue();

    await waitFor(() => {
      expect(container.innerHTML).toContain(messages.newPlaceAddedSuccessMessage);
    });
  });

  it('handles errors when adding a new location', async () => {
    const { getByText, container } = render(<SearchCities />);

    const mockCities = [{ id: 1, name: 'Warsaw', commune: 'XYZ', district: 'ABC', province: 'PQR' }];
    api.getLocationsBySearch.mockResolvedValue({ content: mockCities });

    await waitFor(() => {
      expect(container.innerHTML).toContain('Warsaw');
    });

    const addButton = getByText('Dodaj miasto');
    fireEvent.click(addButton);

    expect(api.addNewLocationById).toHaveBeenCalledWith(1);

    const error422 = { response: { data: { statusCode: 422 } } };
    api.addNewLocationById.mockRejectedValue(error422);

    await waitFor(() => {
      expect(container.innerHTML).toContain(messages.newPlaceAlreadyAddedMessage);
    });

    const otherError = { response: { data: { statusCode: 500 } } };
    api.addNewLocationById.mockRejectedValue(otherError);

    await waitFor(() => {
      expect(container.innerHTML).toContain(messages.newPlaceAddedFailMessage);
    });
  });
});
