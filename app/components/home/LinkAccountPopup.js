import {
    Text,
    SafeAreaView,
    StyleSheet,
    View,
    TextInput,
    Pressable,
    Image,
} from 'react-native';
import React, { act, useEffect, useState } from 'react';
import fonts from '../../utils/constants/fonts';
import colors from '../../utils/constants/colors';
import Environment from '../../utils/constants/Environment';
import { getRandomNumber } from '../../utils/RandomNumber';
import { Entypo } from '@expo/vector-icons';

const LinkAccountPopup = () => {

    const [activeStep, setActiveStep] = useState(1);
    const [currentProfileIconId, setCurrentProfileIconId] = useState(null);
    const [debug, setDebug] = useState(false);
    const [gameName, setGameName] = useState('');
    const [tagLine, setTagLine] = useState('');
    const [region, setRegion] = useState('EUW1');
    const [validName, setValidName] = useState(false);
    const [iconToChangeTo, setIconToChangeTo] = useState(null);
    const [iconChanged, setIconChanged] = useState(false);
    async function handleStepChange() {
        if (debug) {
            // setActiveStep(activeStep + 1);
            console.log('it works')
            return 0;
        }

        if (activeStep == 1 && debug == false) {
            console.log(`${Environment.RR_API}/summoners/summonericon?gameName=${gameName}&tagLine=${tagLine}&region=${region}`);
            setCurrentProfileIconId(await
                fetch(`${Environment.RR_API}/summoners/summonericon?gameName=${gameName}&tagLine=${tagLine}&region=${region}`)
                    .then(response => response.json())
                    .then(data => { console.log(data); setIconToChangeTo(getRandomNumber(1, 10, data.profileIconId)); return data.profileIconId; })
                    .catch(error => { console.log(error); })
            );
        }

        if (activeStep == 2 && debug == false) {
            setIconChanged(
                await fetch(`${Environment.RR_API}/summoners/linkaccount?region=${region}&gameName=${gameName}&tagLine=${tagLine}&profileIconId=${currentProfileIconId}`)
                .then(response => response.json())
                .then(data => data)
                .catch(error => console.log(error))
            );
        }
    }

    useEffect(() => {
        if (currentProfileIconId != "undefined" && currentProfileIconId != null && activeStep == 1) {
            setActiveStep(activeStep + 1);
        }
    }, [currentProfileIconId]);

    function handleTextChange(text) {
        const regex = /.*\S#\S.*/;
        const containsHashBetweenText = regex.test(text);
        if (containsHashBetweenText) {
            setValidName(true);
            console.log(` == ${text} ==`)
            setGameName(text.split('#')[0]);
            setTagLine(text.split('#')[1]);

        } else {
            setValidName(false);
        }
    }

    const handleStepContent = () => {
        switch (activeStep) {
            case 1:
                return (
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor={colors.grayText}
                        onChangeText={(text) => { handleTextChange(text) }}
                        placeholder='GameName#EUW1'
                    />
                );
                break;
            case 2:
                return (
                    <View style={styles.profileIconsContainer}>
                        <Image
                            source={{ uri: `https://ddragon.leagueoflegends.com/cdn/14.10.1/img/profileicon/${currentProfileIconId}.png` }}
                            style={styles.activeProfileIcon}
                        />
                        <Entypo name="arrow-with-circle-right" size={64} color={colors.contrast} />
                        <Image
                            source={{ uri: `https://ddragon.leagueoflegends.com/cdn/14.10.1/img/profileicon/${iconToChangeTo}.png` }}
                            style={styles.activeProfileIcon}
                        />
                    </View>
                );
                break;
            default:
                return (<></>);
                break;
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View>
                    <Text style={[styles.text, styles.bold,]}>Link your League of Legends Account!</Text>
                    <Text style={[styles.text, activeStep === 1 ? styles.focusText : null]}>1. Enter your Game Name + Tag Line</Text>
                    <Text style={[styles.text, activeStep === 2 ? styles.focusText : null]}>2. Change your Summoner Icon To The Displayed One</Text>
                    <Text style={[styles.text]}>3. Finish!</Text>
                </View>
                {handleStepContent()}
                <Pressable style={[styles.stepsBtn, validName ? styles.activeButton : styles.inactiveButton]} onPress={validName ? handleStepChange : null}>
                    <Text style={[styles.text, styles.bold, styles.textCenter]}>{activeStep === 2 ? 'Finish' : 'Next'}</Text>
                </Pressable>
            </View>
        </View>
    );
}

export default LinkAccountPopup

const styles = StyleSheet.create({
    container: {
        minWidth: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 247,
        position: 'absolute',
        top: 200
    },
    focusText: {
        color: colors.contrast
    },
    profileIconsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: 10,
    },
    content: {
        backgroundColor: colors.bgPurple,
        minHeight: 247,
        minWidth: 340,
        borderRadius: 7,
        borderColor: colors.contrast,
        borderWidth: 1,
        paddingHorizontal: 22,
        gap: 20,
        paddingVertical: 15
    },
    text: {
        fontSize: 16,
        fontFamily: fonts.K2D_R,
        color: 'white',
    },
    bold: {
        fontFamily: fonts.K2D_B
    },
    textInput: {
        backgroundColor: colors.inputBg,
        borderWidth: 1,
        borderColor: colors.lightPurple,
        borderRadius: 7,
        color: 'white',
        minHeight: 47,
        paddingHorizontal: 15,
        fontSize: 16,
        fontFamily: fonts.K2D_R,
    },
    textCenter: {
        textAlign: 'center'
    },
    stepsBtn: {
        backgroundColor: '#595081',
        borderWidth: 1,
        borderRadius: 7,
        borderColor: colors.contrast,
        paddingVertical: 8,
    },
    inactiveButton: {
        backgroundColor: colors.disabledBtn
    },
    activeProfileIcon: {
        width: 80,
        height: 80,
        borderWidth: 1,
        borderColor: colors.contrast,
        borderRadius: 40
    }
})