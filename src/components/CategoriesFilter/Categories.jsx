import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

import Button from '../Button/Button';
import styles from './styles.module.css';
import getCategories from '../../services/fetchCategories';

export default function Categories() {
  const [categories, setCategories] = useState([]);

  const FIRST_SIX_CATEGORIES = 5;
  const location = useLocation();
  useEffect(() => {
    (async () => {
      const recipeType = (location.pathname === '/foods' ? 'meal' : 'cocktail');
      const categoriesTreated = await getCategories(`https://www.the${recipeType}db.com/api/json/v1/1/list.php?c=list`);

      const categoriesRecipes = categoriesTreated.meals || categoriesTreated.drinks;
      const slicedCategories = categoriesRecipes
        .map((category) => category.strCategory)
        .slice(0, FIRST_SIX_CATEGORIES);
      setCategories(slicedCategories);
      console.log(slicedCategories);
    })();
  }, []);

  return (
    <div className={ styles.Categories }>
      {categories.map((category) => (
        <Button
          key={ category }
          buttonName={ category }
          className={ styles.Button }
          dataTestId={ `${category}-category-filter` }
        />
      ))}
    </div>
  );
}
