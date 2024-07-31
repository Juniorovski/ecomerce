import { View, Text, TextInput, TouchableOpacity, Button } from "react-native";
import React from "react";
import Constants from "expo-constants";
import Login from "./(pages)/login";

const statusBarHeight = Constants.statusBarHeight;

export default function MainSlot(){
return(
 <>
   <Login/>
 </>
)

}
