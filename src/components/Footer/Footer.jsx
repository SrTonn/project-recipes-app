import React from 'react';
import styles from './styles.module.css';

export default function Footer() {
  return (
    <footer data-testid="footer" className={ styles.Footer }>
      <button type="button" data-testid="drinks-bottom-btn">drinks btn</button>
      <button type="button" data-testid="explore-bottom-btn">explore-bottom-btn</button>
      <button type="button" data-testid="food-bottom-btn">food-bottom-btn</button>
    </footer>
  );
}
