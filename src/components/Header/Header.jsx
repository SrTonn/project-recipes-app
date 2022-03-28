import React from 'react';
import Button from '../Button/Button';

export default function Header() {
  return (
    <main>
      <Button dataTestId="profile-top-btn" />
      <p data-testid="page-title">Título</p>
      <Button dataTestId="search-top-btn" />
    </main>
  );
}
