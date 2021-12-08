import React, { useEffect, useContext } from 'react';
import { getFirstRecipes, getCategoriesItens } from '../services/funcs';
import Categories from '../components/Categories';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cards from '../components/Cards';
import { myContext } from '../context/Provider';

export default function Bebidas() {
  const {
    category,
    recipes,
    setRecipes,
    setFoodOrDrink,
  } = useContext(myContext);

  setFoodOrDrink('drink');

  const getItens = async () => {
    const newRecipes = await getFirstRecipes('drinks');
    setRecipes(newRecipes);
  };

  const getNewRecipe = async () => {
    if (category === 'All') {
      getItens();
      return;
    }
    const newRecipes = await getCategoriesItens('drinks', category);
    setRecipes(newRecipes);
  };

  useEffect(() => {
    getItens();
  }, []);

  useEffect(() => {
    getNewRecipe();
  }, [category]);

  return (
    <div>
      <Header title="Bebidas" buttonDisable={ false } />
      <Categories type="drinks" />
      <Cards info={ recipes } type="drinks" />
      <Footer />
    </div>
  );
}
