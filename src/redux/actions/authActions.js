import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, signOut } from "firebase/auth";
import { auth } from "../../services/firebase";

import { USER_STATE_CHANGE } from "../constants/userConstants";

export const userAuthStateListener = () => (dispatch) => {
	onAuthStateChanged(auth, (user) => {
		if (user) {
			dispatch(getCurrentUserData());
			// const uid = user.uid;
		} else {
			dispatch({ type: USER_STATE_CHANGE, currentUser: null, loaded: true });
		}
	});
};

export const getCurrentUserData = () => (dispatch) => {
	const user = auth.currentUser;
	if (user !== null) 
		return dispatch({
			type: USER_STATE_CHANGE,
			currentUser: user,
			loaded: true,
		});
};

export const login = (email, password) => (dispatch) =>
	new Promise((resolve, reject) => {
		signInWithEmailAndPassword(auth, email, password)
			.then(() => {
				resolve();
			})
			.catch(() => {
				reject();
			});
	});

export const register = (email, password) => (dispatch) =>
	new Promise((resolve, reject) => {
		createUserWithEmailAndPassword(auth, email, password)
			.then(() => {
				resolve();
			})
			.catch((error) => {
				reject(error);
			});
	});

export const logout = () => (dispatch) =>
	new Promise((resolve, reject) => {
		signOut(getAuth())
			.then(() => {
				resolve();
			})
			.catch((error) => {
				reject(error);
			});
	});
