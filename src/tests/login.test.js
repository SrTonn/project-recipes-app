import React from 'react';
import { render } from '@testing-library/react';
import Login from '../pages/login/Login';

test('Farewell, front-end', () => {
  const { getByText } = render(<Login />);
  const linkElement = getByText('Email');
  expect(linkElement).toBeInTheDocument();
});
