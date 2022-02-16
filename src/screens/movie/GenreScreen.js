import React, { useEffect } from "react";
import {
	Text,
	TouchableOpacity,
	FlatList,
	SafeAreaView,
	View,
	ActivityIndicator
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { fetchGenre } from "../../redux/actions/movieActions";
import { fetchFavorite } from "../../redux/actions/movieActions";

import styles from "./styles"

import { TMDB_API_KEY } from "../../services/apiKey";

const GenreScreen = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();

	const favMoviesList = useSelector((state) => state.favMovies);
	const { movies: favMovies } = favMoviesList;

	const url = `/genre/movie/list?api_key=${TMDB_API_KEY}&language=en-US`;

	const genreList = useSelector((state) => state.genreList);
	const { genres, isError, isLoading, success } = genreList;

	useEffect(() => {
		if (!genres) {
			dispatch(fetchGenre(url));
		}
		if (!favMovies) {
			dispatch(fetchFavorite());
		}
	}, [fetchGenre, url, dispatch, genres]);

	const navigateHandler = (item) => {
		navigation.navigate("movies", {
			genre: item.id,
			name: item.name,
		});
	};

	const Item = ({ item, onPress, backgroundColor, textColor }) => (
		<TouchableOpacity onPress={onPress} style={[styles.genre, backgroundColor]}>
			<Text style={[styles.itemTitle, textColor]}>{item.name}</Text>
		</TouchableOpacity>
	);

	const renderItem = ({ item }) => {
		const backgroundColor = "lightgray";
		const color = "black";

		return (
			<Item
				item={item}
				onPress={() => navigateHandler(item)}
				backgroundColor={{ backgroundColor }}
				textColor={{ color }}
			/>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			{isError && <div>An error occured, please try again.</div>}
			{isLoading ? (
				<View style={styles.horizontal}>
					<ActivityIndicator size="large" color="#0000ff" />
				</View>
			) : (
				<View>
					<Text style={styles.titleText}>Genres</Text>
					<FlatList
						data={genres}
						renderItem={renderItem}
						keyExtractor={(item) => item.id}
						numColumns={2}
					/>
				</View>
			)}
		</SafeAreaView>
	);
};

export default GenreScreen;
