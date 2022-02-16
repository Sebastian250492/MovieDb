import {
	FETCH_GENRE_INITIATED,
	FETCH_GENRE_FAILED,
	FETCH_GENRE_SUCCEEDED,
  } from "../constants/movieConstants";
  
  const INITIAL_STATE = {
    isError: false,
    isLoading: false,
    success: false,
  };
  
  export const genreList = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case FETCH_GENRE_INITIATED:
        return {
          ...state,
          isError: false,
          isLoading: true
        };
  
      case FETCH_GENRE_FAILED:
        return {
          ...state,
          isError: true,
          isLoading: false
        };
  
      case FETCH_GENRE_SUCCEEDED:
        return {
          ...state,
          genres: action.payload,
          isError: false,
          isLoading: false,
          success: true,
        };
  
      default:
        return state;
    }
  };