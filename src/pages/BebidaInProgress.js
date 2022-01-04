/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { myContext } from '../context/Provider';
import { getItemById } from '../services/funcs';
import { doneRecipe } from '../services/funcs2';
import FavoriteAndShareButtons from '../components/FavoriteAndShareButtons';
import IngredientsWithCheckbox from '../components/IngredientsWithCheckbox';

export default function BebidaInProgress({ match: { params: { id } } }) {
  const [numberChecked, setNumberChecked] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [info, setInfo] = useState([]);
  const { currentRecipe } = useContext(myContext);

  const getInfo = async () => {
    const item = await getItemById('drinks', id);
    setInfo(item);
  };

  const buttonChange = () => {
    // Lógica para habilitar o botão
    const entries = Object.entries(info[0]);
    const ingredients = entries
      .filter((arr) => /strIngredient/.test(arr[0]) && arr[1]);
    const checkboxesLength = ingredients.length;
    if (checkboxesLength === numberChecked && checkboxesLength !== 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  useEffect(() => {
    getInfo();
  }, [currentRecipe]);

  useEffect(() => {
    if (info.length) {
      buttonChange();
    }
  }, [numberChecked]);

  const renderItem = () => {
    const {
      idDrink,
      strDrink,
      strDrinkThumb,
      strCategory,
      strInstructions,
    } = info[0];

    return (
      <>
        <img data-testid="recipe-photo" src={ strDrinkThumb } alt={ strDrink } />
        <h1 data-testid="recipe-title">{ strDrink }</h1>

        <FavoriteAndShareButtons type="bebidas" id={ idDrink } />

        <p data-testid="recipe-category">{ strCategory }</p>
        <h2>Ingredientes</h2>

        <IngredientsWithCheckbox
          id={ id }
          type="drinks"
          item={ info[0] }
          numberChecked={ numberChecked }
          setNumberChecked={ setNumberChecked }
        />

        <h2>Instruções</h2>
        <p data-testid="instructions">{ strInstructions }</p>

        <Link to="/receitas-feitas">
          <button
            data-testid="finish-recipe-btn"
            type="button"
            disabled={ disabled }
            onClick={ () => {
              doneRecipe(info[0], 'drinks');
            } }
          >
            Finalizar receita
          </button>
        </Link>
      </>
    );
  };

  return (
    <div>
      { !!info.length && renderItem() }
    </div>
  );
}

BebidaInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string }),
  }).isRequired,
};
