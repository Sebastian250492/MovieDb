import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { userAuthStateListener } from "../redux/actions/actions";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "../screens/auth/AuthScreen";
import HomeRoutes from "./HomeRoutes";
import MoviesScreen from "../screens/movie/MoviesScreen";
import MovieDetailsScreen from "../screens/movie/MovieDetailsScreen";

const Stack = createNativeStackNavigator();

const MainRoute = () => {
	const currentUserObj = useSelector((state) => state.auth);
	const { loaded, currentUser } = currentUserObj;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(userAuthStateListener());
	}, []);

	if (!loaded) {
		return (
			<View>
				<Text>...loading</Text>
			</View>
		);
	}

	return (
		<NavigationContainer>
			<Stack.Navigator>
				{currentUser === null ? (
					<Stack.Screen
						name="auth"
						component={AuthScreen}
						options={{ headerShown: false }}
					/>
				) : (
					<Stack.Screen
						name="home"
						component={HomeRoutes}
						options={{ headerShown: false }}
					/>
				)}
				<Stack.Screen
					name="movies"
					component={MoviesScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="details"
					component={MovieDetailsScreen}
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default MainRoute;
