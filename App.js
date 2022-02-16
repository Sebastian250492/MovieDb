import React from "react";
import { Provider } from "react-redux";
import store from "./src/redux/reducers/store";
import MainRoute from "./src/navigation/MainRoute";


export default function App() {

	return (
		<Provider store={store}>
			<MainRoute />
		</Provider>
	);
}