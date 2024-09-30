import { View, Text, Pressable } from "react-native";
import React from "react";
import { Ionicons, Feather } from "@expo/vector-icons";
import { router } from "expo-router";



export function Header() {


  const handlerCart =()=> {
    router.push('cart')
  }
  return (
    <View className="w-full  flex flex-row justify-between mb-4 ">
      <Pressable className="w-10 h-10 rounded-full flex justify-center ">
        <Ionicons name="menu" size={24} color="#121212" />
      </Pressable>
      <View className=" flex flex-col justify-center items-center ">

        <View className="flex-row  items-center justify-center gap-1 ">
          <Feather name="map-pin" size={24} color="#f00" />
          <Text className="font-bold  text-xl">Recife-Pe</Text>
        </View>
      </View>
      <Pressable className=" flex w-10 h-10  justify-center "
       onPress={handlerCart}
      >
      <View className="  flex w-full h-full justify-center relative ">
      <Feather name="shopping-cart" size={24} color="#121212"
       style={{
        position:'absolute',
        top:14,
        left:5,
        
       }}
      />
       <Text className=" flex text-center text-red-600 w-full  h-full rounded-full absolute font-bold text-2xl left-4">0</Text>
      
      </View>
   
      </Pressable>
    </View>
  );
}
