import React from "react";
import { StyleSheet } from "react-native";
import fonts from "../utils/constants/fonts";


export default StyleSheet.create({
    botonNoRadius:{
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 0,
    },
    botonRadius:{
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 6,
    },
    minFullSize:{
        minWidth: "100%",
        minHeight: "100%",
    }
});