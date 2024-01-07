import React from 'react';
import { act, render, fireEvent } from '@testing-library/react';
import { UserContext, UserProvider, useUser } from '../context/UserContext';


describe('UserContext', () => {
  beforeEach(() => {
  
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

   
    expect(getByTestId('user-value').textContent).toBe('');

 
    fireEvent.click(getByText('Save User'));
    expect(getByTestId('user-value').textContent).toBe('TestUser');

 
    fireEvent.click(getByText('Logout'));
    expect(getByTestId('user-value').textContent).toBe('');
  });

});
