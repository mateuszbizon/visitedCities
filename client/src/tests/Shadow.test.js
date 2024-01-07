import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Shadow from '../components/Shadow'; 


const mockSetLoginModalActive = jest.fn();

describe('Shadow Component', () => {
  it('should render Shadow component with proper classes and simulate click event', () => {
    const { container } = render(
      <Shadow loginModalActive={true} setLoginModalActive={mockSetLoginModalActive} />
    );

    const shadowDiv = container.querySelector('.shadow.show-shadow');
    expect(shadowDiv).toBeTruthy(); 

    fireEvent.click(shadowDiv);
    expect(mockSetLoginModalActive).toHaveBeenCalledWith(false); 
  });

  it('should render Shadow component without show-shadow class when loginModalActive is false', () => {
    const { container } = render(
      <Shadow loginModalActive={false} setLoginModalActive={mockSetLoginModalActive} />
    );

    const shadowDiv = container.querySelector('.shadow');
    expect(shadowDiv).toBeTruthy(); 
  });
});
