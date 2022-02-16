import React, { useEffect } from "react";
import {
	Text,
	TouchableOpacity,
	FlatList,
	SafeAreaView,
	View,
	Button,
	ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import styles from "./styles";

import { FETCH_MOVIES_RESET } from "../../redux/constants/movieConstants";

import { fetchMovies } from "../../redux/actions/movieActions";
import { fetchFavorite } from "../../redux/actions/movieActions";

import { TMDB_API_KEY } from "../../services/apiKey";

const MoviesScreen = ({ route }) => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const { genre } = route.params;
	const { name } = route.params;

	const url = `/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genre}`;

	const movieList = useSelector((state) => state.movieList);
	const { movies, isError, isLoading } = movieList;

	const favMoviesList = useSelector((state) => state.favMovies);
	const { movies: favMovies } = favMoviesList;

	useEffect(() => {
		if (!favMovies) {
			dispatch(fetchFavorite());
		}
		dispatch(fetchMovies(url));
	}, [fetchMovies, fetchFavorite, favMovies, url, dispatch]);

	const navigateHandler = (id, inFav) => {
		navigation.navigate("details", {
			movieId: id,
			genre: genre,
			name: name,
			fav: inFav,
			fromFav: false,
		});
	};

	const Item = ({ item, onPress, backgroundColor, textColor, inFav }) => (
		<TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
			<Text style={[styles.itemTitle, textColor]}>{item.title}</Text>
			{inFav && <Feather name="heart" size={16} color="deepskyblue" />}
		</TouchableOpacity>
	);
	const renderItem = ({ item }) => {
		const backgroundColor = "lightgray";
		const color = "black";
		let inFav = null
		if (favMovies){
			inFav = Object.keys(favMovies).find((mov) => mov == item.id);
		}

		return (
			<Item
				item={item}
				onPress={() => navigateHandler(item.id, inFav)}
				backgroundColor={{ backgroundColor }}
				textColor={{ color }}
				inFav={inFav}
			/>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			{isError && <Text>An error occured, please try again.</Text>}
			{isLoading ? (
				<View style={styles.horizontal}>
					<ActivityIndicator size="large" color="#0000ff" />
				</View>
			) : (
				<View>
					<View style={styles.button}>
						<Button
							title="back"
							onPress={() => [
								navigation.navigate("home"),
								dispatch({ type: FETCH_MOVIES_RESET }),
							]}
						/>
					</View>
					<Text style={styles.titleText}>{name}</Text>
					<FlatList
						data={movies}
						renderItem={renderItem}
						keyExtractor={(item) => item.id}
					/>
				</View>
			)}
		</SafeAreaView>
	);
};

export default MoviesScreen;
