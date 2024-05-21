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
import LoginForm from '../../components/auth/LoginForm';
import RegisterForm from '../../components/auth/RegisterForm';
// onPress={() => navigation.navigate(routes.CHAMPION_LIST)}

// const image = {uri: 'https://legacy.reactjs.org/logo-og.png'};

const Login = () => {

    const [visibleForm, setVisibleForm] = useState('signup');

    // useEffect(() => {
    //     fetch(Environment.USERS_API + '/auth/?username=' + username + '&password=' + password, {})
    //     .then(response => {return response.json()})
    //     .then((json)=>{console.log(json); setAuthStatus(json.msg)});
    // },[]);

    return (
        <SafeAreaView style={styles.content}>
            {/* BOTONES DE SIGN UP Y SIGN IN */}
            <View style={styles.buttonContainer}>
                <Pressable style={[visibleForm === 'signup' ? styles.activeButton : styles.disabledButton]} onPress={() => setVisibleForm('signup')}>
                    <Text style={visibleForm === 'signup' ? styles.activeText : styles.disabledText}>SIGN UP</Text>
                </Pressable>
                <Pressable style={[visibleForm === 'signin' ? styles.activeButton : styles.disabledButton]} onPress={() => setVisibleForm('signin')}>
                    <Text style={visibleForm === 'signin' ? styles.activeText : styles.disabledText}>SIGN IN</Text>
                </Pressable>
            </View>
            {/* Separator line */}
            <View
                style={{
                    borderBottomColor: '#444E9A',
                    borderBottomWidth: 2,
                }}
            />
            {/* Formulario de login o sign up */}
            <View style={{padding: 20}}>
                {visibleForm === 'signin' ? <LoginForm /> : <RegisterForm />}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    content:{
        flex: 1,
        minWidth: '100%',
        minHeight: '100%',
        backgroundColor: '#090D2A',
    },
    buttonContainer:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginTop: 20,
        marginBottom: 20,
    },
    activeButton:{
        backgroundColor: '#1F255D',
        borderRadius: 7,
        width: 205,
        height: 55,
        borderColor: '#98AEFF',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeText:{
        color: '#AAC8F3',
        fontSize: 20,
        fontFamily: fonts.K2D_B,
    },
    disabledButton:{
        width: 175,
        height: 48,
        backgroundColor: '#1C2255',
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#566498',
        alignItems: 'center',
        justifyContent: 'center',
    },
    disabledText:{
        color:'white',
    }

});

export default Login
