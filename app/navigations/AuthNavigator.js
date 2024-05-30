import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/auth/Login';
import routes from '../utils/constants/routes';
import BottomTabNavigator from './BottomTabNavigator';
import Home from '../screens/home/Home';
import HeaderAuth from '../components/auth/HeaderAuth';
import VerificationEmail from '../screens/verificationemail/VerificationEmail';

const Stack = createStackNavigator();

function AuthNavigator() {
    return (
        <Stack.Navigator initialRouteName={routes.HOME} screenOptions={({ route }) => ({
        })}>
            <Stack.Screen name={routes.LOGIN} component={Login} options={{header: () => <HeaderAuth />}} />
            <Stack.Screen name={routes.HOME} component={BottomTabNavigator} options={{headerShown: false}} />
            <Stack.Screen name={routes.CHAMPION_LIST} component={Home} />
            <Stack.Screen name={routes.VERIFICATION_EMAIL} component={VerificationEmail} options={{header: () => <HeaderAuth />}}/>
        </Stack.Navigator>
    );
}

export default AuthNavigator;
