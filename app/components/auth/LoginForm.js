import React, { useEffect, useState } from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    View,
    ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import routes from '../../utils/constants/routes';
import fonts from '../../utils/constants/fonts';
import Checkbox from 'expo-checkbox';
import Environment from '../../utils/constants/Environment';
import colors from '../../utils/constants/colors';
import { SECRET_KEY } from '@env';
import * as Crypto from 'expo-crypto';
import sjcl from 'sjcl';

const LoginForm = () => {
    const navigation = useNavigation();
    const [authStatus, setAuthStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [username, onChangeUsername] = useState('');
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');
    const [isChecked, setChecked] = useState(false);
    const [fieldsFilled, setFieldsFilled] = useState(false);
    const [focusedInput, setFocusedInput] = useState(null);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isUsernameValid, setIsUsernameValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isEmailTouched, setIsEmailTouched] = useState(false);
    const [isUsernameTouched, setIsUsernameTouched] = useState(false);
    const [isPasswordTouched, setIsPasswordTouched] = useState(false);

    useEffect(() => {
        if (isChecked && isEmailValid && isUsernameValid && isPasswordValid) {
            setFieldsFilled(true);
        } else {
            setFieldsFilled(false);
        }
    }, [isChecked, username, email, password]);

    useEffect(() => {
        validateEmail(email);
        validateUsername(username);
        validatePassword(password);
    }, [email, username, password]);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(emailRegex.test(email));
    };

    const validateUsername = (username) => {
        setIsUsernameValid(username.length > 5);
    };

    const validatePassword = (password) => {
        setIsPasswordValid(password.length > 5);
    };

    async function handleSignup() {
        setAuthStatus(null);
        setIsLoading(true);
        try {
            const response = await fetch(`${Environment.USERS_API}/signup/`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            });
            const json = await response.json();
            console.log(json);
            setAuthStatus(json.msg);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (authStatus === 'OK') {
            console.log('Navigating to Login screen');
            navigation.navigate(routes.VERIFICATION_EMAIL, { email });
        } else if (authStatus === 'USER_NOT_CREATED') {
            console.log('User not created');
        }
    }, [authStatus]);

    const getAuthStatus = () => {
        if (isLoading) {
            return <ActivityIndicator size="large" color="#D0D0D0" />
        }

        if (authStatus === 'USER_NOT_CREATED') {
            return <Text style={{ color: '#D0D0D0', fontFamily: fonts.AOBOSHI_R }}>Ha ocurrido un error al registrar el usuario</Text>
        }

        return <></>
    };

    const handleFocus = (inputName) => {
        setFocusedInput(inputName);
    };

    const handleBlur = (inputName) => {
        setFocusedInput(null);
        if (inputName === 'email') setIsEmailTouched(true);
        if (inputName === 'username') setIsUsernameTouched(true);
        if (inputName === 'password') setIsPasswordTouched(true);
    };

    return (
        <View>
            <View>
                <Text style={[styles.text, { fontFamily: fonts.K2D_B }]}>Email</Text>
                <TextInput
                    style={[
                        styles.textInput,
                        focusedInput === 'email' ? styles.focusedInput : styles.unfocusedInput
                    ]}
                    onChangeText={onChangeEmail}
                    value={email}
                    placeholder="john_doe@example.com"
                    placeholderTextColor={'lightgray'}
                    keyboardType="email-address"
                    onFocus={() => handleFocus('email')}
                    onBlur={() => handleBlur('email')}
                />
            </View>
            <View>
                <Text style={[styles.text, { fontFamily: fonts.K2D_B }]}>Password</Text>
                <TextInput
                    style={[
                        styles.textInput,
                        focusedInput === 'password' ? styles.focusedInput : styles.unfocusedInput
                    ]}
                    onChangeText={onChangePassword}
                    value={password}
                    placeholder="Password"
                    placeholderTextColor={'lightgray'}
                    keyboardType="default"
                    secureTextEntry={true}
                    onFocus={() => handleFocus('password')}
                    onBlur={() => handleBlur('password')}
                />
            </View>
            <View style={styles.checkboxContainer}>
                <Checkbox
                    style={styles.checkbox}
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? '#4630EB' : undefined}
                />
                <Text style={styles.text}>Remember me in this device</Text>
            </View>
            <View style={[styles.btnContainer, fieldsFilled ? styles.activeBtnContainer : styles.disabledBtnContainer]}>
                <Pressable style={styles.btn} onPress={() => { if (fieldsFilled) { handleSignup() } else { console.log('Fields are not filled yet') }; }}>
                    <Text style={[styles.text, { fontFamily: fonts.K2D_B }]}>SIGN UP</Text>
                </Pressable>
            </View>
            <View style={{ marginTop: 15 }}>
                {getAuthStatus()}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    unfocusedInput: {
        borderColor: colors.lightPurple,
    },
    focusedInput: {
        borderColor: colors.contrast,
    },
    validInput: {
        borderColor: 'green',
    },
    invalidInput: {
        borderColor: 'red',
    },
    textInput: {
        marginBottom: 10,
        marginTop: 4,
        padding: 10,
        borderWidth: 1,
        borderRadius: 6,
        color: 'white',
        minHeight: 39,
        backgroundColor: colors.inputBg,
    },
    text: {
        color: 'white',
        fontFamily: fonts.K2D_R,
        fontSize: 16
    },
    checkboxContainer: {
        display: 'flex', flexDirection: 'row', minWidth: '100%', gap: 10, marginVertical: 10
    },
    linkText: {
        fontWeight: 'bold', textDecorationLine: 'underline'
    },
    btnContainer: {
        borderRadius: 6, marginTop: 5
    },
    activeBtnContainer: {
        backgroundColor: '#595081',
        borderWidth: 1,
        borderColor: colors.contrast,
        borderRadius: 7
    },
    disabledBtnContainer: {
        backgroundColor: '#6C6C6C',
        borderWidth: 1,
        borderColor: colors.contrast,
        borderRadius: 7
    },
    btn: {
        paddingVertical: 10, alignItems: 'center', justifyContent: 'center'
    }
});

export default LoginForm;
