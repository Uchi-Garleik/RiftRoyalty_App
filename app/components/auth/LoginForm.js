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
import Environment from '../../utils/constants/Environment';

const LoginForm = () => {
    const navigation = useNavigation();
    const [authStatus, setAuthStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    async function handleLogin() {
        setIsLoading(true);
        setAuthStatus(
            await (fetch(Environment.USERS_API + '/auth/?username=' + username + '&password=' + password, {})
                .then(response => { return response.json() })
                .then((json) => { console.log(json); return json.msg; })));
        setIsLoading(false);
    }

    const getAuthStatus = () => {
        if (isLoading){
            return <ActivityIndicator size="large" color="#D0D0D0" />
        }

        if (authStatus === 'OK') {
            console.log('lets change WEE');
        }

        if (authStatus === 'USER_NOT_FOUND') {
            console.log('lets change web');
            return <Text style={{ color: '#D0D0D0', fontFamily: fonts.AOBOSHI_R }}>No se ha encontrado el usuario</Text>
        }
        console.log(authStatus);
        return <></>;
    }

    return (
        <>
            <View style={styles.inputContainer}>
                {/* FONDO BORDE DE INPUT USERNAME */}
                <View>
                    <Text style={{ color: '#D0D0D0', fontFamily: fonts.AOBOSHI_R }}>Username</Text>
                    <LinearGradient style={[styles.inputBgGradient]} colors={['#F9EFDE', '#FFEFAE']}>
                        {/* INPUT DE USERNAME */}
                        <TextInput style={[styles.inputAuth]}
                            placeholder='Username'
                            placeholderTextColor={'#D0D0D0'}
                            onChangeText={(newUsername) => setUsername(newUsername)}
                        />
                    </LinearGradient>
                </View>
                {/* FONDO BORDE DE INPUT CONTRASEÑA */}
                {/* INPUT DE CONTRASEÑA */}
                <View>
                    <Text style={{ color: '#D0D0D0', fontFamily: fonts.AOBOSHI_R }}>Password</Text>
                    <LinearGradient style={[styles.inputBgGradient]} colors={['#F9EFDE', '#FFEFAE']}>
                        <TextInput style={[styles.inputAuth]}
                            placeholder='Password'
                            placeholderTextColor={'#D0D0D0'}
                            onChangeText={(newPassword) => setPassword(newPassword)}
                        />
                    </LinearGradient>
                </View>
            </View>
            <View>
                <View>
                    {getAuthStatus()}
                </View>
                <LinearGradient style={[{ width: 301, height: 46, backgroundColor: '#0C397D' }]} colors={['#32BCE8', '#0C397D']}>
                    <Pressable style={[
                        {
                            padding: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }
                    ]} onPress={() => { handleLogin(); if(authStatus === 'OK') navigation.navigate(routes.HOME);}}>
                        <Text style={{ color: '#FFF', fontSize: 17, fontFamily: fonts.AOBOSHI_R }}>LOGIN</Text>
                    </Pressable>
                </LinearGradient>
            </View>
        </>
    )
}

export default LoginForm

const styles = StyleSheet.create({
    // ESTILOS CONTAINER DE INPUTS (USERNAME Y PASSWORD)
    inputContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 30,
        alignItems: 'center',
    },
    // ESTILOS COMPARTIDOS FONDO/BG GRADIENT DE INPUTS
    inputBgGradient: {
        padding: 1.3,
    },
    // ESTILOS COMPARTIDOS INPUTS USERNAME Y CONTRASEÑA
    inputAuth: {
        width: 300,
        backgroundColor: 'rgba(0,0,0,0.9)',
        paddingHorizontal: 15,
        height: 50,
        color: 'white',
    },
    // INPUT USERNAME
    inputUsername: {

    },
    // INPUT PASSWORD
    // FONDO GRADIENT DEL BOTON DE ACCION DE LOGIN
    btnLoginFondo: {
        borderColor: '#B8FFFF',
        borderWidth: 1
    },
    // ESTILO BOTON DE ACCION DE LOGIN (ABAJO DEL TODO)
    btnLogin: {
        width: 300,
        height: 60
    },
});