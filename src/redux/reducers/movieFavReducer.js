
import {
    REMOVED_FAVORITE,
    GET_FAVORITE,
  } from "../constants/movieConstants";
  
  // Add functionality to display message on add and delete.
  // as well as Show delete button if it exists in favorites...

  const INITIAL_STATE = {
    movies: [],
  };
  
  export const favMovies = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case GET_FAVORITE:
        return {
          movies: action.payload,
        };
  
      case REMOVED_FAVORITE:
        return {
          movies: action.payload,
        };
  
      default:
        return state;
    }
  };