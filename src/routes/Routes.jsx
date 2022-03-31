import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from '../pages/login/Login';
import DoneRecipes from '../pages/DoneRecipes';
import Explore from '../pages/Explore';
import ExploreDrinksIngredients from '../pages/ExploreDrinksIngredients';
import ExploreNationalities from '../pages/ExploreNationalities';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import ExploreFoodsIngredients from '../pages/ExploreFoodsIngredients';
import ExploreDrinks from '../pages/ExploreDrinks';
import Foods from '../pages/foods/Foods';
import Drinks from '../pages/drinks/Drinks';
import DrinkInProgress from '../pages/drinks/DrinkInProgress';
import ExploreFoods from '../pages/ExploreFoods';
import FoodDetails from '../pages/foods/FoodDetails';
import FoodInProgress from '../pages/foods/FoodInProgress';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/foods/:id" component={ FoodDetails } />
        <Route path="/foods/:id/in-progress" component={ FoodInProgress } />
        <Route path="/drinks/:id/in-progress" component={ DrinkInProgress } />
        <Route path="/explore" component={ Explore } />
        <Route path="/explore/foods" component={ ExploreFoods } />
        <Route path="/explore/drinks" component={ ExploreDrinks } />
        <Route path="/explore/foods/ingredients" component={ ExploreFoodsIngredients } />
        <Route
          path="/explore/drinks/ingredients"
          component={ ExploreDrinksIngredients }
        />
        <Route path="/explore/foods/nationalities" component={ ExploreNationalities } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route path="*" component={ NotFound } />
      </Switch>
    </BrowserRouter>
  );
}
