import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

import Button from '../Button/Button';
import styles from './styles.module.css';
import { getCategories } from '../../services/fetchCategories';
import Context from '../../context/Context';

export default function Categories() {
  const { setRecipesInfo } = useContext(Context);
  const [categories, setCategories] = useState([]);
  const FIRST_FIVE_CATEGORIES = 5;
  const { pathname } = useLocation();
  const recipeType = (pathname === '/foods' ? 'meal' : 'cocktail');
  const [lastFiltered, setLastFiltered] = useState('All');

  useEffect(() => {
    (async () => {
      const categoriesTreated = await getCategories(recipeType);

      const categoriesRecipes = categoriesTreated.meals || categoriesTreated.drinks;
      const slicedCategories = categoriesRecipes
        .map((category) => category.strCategory)
        .slice(0, FIRST_FIVE_CATEGORIES);
      setCategories(['All', ...slicedCategories]);
    })();
  }, []);

  const handleClick = ({ name }) => {
    let query;
    let endpoint;
    if (name !== 'All' && name !== lastFiltered) {
      query = name;
      endpoint = `https://www.the${recipeType}db.com/api/json/v1/1/filter.php?c=${query}`;
      setLastFiltered(name);
    } else {
      query = '';
      endpoint = `https://www.the${recipeType}db.com/api/json/v1/1/search.php?s=${query}`;
    }
    setRecipesInfo({
      canRedirect: false,
      canUpdate: true,
      pathname,
      endpoint,
    });
  };
  // https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert
  return (
    <div className={ styles.Categories }>
      {categories.map((category) => (
        <Button
          name={ category }
          key={ category }
          buttonName={ category }
          className={ styles.Button }
          dataTestId={ `${category}-category-filter` }
          handleClick={ handleClick }
        />
      ))}
    </div>
  );
}
