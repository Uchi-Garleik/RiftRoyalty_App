import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Text} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { useState, useEffect, useCallback } from 'react';
import { Redirect, Stack } from "expo-router";
import AuthNavigator from './app/navigations/AuthNavigator';
import fonts from './app/utils/constants/fonts';

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(()=>{
        async function prepare(){
            try{
                await Font.loadAsync({
                    'K2D-B': require('./fonts/K2D-Bold.ttf'),
                    'K2D-R': require('./fonts/K2D-Regular.ttf'),
                    'K2D-L': require('./fonts/K2D-Light.ttf'),
                    'AOBOSHI-R': require('./fonts/AoboshiOne-Regular.ttf'),
                });
                // await new Promise(resolve => setTimeout(resolve, 4000));
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }
        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if(appIsReady){
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if(!appIsReady){
        // Contenido a mostrar mientras carga la aplicación
        return (
            <>
                {/* <Stack.Screen options={{headerShown: false}} onLayout={onLayoutRootView} /> */}
                <Text style={{padding:24}}>Loading...</Text>
            </>
        );
    }

  return (
    // Contenido que se mostrará una vez cargada la aplicación
    <NavigationContainer>
        <AuthNavigator/>
    </NavigationContainer>
  );
}
