import React, { useEffect, useState } from 'react'
import {
    Button,
    Image,
    ImageBackground,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    Platform,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    Dimensions,
    ActivityIndicator
} from 'react-native'
import { Link, useNavigation } from '@react-navigation/native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import routes from '../../utils/constants/routes';
import { checkLogin } from '../../utils/scripts/auth/Login';
import GlobalStyles from '../../styles/GlobalStyles';
import { LinearGradient } from 'expo-linear-gradient';
import fonts from '../../utils/constants/fonts';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import Checkbox from 'expo-checkbox';
import Environment from '../../utils/constants/Environment';


const RegisterForm = () => {
    const navigation = useNavigation();
    const [authStatus, setAuthStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [username, onChangeUsername] = useState('');
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [isChecked, setChecked] = useState(false);
    async function handleSignup() {
        setIsLoading(true);
        setAuthStatus(
            await (fetch(Environment.USERS_API + '/signup/', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password
                })
            })
                .then(response => { return response.json() })
                .then((json) => { console.log(json); return json.msg; })));
        setIsLoading(false);
    }

    const getAuthStatus = () => {
        if (isLoading) {
            return <ActivityIndicator size="large" color="#D0D0D0" />
        }

        if (authStatus === 'OK') {
            console.log('lets change WEE');
        } else if (authStatus === 'USER_NOT_CREATED') {
            console.log('lets change web');
            return <Text style={{ color: '#D0D0D0', fontFamily: fonts.AOBOSHI_R }}>Ha ocurrido un error al registrar el usuario</Text>
        }

        console.log(authStatus);
        return <></>
    }

    return (
        <View>
            {/* INPUT DE EMAIL */}
            <View>
                <Text style={{ color: 'white' }}>Email</Text>
                <TextInput
                    style={[styles.unfocusedInput, { marginBottom: 10, marginTop: 4, padding: 10 }]}
                    onChangeText={onChangeEmail}
                    value={email}
                    placeholder="john_doe@example.com"
                    placeholderTextColor={'lightgray'}
                    keyboardType="email-address"
                />
                {/* INPUT PASSWORD */}
            </View>
            {/* INPUT DE username */}
            <View style={{ marginVertical: 10 }}>
                <Text style={{ color: 'white' }}>Username</Text>
                <TextInput
                    style={[styles.unfocusedInput, { marginBottom: 10, marginTop: 4, padding: 10 }]}
                    onChangeText={onChangeUsername}
                    value={username}
                    placeholder="Username"
                    placeholderTextColor={'lightgray'}
                    keyboardType="default"
                />
            </View>
            {/* INPUT DE PASSWORD */}
            <View>
                <Text style={{ color: 'white' }}>Password</Text>
                <TextInput
                    style={[styles.unfocusedInput, { marginBottom: 10, marginTop: 4, padding: 10 }]}
                    onChangeText={onChangePassword}
                    value={password}
                    placeholder="Password"
                    placeholderTextColor={'lightgray'}
                    keyboardType="default"
                    secureTextEntry={true}
                />
            </View>
            {/* TERMS OF SERVICE */}
            <View style={{ display: 'flex', flexDirection: 'row', minWidth: '100%', gap: 10, marginVertical: 10 }}>
                <Checkbox
                    style={styles.checkbox}
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? '#4630EB' : undefined}
                />
                <Text style={{ color: 'white' }}>I accept all <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>Terms of Service</Text> and <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>Privacy Policy</Text></Text>
            </View>
            {/* BOTON DE REGISTRARSE */}
            <LinearGradient colors={isChecked && username != '' && email != '' && password != '' ? ['#E83232', '#7D0C0C'] : ['gray', 'gray']} style={{ borderRadius: 6, marginTop: 5 }}>
                <Pressable style={{ paddingVertical: 14, alignItems: 'center', justifyContent: 'center' }} onPress={() => { handleSignup(); if (authStatus === 'OK') navigation.navigate(routes.HOME) }}>
                    <Text style={{ color: 'white', fontFamily: fonts.AOBOSHI_R, fontSize: 16 }}>SIGN UP</Text>
                </Pressable>
            </LinearGradient>
            <View style={{ marginTop: 15 }}>
                {getAuthStatus()}
            </View>
        </View>
    )
}

export default RegisterForm

const styles = StyleSheet.create({
    unfocusedInput: {
        borderColor: '#98AEFF',
        borderWidth: 1,
        borderRadius: 6,
        backgroundColor: '#1F255D',
        color: 'white',
        minHeight: 39,
    },

});