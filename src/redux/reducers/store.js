import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from '@redux-devtools/extension';

import { auth } from "./authReducer";
import { movieDetails } from "./movieDetailsReducer"
import { favMovies } from "./movieFavReducer"
import { movieList } from "./moviesReducer"
import { genreList } from "./movieGenreReducer"

const reducer = combineReducers({
	auth,
	movieDetails,
	movieList, 
	genreList,
	favMovies,
})

const middleware = [thunk];

const store = createStore(
	reducer,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
