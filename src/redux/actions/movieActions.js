import {
	FETCH_GENRE_INITIATED,
	FETCH_GENRE_FAILED,
	FETCH_GENRE_SUCCEEDED,
	FETCH_MOVIE_INITIATED,
	FETCH_MOVIE_FAILED,
	FETCH_MOVIE_SUCCEEDED,
	FETCH_MOVIES_INITIATED,
	FETCH_MOVIES_FAILED,
	FETCH_MOVIES_SUCCEEDED,
	SEARCH_QUERY_SUBMITTED,
	REMOVED_FAVORITE,
	GET_FAVORITE,
} from "../constants/movieConstants";

import { auth, db } from "../../services/firebase";
import { ref, set, onValue } from "firebase/database";
import axios from "../../services/axios";
import { TMDB_API_KEY } from "../../services/apiKey";

export const fetchMovie = (url) => async (dispatch) => {
	dispatch({ type: FETCH_MOVIE_INITIATED });

	try {
		const response = await axios.get(url);
		dispatch({ type: FETCH_MOVIE_SUCCEEDED, payload: response.data });
	} catch (error) {
		dispatch({ type: FETCH_MOVIE_FAILED });
		console.error("%cData Fetching Error:", "font-size: 18px", error);
	}
};

//! Make One fetchMovie function with optional args or handling for multiple requests...
export const fetchGenre = (url) => async (dispatch) => {
	dispatch({ type: FETCH_GENRE_INITIATED });

	try {
		const response = await axios.get(url);

		dispatch({ type: FETCH_GENRE_SUCCEEDED, payload: response.data.genres });
	} catch (error) {
		dispatch({ type: FETCH_GENRE_FAILED });
		console.error("%cData Fetching Error:", "font-size: 18px", error);
	}
};

export const fetchMovies =
	(url, query = "") =>
	async (dispatch) => {
		if (query) {
			dispatch({ type: SEARCH_QUERY_SUBMITTED, payload: query });
		}

		dispatch({ type: FETCH_MOVIES_INITIATED });

		try {
			const response = await axios.get(url);

			await Promise.all(
				response.data.results.map(async (movie) => {
					const responseDetails = await axios.get(
						`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${TMDB_API_KEY}&&language=en-US`
					);

					movie.details = responseDetails.data;
				})
			);

			dispatch({
				type: FETCH_MOVIES_SUCCEEDED,
				payload: response.data.results,
			});
		} catch (error) {
			dispatch({ type: FETCH_MOVIES_FAILED });
			console.error("%cData Fetching Error:", "font-size: 18px", error);
		}
	};

export const addFavorite = (movie, comment) => async (dispatch) => {
	const movieId = movie.id;

	set(ref(db, String(auth.currentUser.uid + "/") + movieId), {
		movie: movie,
		comment: comment,
	})

};

export const fetchFavorite = () => async (dispatch) => {
	// const dbRef = ref(db);
	// get(child(dbRef, `${auth.currentUser.uid}`))
	// 	.then((snapshot) => {
	// 		if (snapshot.exists()) {
	// 			console.log(snapshot.val());
	// 			return dispatch({ type: GET_FAVORITE, payload: snapshot.val() });
	// 		} else {
	// 			console.log("No data available");
	// 		}
	// 	})
	// 	.catch((error) => {
	// 		console.error(error);
	// 	});

	const starCountRef = ref(db, `${auth.currentUser.uid}`);
	onValue(starCountRef, (snapshot) => {
		const data = snapshot.val();
		return dispatch({ type: GET_FAVORITE, payload: snapshot.val() });
	});
};
