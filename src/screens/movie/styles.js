import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: 4,
		marginVertical: 8,
	},
	item: {
		padding: 20,
		marginVertical: 4,
		marginHorizontal: 4,
	},
	titleText: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
		marginLeft:4,
	},
	description: {
		fontSize: 16,
		marginLeft:4,
	},
	comment: {
		fontSize: 16,
		marginLeft:4,
	},
	genre: {
		padding: 12,
		marginVertical: 4,
		marginLeft: 4,
		marginRight: 4,
		flex: 1,
	},
	itemTitle: {
		fontSize: 18,
	},
	button: {
		alignSelf:'flex-start'
	},
	logoutButton: {
		alignSelf:'flex-end'
	},
	inputContainer: {
        position: "absolute",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "baseline",
		bottom: 60,
	},
	textInput: {
		width: "80%",
		borderColor: "lightgray",
		borderBottomWidth: 1,
		borderStyle: "solid",
		paddingVertical: 10,
		paddingHorizontal: 20,
		marginTop: 20,
	},
	horizontal: {
		flex: 1,
		justifyContent: "center",
	},
	poster: {
		width: 300,
		height: 300,
		marginTop: 20,
		marginBottom: 20,
		marginLeft: 4,
	},

});

export default styles;