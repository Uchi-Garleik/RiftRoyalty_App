import { Keyboard, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect } from 'react'
import colors from '../../utils/constants/colors'
import fonts from '../../utils/constants/fonts'
import { useRoute } from '@react-navigation/native';
import Environment from '../../utils/constants/Environment';



const VerificationEmail = () => {
    const route = useRoute();
    const { email } = route.params;
    const [code, setCode] = React.useState(['', '', '', '']);
    const [focusedIndex, setFocusedIndex] = React.useState(null);
    const [alertMessage, setAlertMessage] = React.useState('');
    const [alertCode, setAlertCode] = React.useState('');
    const inputs = React.useRef([]);

    /**
     * Submits the verification code to the server for email verification.
     *
     * @return {Promise<void>} A promise that resolves when the verification code is successfully submitted,
     * or rejects with an error if the submission fails.
     */
    const handleSubmit = () => {
        const enteredCode = code.join('');
        const url = Environment.RR_API + '/email-verification/verify';
        const response =
            fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    code: enteredCode
                })
            }).then(response => { return response.json() })
                .then(json => { setAlertMessage(json.msg); })
                .catch(error => console.log(error));
    }

    /**
     * Updates the code state with the new input text at the specified index.
     * If the input text is not empty and the index is less than 3, focuses on the next input.
     *
     * @param {string} text - The new input text.
     * @param {number} index - The index of the input.
     * @return {void}
     */
    const handleChange = (text, index) => {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);

        if (text && index < 3) {
            inputs.current[index + 1].focus();
        }
    };

    /**
     * Updates the focused index with the given index.
     *
     * @param {number} index - The index to set as the focused index.
     * @return {void} This function does not return anything.
     */
    const handleFocus = (index) => {
        setFocusedIndex(index);
    };

    /**
     * Updates the focused index with a null value to indicate that no input is currently focused.
     *
     * @return {void} This function does not return anything.
     */
    const handleBlur = () => {
        setFocusedIndex(null);
    };

    const resendCode = () => {
        const url = Environment.RR_API + '/email-verification/resend';
        const response =
            fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email
                })
            }).then(response => { return response.json() })
                .then(json => { setAlertCode(json.msg); })
                .catch(error => console.log(error));
    }

    const codeNumbers = () => {
        return (
            <>
                <View style={styles.codeContainer}>
                    {code.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={ref => inputs.current[index] = ref}
                            value={digit}
                            onChangeText={(text) => handleChange(text, index)}
                            onFocus={() => handleFocus(index)}
                            onBlur={handleBlur}
                            style={[
                                styles.input,
                                focusedIndex === index && styles.inputFocused
                            ]}
                            keyboardType="numeric"
                            maxLength={1}
                        />
                    ))}
                </View>
                <View style={[styles.alertContainer, { display: alertMessage ? 'flex' : 'none' }]}>
                    <Text style={[styles.text, styles.alertText]}>{alertMessage}</Text>
                </View>
            </>
        )
    }

    const submitCode = () => {
        return (
            <View style={styles.buttonContainer}>
                <Pressable style={[styles.activeButton, styles.button]} onPress={handleSubmit}>
                    <Text style={[styles.text, { fontFamily: fonts.K2D_B }]}>ENTER VERIFICATION CODE</Text>
                </Pressable>
                <View style={styles.resendContainer}>
                    <Pressable onPress={resendCode}>
                        <Text style={[styles.text, { color: colors.contrast }]}>Receive the code again!</Text>
                    </Pressable>
                </View>
            </View>
        )
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.content}>
                <View style={styles.topContainer}>
                    <Text style={styles.title}>VERIFICATION CODE</Text>
                    <Text style={styles.text}>Enter your verification code that we sent you through your e-mail address</Text>
                </View>
                <View style={styles.bottomContainer}>
                    {codeNumbers()}
                    {submitCode()}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default VerificationEmail

const styles = StyleSheet.create({
    content: {
        backgroundColor: colors.bgPurple,
        flex: 1,
    },
    title: {
        color: 'white',
        fontFamily: fonts.K2D_B,
        fontSize: 24
    },
    text: {
        color: 'white',
        fontFamily: fonts.K2D_R,
        fontSize: 16
    },
    topContainer: {
        padding: 20
    },
    bottomContainer: {
        backgroundColor: colors.bgLightPurple,
        flex: 1,
        borderTopLeftRadius: 45,
        borderTopRightRadius: 45,
        padding: 20
    },
    codeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    input: {
        backgroundColor: colors.inputBg,
        color: 'white',
        fontSize: 24,
        textAlign: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.lightPurple,
        width: 60,
        height: 72,
    },
    inputFocused: {
        borderColor: colors.contrast, // or any other color you want to use for focused state
    },
    buttonContainer: {
        marginTop: 40
    },
    button: {
        borderRadius: 7,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '100%',
        height: 46,
    },
    activeButton: {
        backgroundColor: colors.lightPurple,
        borderColor: colors.contrast,
    },
    disabledButton: {

    },
    alertContainer: {
        marginTop:15
    },
    alertText: {
        color: colors.error
    },
    resendContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    }
})