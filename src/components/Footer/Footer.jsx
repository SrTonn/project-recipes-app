import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../Button/Button';
import styles from './styles.module.css';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

export default function Footer() {
  const { push } = useHistory();

  const handleClick = () => {
    push('/drinks');
  };

  return (
    <footer data-testid="footer" className={ styles.Footer }>
      <Button
        src="drinkIcon"
        dataTestId="drinks-bottom-btn"
        buttonName={ <img src={ drinkIcon } alt="drinkIcon" /> }
        handleClick={ handleClick }
      />
      <Button
        src="exploreIcon"
        dataTestId="explore-bottom-btn"
        buttonName={ <img src={ exploreIcon } alt="exploreIcon" /> }
      />
      <Button
        src="mealIcon"
        dataTestId="food-bottom-btn"
        buttonName={ <img src={ mealIcon } alt="mealIcon" /> }
      />
    </footer>
  );
}
