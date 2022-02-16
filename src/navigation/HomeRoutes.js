import React from "react";
import { View } from "react-native";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { Feather } from '@expo/vector-icons';
import GenreScreen from "../screens/movie/GenreScreen";
import FavMoviesScreen from "../screens/movie/FavMoviesScreen";

const Tab = createMaterialBottomTabNavigator()

const EmptyScreen = () => {
    return <View></View>
}

const HomeRoutes = () => {

	return (
        <Tab.Navigator barStyle={{ backgroundColor: 'black'}} initialRouteName='MyFav'>
            <Tab.Screen
                name="Genre"
                component={GenreScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Feather name="film" size={24} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="MyFav"
                component={FavMoviesScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Feather name="user" size={24} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="Search"
                component={EmptyScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Feather name="search" size={24} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
	);
};

export default HomeRoutes;
