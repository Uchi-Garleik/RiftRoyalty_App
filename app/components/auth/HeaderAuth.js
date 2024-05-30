import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import fonts from '../../utils/constants/fonts'
import { useNavigation } from '@react-navigation/native'
import { HeaderBackButton } from '@react-navigation/elements';


const HeaderAuth = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            {navigation.canGoBack() && <HeaderBackButton onPress={() => navigation.goBack()} />}
            <Image source={require('../../assets/RR_LOGO_SIMPLE.png')} style={{ width: 65, height: 65 }} />
            <Text style={{ color: '#FFFFFF', fontSize: 27, fontWeight: 'bold', fontFamily: fonts.AOBOSHI_R }}>Rift Royalty</Text>
        </View>
    )
}

export default HeaderAuth

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        minWidth: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 15,
        paddingLeft: 10,
        paddingTop: 34,
        backgroundColor: '#151D5F',
    }
})