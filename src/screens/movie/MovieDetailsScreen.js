import React, { useEffect, useState } from "react";
import {
	Text,
	SafeAreaView,
	View,
	TextInput,
	Button,
	Alert,
	ActivityIndicator,
	Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import styles from "./styles";

import {
	fetchMovie,
	addFavorite,
	fetchFavorite,
} from "../../redux/actions/movieActions";
import { TMDB_API_KEY } from "../../services/apiKey";

const MovieDetailsScreen = ({ route }) => {
	const base_url = "https://image.tmdb.org/t/p/original/";
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const { movieId, genre, fav, fromFav, name } = route.params;

	const [comment, setComment] = useState("");

	const url = `/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`;

	const movieDetail = useSelector((state) => state.movieDetails);
	const { movie, isError, isLoading } = movieDetail;

	const favMovies = useSelector((state) => state.favMovies);
	const { movies } = favMovies;

	useEffect(() => {
		dispatch(fetchMovie(url));
	}, [fetchMovie, url, dispatch, addFavorite]);

	const backHandler = () => {
		if (!fromFav) {
			navigation.navigate("movies", {
				genre: genre,
                name: name,
			});
		} else {
			navigation.navigate("home");
		}
	};

	const addToFavHandler = () => {
		Alert.alert("Add to Favorites?", `comment: ${comment}`, [
			{
				text: "yes",
				onPress: () => [
					dispatch(addFavorite(movie, comment)),
					dispatch(fetchFavorite()),
				],
				style: "default",
			},
			{
				text: "Cancel",
				onPress: () => console.log("Cancel Pressed"),
				style: "cancel",
			},
		]);
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
					<View style={styles.button}>
						<Button title="back" onPress={() => backHandler()} />
					</View>
					{movie && (
						<View>
							<Text style={styles.titleText}>{movie.title}</Text>
							<Text style={styles.description}>{movie.overview}</Text>
							<Image
								style={styles.poster}
								source={{ uri: `${base_url}${movie.poster_path}` }}
								alt={movie.name}
							/>
						</View>
					)}
					{fav && movies && (
						<View>
							<Text style={styles.comment}>Comment: {movies[movieId].comment}</Text>
						</View>
					)}
				</View>
			)}
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.textInput}
					placeholder="Comment"
					onChangeText={setComment}
					value={comment}
					underlineColorAndroid="transparent"
				/>
				<Feather
					onPress={addToFavHandler}
					name="heart"
					size={32}
					color="deepskyblue"
				/>
			</View>
		</SafeAreaView>
	);
};

export default MovieDetailsScreen;
