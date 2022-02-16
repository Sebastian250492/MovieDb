import {
    FETCH_MOVIES_INITIATED,
    FETCH_MOVIES_FAILED,
    FETCH_MOVIES_SUCCEEDED,
    SEARCH_QUERY_SUBMITTED,
    FETCH_MOVIES_RESET
  } from "../constants/movieConstants";
  
  const INITIAL_STATE = {
    movies: [],
    submittedQuery: "",
    isError: false,
    isLoading: false,
  };
  
  export const movieList = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case FETCH_MOVIES_INITIATED:
        return {
          ...state,
          isError: false,
          isLoading: true,
        };
  
      case FETCH_MOVIES_FAILED:
        return {
          ...state,
          isError: true,
          isLoading: false,
        };
  
      case FETCH_MOVIES_SUCCEEDED:
        return {
          ...state,
          movies: action.payload,
          isError: false,
          isLoading: false,
        };

        case FETCH_MOVIES_RESET:
        return {
          ...state,
          movies: [],
          isError: false,
          isLoading: false,
        };
  
      case SEARCH_QUERY_SUBMITTED:
        return {
          ...state,
          submittedQuery: action.payload,
        };
  
      default:
        return state;
    }
  };