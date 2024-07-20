import { View, Text,Image,Pressable } from 'react-native';
import React from 'react';
import PagerView from 'react-native-pager-view';

export function Banner() {
  return (
    <View className="w-full h-40 md:h-60 rounded-2xl mt-5 mb-5">
      <PagerView style={{flex:1}}>
            <Pressable className=" w-full h-36 rounded-2xl"
            key="1"
            onPress={()=> console.log("Clicou no banner1")}
            >
            <Image
            source={require("../../assets/banner1.png")}
            className="w-full h-40  md:h-60 rounded-2xl"
            />
            </Pressable>
            <Pressable className=" w-full h-40  md:h-60 rounded-2xl"
            key="2"
            onPress={()=> console.log("Clicou no banner1")}
            >
            <Image
            source={require("../../assets/banner2.png")}
            className="w-full h-40  md:h-60 rounded-2xl"
            />
            </Pressable>
      </PagerView>
    </View>
  )
}