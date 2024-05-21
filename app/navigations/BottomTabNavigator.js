import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChampionList from '../screens/ChampionList';
import routes from '../utils/constants/routes';
import Login from '../screens/auth/Login';
import Home from '../screens/home/Home';
import { Text } from 'react-native';
import MainHeader from '../components/MainHeader';
import Profile from '../screens/profile/Profile';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({header: () => MainHeader()})}>
            <Tab.Screen name={routes.HOME_TAB} component={Home}/>
            <Tab.Screen name={routes.CHAMPION_LIST_TAB} component={ChampionList}/>
            <Tab.Screen name={routes.PROFILE} component={Profile}/>
        </Tab.Navigator>
    );
}

export default BottomTabNavigator;