import React, { useState } from 'react'
import {
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native'

import fonts from '../../utils/constants/fonts';
import LoginForm from '../../components/auth/LoginForm';
import RegisterForm from '../../components/auth/RegisterForm';
import colors from '../../utils/constants/colors';


const Login = () => {

    const [visibleForm, setVisibleForm] = useState('signup');

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
        backgroundColor: colors.bgPurple,
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
        backgroundColor: colors.lightPurple,
        borderRadius: 7,
        width: 175,
        height: 48,
        borderColor: colors.contrast,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeText:{
        color:'white',
        fontSize:16,
        fontFamily: fonts.K2D_B
    },
    disabledButton:{
        width: 175,
        height: 48,
        backgroundColor: colors.lightPurple,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: colors.bgPurple,
        alignItems: 'center',
        justifyContent: 'center',
    },
    disabledText:{
        color:'white',
        fontSize:16,
        fontFamily: fonts.K2D_R
    }

});

export default Login
