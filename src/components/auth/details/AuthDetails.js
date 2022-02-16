import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Feather } from '@expo/vector-icons';
import styles from "./styles";
import { login, register } from '../../../redux/actions/actions'

import { useDispatch } from 'react-redux'

const AuthDetails = ({ authPage, setDetailsPage }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

    const dispatch = useDispatch(

    )

    const loginHandler = () => {
        dispatch(login(email, password)).then(() => {
            console.log('login successful')
        })
        .catch(() => {
            console.log('login failed')
        })
    }

    const registerHandler = () => {
        dispatch(register(email, password)).then(() => {
            console.log('register successful')
        })
        .catch(() => {
            console.log('register failed')
        })
    }

	return (
		<View style={styles.container}>
            <TouchableOpacity onPress={() => setDetailsPage(false)}>
                <Feather name="arrow-left" size={24} color="black" />
            </TouchableOpacity>
            <TextInput
                onChangeText={(text) => setEmail(text)}
                style={styles.textInput}
                placeholder='Email'
                autoCorrect={false}
            />
            <TextInput
                onChangeText={(text) => setPassword(text)}
                style={styles.textInput}
                secureTextEntry
                placeholder='Password'
            />

            <TouchableOpacity
                style={styles.button}
                onPress={() => authPage == 0 ? loginHandler() : registerHandler()}
                >
                <Text style={styles.buttonText}>{authPage == 0 ? 'Sign In' : 'Sign Up'}</Text>
            </TouchableOpacity>
		</View>
	);
};

export default AuthDetails;
