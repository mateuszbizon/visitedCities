import React from 'react';
import { act, render, fireEvent } from '@testing-library/react';
import { UserContext, UserProvider, useUser } from '../context/UserContext';


describe('UserContext', () => {
  beforeEach(() => {
    // Mock localStorage or any other necessary setup
    // ...
  });

  const TestComponent = () => {
    const { user, saveUser, logoutUser } = useUser();

    return (
      <div>
        <span data-testid="user-value">{user}</span>
        <button onClick={() => saveUser('TestUser')}>Save User</button>
        <button onClick={logoutUser}>Logout</button>
      </div>
    );
  };

  test('useUser hook returns correct value', () => {
    const { getByTestId, getByText } = render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    // Initially, user should be null
    expect(getByTestId('user-value').textContent).toBe('');

    // Save user and check if it updates
    fireEvent.click(getByText('Save User'));
    expect(getByTestId('user-value').textContent).toBe('TestUser');

    // Logout user and check if it updates back to null
    fireEvent.click(getByText('Logout'));
    expect(getByTestId('user-value').textContent).toBe('');
  });

  // You can write other tests in a similar manner without using renderHook
});
