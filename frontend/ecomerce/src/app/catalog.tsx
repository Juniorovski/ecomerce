import { View, Text } from 'react-native'
import React from 'react'
import  Constants  from "expo-constants";

const statusBarHeight = Constants.statusBarHeight;
export default function Catalog() {
  return (
    <View className="flex-1  items-center" style={{marginTop:statusBarHeight +8}}>
        <Text>Catalog Screen</Text>
      </View>
  )
}