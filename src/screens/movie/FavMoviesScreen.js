import React, { useEffect, useState } from "react";
import {
	Text,
	TouchableOpacity,
	SafeAreaView,
	View,
	FlatList,
	ActivityIndicator,
	Button
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { fetchFavorite } from "../../redux/actions/movieActions";
import { logout } from "../../redux/actions/authActions";
import styles from "./styles";
import { Feather } from "@expo/vector-icons";

const FavMoviesScreen = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	// const [movies, setMovies] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const favMovies = useSelector((state) => state.favMovies);
	const { movies } = favMovies;

	let movieList = [];

	Object.keys(movies).map((oneKey, i) => {
		movieList.push(movies[oneKey].movie);
	});

	useEffect(() => {
		retrieveData();
	}, [retrieveData]);

	// Ein paar verschiedene Möglichkeiten inkl. locale Speicherung der Daten
	const retrieveData = async () => {
		// AsyncStorage
		// .then
		// AsyncStorage.getItem('MOVIES').then((value) => {
		// 	if (value !== null) {
		// 		value = JSON.parse(movies)
		// 		setMovies(value)
		// 	}
		// })

		// await + async im Funktiosaufruf
		// let value = await AsyncStorage.getItem("MOVIES");
		// if (value !== null) {
		// 	value = JSON.parse(movies);
		// 	setMovies(value);
		// }

		// SQL & Tabelle
		// database.transaction((transaction) =>
		// 	transaction.executeSql("SELECT * FROM movies", [], (_, result) =>
		// 		setMovies(result.rows._array)
		// 	)
		// );

		dispatch(fetchFavorite());
		setIsLoading(false);
	};

	const logoutHandler = () => {
		dispatch(logout())
	}

	const navigateHandler = (id) => {
		navigation.navigate("details", {
			movieId: id,
			genre: null,
			fav: true,
			fromFav: true,
		});
	};

	const Item = ({ item, onPress, backgroundColor, textColor }) => (
		<TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
			<Text style={[styles.title, textColor]}>{item.title}</Text>
		</TouchableOpacity>
	);

	const renderItem = ({ item }) => {
		const backgroundColor = "lightgray";
		const color = "black";

		return (
			<Item
				item={item}
				onPress={() => navigateHandler(item.id)}
				backgroundColor={{ backgroundColor }}
				textColor={{ color }}
			/>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			{isLoading && (
				<View style={styles.horizontal}>
					<ActivityIndicator size="large" color="#0000ff" />
				</View>
			)}
			<View style={styles.logoutButton}>
				<Feather
					onPress={() => logoutHandler()}
					name="log-out"
					size={32}
					color="deepskyblue"
				/>
			</View>
			{movies != undefined ? (
				<View>
					<Text style={styles.titleText}>Favorite</Text>
					<FlatList
						data={movieList}
						renderItem={renderItem}
						keyExtractor={(item) => item.id}
					/>
				</View>
			) : (
				<Text>No Favorites</Text>
			)}
		</SafeAreaView>
	);
};

export default FavMoviesScreen;
