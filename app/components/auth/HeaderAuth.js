import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import fonts from '../../utils/constants/fonts'

const HeaderAuth = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/RR_LOGO_SIMPLE.png')} style={{ width: 65, height: 65 }} />
            <Text style={{ color: '#FFFFFF', fontSize: 27, fontWeight: 'bold', fontFamily: fonts.AOBOSHI_R }}>Rift Royalty</Text>
        </View>
    )
}

export default HeaderAuth

const styles = StyleSheet.create({
    container:{
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